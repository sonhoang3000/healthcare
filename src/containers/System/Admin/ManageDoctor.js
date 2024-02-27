import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select';
import { CRUD_ACTIONS } from '../../../utils';
import { getDetailInforDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// save to markdown table
			contentMarkdown: '',
			contentHTML: '',
			selectedOption: '',
			description: '',
			listDoctors: [],
			hasOldData: false,

			// save to doctor_infor table
			listPrice: [],
			listPayment: [],
			listProvince: [],
			listClinic: [],
			listSpecialty: [],

			selectedPrice: '',
			selectedPayment: '',
			selectedProvince: '',
			selectedClinic: '',
			selectedSpecialty: '',

			nameClinic: '',
			addressClinic: '',
			note: '',
			clinicId: '',
			specialtyId: ''
		};
	}

	componentDidMount() {
		this.props.fetchAllDoctors()
		this.props.getAllRequiredDoctorInfor()
	}

	buildDataInputSelect = (inputData, type) => {
		let result = [];
		if (inputData && inputData.length > 0) {
			if (type === 'USERS') {
				inputData.forEach((item, index) => {
					let object = {};
					let labelVi = `${item.lastName} ${item.firstName}`;
					object.label = labelVi ? labelVi : "";
					object.value = item.id;
					result.push(object)
				})
			}
			if (type === 'PRICE') {
				inputData.forEach((item, index) => {
					let object = {};
					let labelVi = `${item.valueVi} `;
					object.label = labelVi ? labelVi : "";
					object.value = item.keyMap;
					result.push(object)
				})
			}
			if (type === 'PAYMENT' || type === 'PROVINCE') {
				inputData.forEach((item, index) => {
					let object = {};
					let labelVi = `${item.valueVi} `;
					object.label = labelVi ? labelVi : "";
					object.value = item.keyMap;
					result.push(object)
				})
			}

			if (type === "SPECIALTY") {
				inputData.forEach((item, index) => {
					let object = {};
					object.label = item.name;
					object.value = item.id;
					result.push(object)
				})
			}

			if (type === "CLINIC") {
				inputData.forEach((item, index) => {
					let object = {};
					object.label = item.name;
					object.value = item.id;
					result.push(object)
				})
			}

		}
		return result;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.allDoctors !== this.props.allDoctors) {
			let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
			this.setState({
				listDoctors: dataSelect
			})
		}


		if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
			let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;

			let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
			let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
			let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE")
			let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY")
			let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC")

			this.setState({
				listPrice: dataSelectPrice,
				listPayment: dataSelectPayment,
				listProvince: dataSelectProvince,
				listSpecialty: dataSelectSpecialty,
				listClinic: dataSelectClinic
			})
		}

		if (prevProps.language !== this.props.language) {
			let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
			let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
			let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
			let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
			let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE")
			this.setState({
				listDoctors: dataSelect,
				listPrice: dataSelectPrice,
				listPayment: dataSelectPayment,
				listProvince: dataSelectProvince,
			})
		}
	}

	handleEditorChange = ({ html, text }) => {
		this.setState({
			contentMarkdown: text,
			contentHTML: html,
		})
	}

	handleSaveContentMarkdown = () => {
		let { hasOldData } = this.state;

		this.props.saveDetailDoctor({
			contentHTML: this.state.contentHTML,
			contentMarkdown: this.state.contentMarkdown,
			description: this.state.description,
			doctorId: this.state.selectedOption.value,
			action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

			selectedPrice: this.state.selectedPrice.value,
			selectedPayment: this.state.selectedPayment.value,
			selectedProvince: this.state.selectedProvince.value,
			nameClinic: this.state.nameClinic,
			addressClinic: this.state.addressClinic,
			note: this.state.note,
			clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
			specialtyId: this.state.selectedSpecialty.value

		})
	}

	handleChangeSelect = async (selectedOption) => {
		this.setState({ selectedOption });
		let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state
		let res = await getDetailInforDoctor(selectedOption.value)
		if (res && res.errCode === 0 && res.data && res.data.Markdown) {
			let markdown = res.data.Markdown;

			let addressClinic = '', nameClinic = '', note = '',
				paymentId = '', priceId = '', provinceId = '', specialtyId = '', clinicId = '',
				selectedPayment = '', selectedPrice = '', selectedProvince = '', selectedClinic = '',
				selectedSpecialty = ''
				;



			if (res.data.Doctor_Infor) {
				addressClinic = res.data.Doctor_Infor.addressClinic;
				nameClinic = res.data.Doctor_Infor.nameClinic;
				note = res.data.Doctor_Infor.note;
				paymentId = res.data.Doctor_Infor.paymentId;
				priceId = res.data.Doctor_Infor.priceId;
				provinceId = res.data.Doctor_Infor.provinceId;
				specialtyId = res.data.Doctor_Infor.specialtyId;
				clinicId = res.data.Doctor_Infor.clinicId;

				selectedPayment = listPayment.find(item => {
					return item && item.value === paymentId
				})
				selectedPrice = listPrice.find(item => {
					return item && item.value === priceId
				})
				selectedProvince = listProvince.find(item => {
					return item && item.value === provinceId
				})
				selectedSpecialty = listSpecialty.find(item => {
					return item && item.value === specialtyId
				})
				selectedClinic = listClinic.find(item => {
					return item && item.value === clinicId
				})
			}

			this.setState({
				contentHTML: markdown.contentHTML,
				contentMarkdown: markdown.contentMarkdown,
				description: markdown.description,
				hasOldData: true,
				addressClinic: addressClinic,
				nameClinic: nameClinic,
				note: note,
				selectedPayment: selectedPayment,
				selectedPrice: selectedPrice,
				selectedProvince: selectedProvince,
				selectedSpecialty: selectedSpecialty,
				selectedClinic: selectedClinic
			})
		} else {
			this.setState({
				contentHTML: '',
				contentMarkdown: '',
				description: '',
				hasOldData: false,
				addressClinic: '',
				nameClinic: '',
				note: '',
				selectedPayment: '',
				selectedPrice: '',
				selectedProvince: '',
				selectedSpecialty: '',
				selectedClinic: ''
			})
		}
	};

	handleChangeSelectDoctorInfor = async (selectedOption, name) => {
		let stateName = name.name;
		let stateCopy = { ...this.state };
		stateCopy[stateName] = selectedOption;

		this.setState({
			...stateCopy
		})
	}

	handleOnChangeText = (event, id) => {
		let stateCopy = { ...this.state };
		stateCopy[id] = event.target.value;
		this.setState({
			...stateCopy
		})
	}
	render() {
		let { hasOldData } = this.state;
		return (
			<div className="manage-doctor-container">
				<div className="manage-doctor-title">
					Tạo thêm thông tin doctors
				</div>
				<div className="more-infor">
					<div className="content-left form-group">
						<label>Chọn bác sĩ </label>
						<Select
							value={this.state.selectedOption}
							onChange={this.handleChangeSelect}
							options={this.state.listDoctors}
							placeholder="Chọn bác sĩ"
						/>
					</div>
					<div className="content-right">
						<label>Thông tin giới thiệu:</label>
						<textarea className="form-control"
							onChange={(event) => this.handleOnChangeText(event, 'description')}
							value={this.state.description}
						>
						</textarea>
					</div>
				</div>
				<div className="more-infor-extra row">
					<div className="col-4 form-group">
						<label> Giá khám bệnh</label>
						<Select
							value={this.state.selectedPrice}
							onChange={this.handleChangeSelectDoctorInfor}
							options={this.state.listPrice}
							placeholder="Giá khám bệnh"
							name="selectedPrice"
						/>
					</div>
					<div className="col-4 form-group">
						<label>Phương thức thanh toán</label>
						<Select
							value={this.state.selectedPayment}
							onChange={this.handleChangeSelectDoctorInfor}
							options={this.state.listPayment}
							placeholder="Phương thức thanh toán"
							name="selectedPayment"
						/>
					</div>
					<div className="col-4 form-group">
						<label>Tỉnh thành</label>
						<Select
							value={this.state.selectedProvince}
							onChange={this.handleChangeSelectDoctorInfor}
							options={this.state.listProvince}
							placeholder="Tỉnh thành"
							name="selectedProvince"
						/>
					</div>

					<div className="col-4 form-group">
						<label>Tên phòng khám"</label>
						<input className="form-control"
							onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
							value={this.state.nameClinic}
						/>
					</div>
					<div className="col-4 form-group">
						<label>Địa chỉ phòng khám</label>
						<input className="form-control"
							onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
							value={this.state.addressClinic}
						/>

					</div>
					<div className="col-4 form-group">
						<label>Ghi chú</label>
						<input className="form-control"
							onChange={(event) => this.handleOnChangeText(event, 'note')}
							value={this.state.note}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-4 form-group">
						<label>Chọn chuyên khoa</label>
						<Select
							value={this.state.selectedSpecialty}
							options={this.state.listSpecialty}
							placeholder="Chọn chuyên khoa"
							onChange={this.handleChangeSelectDoctorInfor}
							name="selectedSpecialty"
						/>
					</div>
					<div className="col-4 form-group">
						<label>Chọn khòng khám</label>
						<Select
							value={this.state.selectedClinic}
							options={this.state.listClinic}
							placeholder="Chọn khòng khám"
							onChange={this.handleChangeSelectDoctorInfor}
							name="selectedClinic"
						/>
					</div>
				</div>

				<div className="manage-doctor-editor">
					<MdEditor
						style={{ height: '300px' }}
						renderHTML={text => mdParser.render(text)}
						onChange={this.handleEditorChange}
						value={this.state.contentMarkdown}
					/>
				</div>

				<button
					onClick={() => this.handleSaveContentMarkdown()}
					className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}>
					{hasOldData === true ?
						<span>
							Lưu thông tin
						</span>
						:
						<span>
							Tạo thông tin
						</span>
					}
				</button>
			</div>

		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		allDoctors: state.admin.allDoctors,
		allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
		getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
		saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
