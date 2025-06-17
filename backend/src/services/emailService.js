require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {

	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false, //true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_APP,
			pass: process.env.EMAIL_APP_PASSWORD,
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Hoang Son 3000 👻" <vuhoangson3000@gmail.com>', // sender address
		to: dataSend.reciversEmail, // list of receivers
		subject: "Thông tin đặt lịch khám bệnh ", // Subject line	
		html: getBodyHTMLEmail(dataSend),
	});

}

let getBodyHTMLEmail = (dataSend) => {
	let result = `
	<h3> Xin chào ${dataSend.patientName} </h3>
	<p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Trang web bookingcare.vn </p>
	<p>Thông tin đặt lịch khám bệnh:</p>
	<div> <b>Thời gian: ${dataSend.time}</b></div>
	<div> <b>Bác sĩ: ${dataSend.doctorName}</b></div>
	
	<p> 
		Nếu thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh 
	</p>
	<div>
		<a href=${dataSend.redirectLink} target="_blank">Click here</a>
	</div>

	<div>Xin chân thành cảm ơn </div>
	`;


	return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
	let result =
		`
			<h3> Xin chào ${dataSend.patientName} </h3>
			<p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Trang web bookingcare.vn thành công </p>
			<p>Thông tin đơn thuốc/ hoá đơn được gửi trong file đính kèm.</p>

			<div>Xin chân thành cảm ơn </div>
		`
	return result;
}

let sendAttachMent = async (dataSend) => {
	return new Promise(async (resolve, reject) => {
		try {
			let transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				port: 587,
				secure: false, //true for 465, false for other ports
				auth: {
					user: process.env.EMAIL_APP,
					pass: process.env.EMAIL_APP_PASSWORD,
				},
			});

			// send mail with defined transport object
			let info = await transporter.sendMail({
				from: '"Hoang Son 3000 👻" <vuhoangson3000@gmail.com>', // sender address
				to: dataSend.email, // list of receivers
				subject: "Kết quả đặt lịch khám bệnh ", // Subject line	
				html: getBodyHTMLEmailRemedy(dataSend),
				attachments: [
					{
						filename: `remedy-${dataSend.patientId}-${new Date().getTime()}}.png`,
						content: dataSend.imgBase64.split("base64,")[1],
						encoding: 'base64'
					}
				],
			});
			resolve(true)

		} catch (e) {
			reject(e)
		}
	})
}

module.exports = {
	sendSimpleEmail: sendSimpleEmail,
	sendAttachMent: sendAttachMent
}