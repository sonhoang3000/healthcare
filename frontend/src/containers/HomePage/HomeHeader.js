import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/logo-1.svg";
import { withRouter } from 'react-router';

class HomeHeader extends Component {

	returnToHome = () => {
		if (this.props.history) {
			this.props.history.push(`/home`)
		}
	}

	handleMoreSpecialty = () => {
		if (this.props.history) {
			this.props.history.push(`/more-specialty`)
		}
	}

	handleMoreDoctor = () => {
		if (this.props.history) {
			this.props.history.push(`/more-doctor`)
		}
	}

	handleMoreClinic = () => {
		if (this.props.history) {
			this.props.history.push(`/more-clinic`)
		}
	}

	handleHistoryPaitent = () => {
		if (this.props.history) {
			this.props.history.push(`/history-patient`)
		}
	}
	render() {
		return (
			<React.Fragment>
				<div className="home-header-container">
					<div className="home-header-content">
						<div className="left-content">
							<i className="fas fa-bars"></i>
							<img className="header-logo" src={logo} alt={''} onClick={() => this.returnToHome()} />
						</div>
						<div className="center-content">
							<div className="child-content" onClick={() => this.handleMoreSpecialty()} >
								<div> <b>Chuyên khoa</b></div>
								<div className="sub-title">Tìm bác sĩ theo chuyên khoa</div>
							</div>
							<div className="child-content" onClick={() => this.handleMoreClinic()}>
								<div> <b>Cơ sở y tế</b></div>
								<div className="sub-title">Chọn bệnh viện phòng khám</div>
							</div>
							<div className="child-content" onClick={() => this.handleMoreDoctor()}>
								<div> <b>Bác sĩ</b></div>
								<div className="sub-title">Chọn bác sĩ giỏi</div>
							</div>
							<div className="child-content" >
								<div> <b>Gói khám</b></div>
								<div className="sub-title">Khám sức khoẻ tổng quát</div>
							</div>
						</div>
						<div className="right-content">
							<div className="history-patient right-ct"
								onClick={() => this.handleHistoryPaitent()}
							>
								Tra lịch sử bệnh án
							</div>


							<div className="support left-ct"><i className="fas fa-question-circle"></i>
								Hỗ trợ
							</div>
						</div>
					</div>
				</div>
				{this.props.isShowBanner === true &&
					<div className="home-header-banner">
						<div className="content-up">
							<div className="title1">NỀN TẢNG Y TẾ</div>
							<div className="title2">CHĂM SÓC SỨC KHOẺ TOÀN DIỆN</div>
							<div className="search">
								<i className="fas fa-search"></i>
								<input text="text" placeholder="Tìm chuyên khoa khám bệnh" />
							</div>
						</div>
						<div className="content-down">
							<div className="options">
								<div className="option-child">
									<div className="icon-child">
										<i className="far fa-hospital"></i>
									</div>
									<div className="text-child">Khám chuyên khoa</div>
								</div>
								<div className="option-child">
									<div className="icon-child">
										<i className="fas fa-mobile-alt"></i>
									</div>
									<div className="text-child">Khám từ xa</div>
								</div>
								<div className="option-child">
									<div className="icon-child">
										<i className="fas fa-procedures"></i>
									</div>
									<div className="text-child">Khám tổng quát</div>
								</div>
								<div className="option-child">
									<div className="icon-child">
										<img src="https://cdn.bookingcare.vn/fo/w128/2023/06/07/161340-iconxet-nghiem-y-hoc.png" alt="" />
									</div>
									<div className="text-child">Xét nghiệm y học</div>
								</div>
								<div className="option-child">
									<div className="icon-child">
										<i className="fas fa-user-md"></i>
									</div>
									<div className="text-child">Sức khoẻ tinh thần</div>
								</div>
								<div className="option-child">
									<div className="icon-child">
										<img src="https://cdn.bookingcare.vn/fo/w128/2023/06/07/161410-iconkham-nha-khoa.png" alt="" />
									</div>
									<div className="text-child">Khám nha khoa</div>
								</div>
							</div>
						</div>
					</div>
				}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
