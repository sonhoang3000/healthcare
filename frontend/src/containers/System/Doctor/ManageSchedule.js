import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from "react-toastify"
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
	constructor(props) {
		super(props);

		this.state = {
			listDoctors: [],
			selectedDoctor: {},
			currentDate: '',
			rangeTime: [],
		}
	}

	componentDidMount() {
		this.props.fetchAllDoctors();
		this.props.fetchAllScheduleTime();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.allDoctors !== this.props.allDoctors) {
			let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
			this.setState({
				listDoctors: dataSelect
			})
		}
		if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
			let data = this.props.allScheduleTime;
			if (data && data.length > 0) {
				data = data.map(item => ({ ...item, isSelected: false }))
			}
			this.setState({
				rangeTime: data
			})
		}
	}

	buildDataInputSelect = (inputData) => {
		let result = [];
		if (inputData && inputData.length > 0) {
			inputData.forEach((item, index) => {
				let object = {};
				let labelVi = `${item.lastName} ${item.firstName}`;
				object.label = labelVi ? labelVi : "";
				object.value = item.id;
				result.push(object)
			})
		}
		return result;
	}

	handleChangeSelect = async (selectedOption) => {
		this.setState({ selectedDoctor: selectedOption });
	};

	handleOnChangeDatePicker = (date) => {
		this.setState({
			currentDate: date[0]
		})
	}

	handleClickBtnTime = (time) => {
		let { rangeTime } = this.state;
		if (rangeTime && rangeTime.length > 0) {
			rangeTime = rangeTime.map(item => {
				if (item.id === time.id) item.isSelected = !item.isSelected;
				return item;
			})
			this.setState({
				rangeTime: rangeTime
			})
		}
	}

	handSaveSchedule = async () => {
		let { rangeTime, selectedDoctor, currentDate } = this.state;
		let result = [];

		if (!currentDate) {
			toast.error("Invalid date!")
			return;
		}
		if (selectedDoctor && _.isEmpty(selectedDoctor)) {
			toast.error("Invalid seclected doctor!")
			return;
		}

		let formatedDate = new Date(currentDate).getTime();

		if (rangeTime && rangeTime.length > 0) {
			let selectedTime = rangeTime.filter(item => item.isSelected === true);
			if (selectedTime && selectedTime.length > 0) {
				selectedTime.forEach((schedule, index) => {
					let object = {};
					object.doctorId = selectedDoctor.value;
					object.date = formatedDate;
					object.timeType = schedule.keyMap;
					result.push(object)
				})

			} else {
				toast.error("Invalid seclected time!")
				return;
			}
		}

		let res = await saveBulkScheduleDoctor({
			arrSchedule: result,
			doctorId: selectedDoctor.value,
			formatedDate: formatedDate
		});

		if (res && res.errCode === 0) {
			toast.success("Save infor succeed!")
		} else {
			toast.error("error saveBulkScheduleDoctor !")
			console.log('error saveBulkScheduleDoctor>>>res:', res)
		}

	}

	render() {
		console.log('check state', this.state)
		console.log('check props', this.props)

		let { rangeTime } = this.state;
		let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
		return (
			<div className='manage-schedule-container'>
				<div className='m-s-title'>
					Quản lý kế hoạch khám bệnh của bác sĩ
				</div>
				<div className='container'>
					<div className='row'>
						<div className='col-6 form-group'>
							<label>Chọn bác sĩ</label>
							<Select
								value={this.state.selectedDoctor}
								onChange={this.handleChangeSelect}
								options={this.state.listDoctors}
							/>
						</div>
						<div className='col-6 form-group'>
							<label>Chọn ngày</label>
							<DatePicker
								onChange={this.handleOnChangeDatePicker}
								className="form-control"
								value={this.state.currentDate}
								minDate={yesterday}
							/>
						</div>
						<div className='col-12 pick-hour-container' >
							{rangeTime && rangeTime.length > 0 &&
								rangeTime.map((item, index) => {
									return (
										<button
											className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
											onClick={() => this.handleClickBtnTime(item)}
											key={index}>
											{item.valueVi ? item.valueVi : ""}
										</button>
									)
								})
							}
						</div>
						<div className='col-12'>
							<button className='btn btn-primary btn-save-schedule'
								onClick={() => this.handSaveSchedule()}
							>
								Lưu thông tin
							</button>
						</div>
					</div>
				</div>
			</div>

		);
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		allDoctors: state.admin.allDoctors,
		allScheduleTime: state.admin.allScheduleTime,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
		fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
