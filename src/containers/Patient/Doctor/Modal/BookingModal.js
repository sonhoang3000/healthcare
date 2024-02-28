import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import Select from 'react-select';
import { postPatientBookingAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fullName: '',
			phoneNumber: '',
			email: '',
			address: '',
			reason: '',
			birthday: '',
			selectedGender: '',
			doctorId: '',
			genders: '',
			timeType: '',
		}
	}

	async componentDidMount() {
		this.props.getGenders();

	}

	buildDataGender = (data) => {
		let result = [];

		if (data && data.length > 0) {
			data.forEach(item => {
				let object = {};
				object.label = item.valueVi ? item.valueVi : "";
				object.value = item.keyMap;
				result.push(object)
			})
		}
		return result
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.genders !== prevProps.genders) {

			this.setState({
				genders: this.buildDataGender(this.props.genders)
			})
		}
		if (this.props.dataTime !== prevProps.dataTime) {
			if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
				let doctorId = this.props.dataTime.doctorId;
				let timeType = this.props.dataTime.timeType;
				this.setState({
					doctorId: doctorId,
					timeType: timeType,
				})
			}
		}
	}

	handleOnChangeInput = (event, id) => {
		let valueInput = event.target.value;
		let stateCopy = { ...this.state };
		stateCopy[id] = valueInput;
		this.setState({
			...stateCopy
		})
	}

	handleOnChangeDatePicker = (date) => {
		this.setState({
			birthday: date[0]
		})
	}

	handleChangeSelect = (selectedOption) => {
		this.setState({ selectedGender: selectedOption });

	}

	buildTimeBooking = (dataTime) => {
		if (dataTime && !_.isEmpty(dataTime)) {
			let time =
				dataTime.timeTypeData.valueVi

			let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')


			return `${time}  ${date}`

		}
		return ``

	}

	buildDoctorName = (dataTime) => {
		if (dataTime && !_.isEmpty(dataTime)) {
			let name = `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
			return name;
		}
		return ``
	}

	handleConfirmBooking = async () => {

		let date = new Date(this.state.birthday).getTime();
		let timeString = this.buildTimeBooking(this.props.dataTime);
		let doctorName = this.buildDoctorName(this.props.dataTime);

		let res = await postPatientBookingAppointment({
			fullName: this.state.fullName,
			phoneNumber: this.state.fullName,
			email: this.state.email,
			address: this.state.address,
			reason: this.state.reason,
			date: this.props.dataTime.date,
			birthday: date,
			selectedGender: this.state.selectedGender.value,
			doctorId: this.state.doctorId,
			timeType: this.state.timeType,
			timeString: timeString,
			doctorName: doctorName
		})

		if (res && res.errCode === 0) {
			toast.success("Booking a new appointment succeed!")
			this.props.closeBookingModal();
		} else {
			toast.error("Booking a new appointment error!")
		}

	}

	render() {
		let { isOpenModal, closeBookingModal, dataTime } = this.props;
		let doctorId = '';
		if (dataTime && !_.isEmpty(dataTime)) {
			doctorId = dataTime.doctorId
		}

		return (
			<Modal
				isOpen={isOpenModal}
				className={'booking-modal-container'}
				size='lg'
				centered
			>
				<div className='booking-modal-content'>
					<div className='booking-modal-header'>
						<span className='left'>
							Thông tin đặt lịch khám bệnh"						</span>
						<span
							className='right'
							onClick={closeBookingModal}
						>
							<i className='fas fa-times'></i></span>
					</div>
					<div className='booking-modal-body'>
						<div className='doctor-infor'>
							<ProfileDoctor
								doctorId={doctorId}
								isShowDescriptionDoctor={false}
								dataTime={dataTime}
								isShowLinkDetail={false}
								isShowPrice={true}
							/>
						</div>

						<div className='row'>
							<div className='col-6 form-group'>
								<label>Họ và tên</label>
								<input className='form-control'
									value={this.state.fullName}
									onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
								/>
							</div>
							<div className='col-6 form-group'>
								<label>Số điện thoại</label>
								<input className='form-control'
									value={this.state.phoneNumber}
									onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
								/>
							</div>
							<div className='col-6 form-group'>
								<label>Địa chỉ email</label>
								<input className='form-control'
									value={this.state.email}
									onChange={(event) => this.handleOnChangeInput(event, 'email')}
								/>
							</div>
							<div className='col-6 form-group'>
								<label>Địa chỉ</label>
								<input className='form-control'
									value={this.state.address}
									onChange={(event) => this.handleOnChangeInput(event, 'address')}
								/>
							</div>

							<div className='col-12 form-group'>
								<label>Lý do khám"</label>
								<input className='form-control'
									value={this.state.reason}
									onChange={(event) => this.handleOnChangeInput(event, 'reason')}
								/>
							</div>

							<div className='col-6 form-group'>
								<label>Ngày sinh"</label>
								<DatePicker
									onChange={this.handleOnChangeDatePicker}
									className="form-control"
									value={this.state.birthday}
								/>
							</div>
							<div className='col-6 form-group'>
								<label>Giới tính</label>
								<Select
									value={this.state.selectedGender}
									onChange={this.handleChangeSelect}
									options={this.state.genders}
								/>
							</div>
						</div>
					</div>
					<div className='booking-modal-footer'>
						<button
							onClick={() => this.handleConfirmBooking()}
							className='btn-booking-confirm'
						>
							Xác nhận
						</button>
						<button
							onClick={closeBookingModal}
							className='btn-booking-cancel'
						>
							Huỷ
						</button>

					</div>
				</div>
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		genders: state.admin.genders,

	};
};

const mapDispatchToProps = dispatch => {
	return {
		getGenders: () => dispatch(actions.fetchGenderStart())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
