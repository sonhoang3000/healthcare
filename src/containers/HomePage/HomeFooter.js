import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import '@fortawesome/fontawesome-free/css/all.min.css';

class HomeFooter extends Component {

	render() {
		return (
			<div className="home-footer">

				<div className='intro-footer'>
					<div className='content-left'>
						<div>
							<div>
								<i class="fa-solid fa-location-dot"></i>
								Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
							</div>
							<div>
								<i class="fa-solid fa-check"></i>
								ĐKKD số. 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
							</div>
							<div>
								<i class="fa-solid fa-phone-volume"></i>
								024-7301-2468 (7h - 18h)
							</div>
							<div>
								<i class="fa-solid fa-envelopes-bulk"></i>
								support@bookingcare.vn (7h - 18h)
							</div>
							<div>
								Văn phòng tại TP Hồ Chí Minh

							</div>
							<div>
								<i class="fa-solid fa-location-dot"></i>
								Số 01, Hồ Bá Kiện, Phường 15, Quận 10

							</div>
						</div>
					</div>
					<div className='content-middle'>
						<div className='img-middle'>
						</div>
						<div className='middle-content'>
							<div className='content-of-mid'>Tuyển dụng</div>
							<div className='content-of-mid'>Chính sách bảo mật</div>
							<div className='content-of-mid'>Quy chế hoạt động</div>
							<div className='content-of-mid'>Liên hệ hợp tác</div>
							<div className='content-of-mid'>Điều khoản sử dụng</div>
							<div className='content-of-mid'>Câu hỏi thường gặp</div>
						</div>
					</div>
					<div className='content-right'>
						Đối tác bảo trợ nội dung
						<div>
							<div></div>
							<div>
								<div>Hello Doctor</div>
								<div>Bảo trợ chuyên mục nội dung "sức khỏe tinh thần"</div>
							</div>
						</div>
						<div>
							<div></div>
							<div></div>

						</div>
						<div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>

				<p>&copy; 2024 bookingcare.com with sonhoang3000  More information, please.<a target="blank" href='https://bookingcare.vn/'> &#8594; Click here &#8592;</a></p>
			</div >
		)


	}

}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.user.isLoggedIn
	};
};

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
