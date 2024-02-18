import React, { Component } from 'react';
import { connect } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';

class HomeFooter extends Component {

	render() {
		return (
			<div className="home-footer">

				<div className='intro-footer'>
					<div className='content-left'>
						<div className='content-body-left'>
							<div className="inside-body-left">
								<p>Công ty Cổ phần Công nghệ BookingCare</p>
							</div>
						</div>
						<div className='content-body-left'>
							<div className="inside-body-left">
								<i className="fa-solid fa-location-dot"></i>
								Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
							</div>
						</div >
						<div className='content-body-left'>
							<div className="inside-body-left">
								<i className="fa-solid fa-check"></i>
								ĐKKD số. 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
							</div>

						</div>
						<div className='content-body-left'>
							<div className="inside-body-left">
								<i className="fa-solid fa-phone-volume"></i>
								<a href="/#"> 024-7301-2468 </a>(7h - 18h)
							</div>
						</div>
						<div className='content-body-left'>
							<div className="inside-body-left">
								<i className="fa-solid fa-envelopes-bulk"></i>
								support@bookingcare.vn (7h - 18h)
							</div>
						</div>
						<div className='content-body-left'>
							<div className="inside-body-left">
								<p>Văn phòng tại TP Hồ Chí Minh</p>
							</div>
						</div>
						<div className='content-body-left'>
							<div className="inside-body-left">
								<i className="fa-solid fa-location-dot"></i>
								Số 01, Hồ Bá Kiện, Phường 15, Quận 10
							</div>
						</div>
					</div>
					<div className='content-middle'>
						<div className='img-middle'>

						</div>
						<div className='mid'>
							<ul>
								<li>
									<a href="/#">Tuyển dụng</a>
								</li>
								<li>
									<a href="/#">Chính sách bảo mật</a>
								</li>
								<li>
									<a href="/#">Quy chế hoạt động</a>
								</li>
								<li>
									<a href="/#">Liên hệ hợp tác</a>
								</li>
								<li>
									<a href="/#">Điều khoản sử dụng</a>
								</li>
								<li>
									<a href="/#">Câu hỏi thường gặp</a>
								</li>
							</ul>
						</div>
					</div>
					<div className='content-right'>
						<div className='container-right title-right-intro'>Đối tác bảo trợ nội dung</div>
						<div className='container-right'>
							<div className='img-footer-right img-1'></div>
							<div className='container-right-footer'>
								<div className='title-footer-xyz xyz-title-1'>Hello Doctor</div>
								<div className='intro-footer-xyz'>Bảo trợ chuyên mục nội dung "sức khỏe tinh thần"</div>
							</div>
						</div>
						<div className='container-right'>
							<div className='img-footer-right img-2'></div>
							<div className='container-right-footer'>
								<div className='title-footer-xyz'>Hệ thống y khoa chuyên sâu quốc tế Bernard</div>
								<div className='intro-footer-xyz'>Bảo trợ chuyên mục nội dung "y khoa chuyên sau"</div>
							</div>
						</div>
						<div className='container-right'>
							<div className='img-footer-right img-3'></div>
							<div className='container-right-footer'>
								<div className='title-footer-xyz'>Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn</div>
								<div className='intro-footer-xyz'>Bảo trợ chuyên mục nội dung "sức khỏe tổng quát"</div>
							</div>
						</div>
					</div>
				</div>

				<div className='bottom-footer'>
					<div className='bottom-container'>
						<div className='bottom-left'>
							<p>&copy; 2024 Bookingcare.com <a target="blank" href='https://bookingcare.vn/'> &#8594; Click here &#8592;</a></p>
						</div>
						<div className='bottom-right'>
							<i className="fa-brands fa-tiktok tiktok"></i>
							<i className="fa-brands fa-facebook facebook " ></i>
							<i className="fa-brands fa-youtube youtube "></i>
						</div>
					</div>

				</div>

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
