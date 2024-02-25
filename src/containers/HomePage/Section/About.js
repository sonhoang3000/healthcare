import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {

	render() {
		return (
			<div className="section-share section-about">
				<div className='section-about-header'>
					Truyền thông nói về BookingCare
				</div>
				<div className='section-about-content'>
					<div className='content-left'>
						<iframe width="100%" height="400px" src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI" title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
					</div>
					<div className='content-right'>
						<p>3️⃣ Công nghệ sử dụng ?
							✔ Frontend: Reactjs + Redux. HTML/CSS-scss/Bootstrap4 (reactrap)
							✔ Backend: Node.js (Express) + MySql (Sequelize)
							2️⃣ Nội dung khóa học ?
							Mình dự định sẽ làm 1 website với nội dung hỗ trợ việc đặt lịch khám bệnh bác sĩ, tương tự như website: https://bookingcare.vn/ . Trong khóa học này, mình sẽ clone (sao chép) lại giao diện Frontend và tự làm hoàn toàn phần Backend cũng như cơ sở dữ liệu của dự án.
						</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
