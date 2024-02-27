import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataProfile: {}
		}
	}

	async componentDidMount() {

		let data = await this.getInforDoctor(this.props.doctorId)
		this.setState({
			dataProfile: data
		})
	}

	getInforDoctor = async (id) => {
		let result = {};
		if (id) {
			let res = await getProfileDoctorById(id);
			if (res && res.errCode === 0) {
				result = res.data;
			}
		}
		return result;
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {

	}

	renderTimeBooking = (dataTime) => {
		if (dataTime && !_.isEmpty(dataTime)) {
			let time =
				dataTime.timeTypeData.valueVi ? dataTime.timeTypeData.valueVi : "";

			let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
				? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
				: ""
			return (
				<>
					<div>{time}  {date}</div>
					<div>Miễn phí đặt lịch</div>
				</>
			)
		}
		return <></>

	}

	render() {
		let { dataProfile } = this.state
		let { isShowDescriptionDoctor,
			dataTime, isShowPrice, isShowLinkDetail,
			doctorId
		} = this.props

		let nameVi = '';
		if (dataProfile && dataProfile.positionData) {
			nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
		}
		return (
			<div className='profile-doctor-container'>
				<div className='intro-doctor'>
					<div
						className='content-left'
						style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }} >
					</div>
					<div className='content-right'>
						<div className='up'>
							{nameVi ? nameVi : ""}
						</div>
						<div className='down'>
							{isShowDescriptionDoctor === true ?
								<>
									{dataProfile && dataProfile.Markdown
										&& dataProfile.Markdown.description
										&&
										<span>
											{dataProfile.Markdown.description}
										</span>
									}
								</>
								:
								<>
									{this.renderTimeBooking(dataTime)}
								</>
							}
						</div>
					</div>

				</div>

				{isShowLinkDetail === true &&
					<div className='view-detail-doctor'>

						<Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
						{/* <a href={`/detail-doctor/${doctorId}`}>Xem thêm</a> */}
					</div>
				}

				{isShowPrice === true &&
					<div className='price'>
						Giá khám:
						{dataProfile && dataProfile.Doctor_Infor &&
							<NumberFormat
								className='currency'
								value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
								displayType={'text'}
								thousandSeparator={true}
								suffix={'VND'}
							/>
						}

					</div>
				}

			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
