import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter"

class ModalUser extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			address: ''
		}
		this.listenToEmitter();
	}

	listenToEmitter() {
		emitter.on('EVENT_CLEAR_MODAL_DARA', () => {
			// reset state
			this.setState({
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				address: ''
			})
		})
	} // bus event 

	componentDidMount() {
	}

	toggle = () => {
		this.props.toggleFromParent();

	}
	handleOnChangeInput = (event, id) => {
		// bad code
		/**
		 * this.state = {
		 * }
		 * 
		 */
		// this.state[id] = event.target.value;
		// this.setState({
		// 	...this.state
		// }, () => {
		// 	console.log('check bad: ', this.state)
		// })

		// good code
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState
		})
		// console.log('event 1:', event.target.value, id)
	}

	checkValidateInput = () => {
		let isValid = true;
		let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']

		for (let i = 0; i < arrInput.length; i++) {
			if (!this.state[arrInput[i]]) {
				isValid = false;
				alert('Missing parameters:' + arrInput[i])
				break;
			}
		}
		return isValid;
	}

	handleAddNewUser = () => {
		let isValid = this.checkValidateInput()
		if (isValid === true) {
			// call api create modal
			this.props.createNewUser(this.state);
		}
	}


	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				className={'modal-user-container'}
				toggle={() => { this.toggle() }}
				size="lg"
			>
				<ModalHeader toggle={() => { this.toggle() }}>Tạo mới người dùng </ModalHeader>
				<ModalBody>
					<div className='modal-user-body'>
						<div className='input-container'>
							<label>Email</label>
							<input
								type="text"
								onChange={(event) => { this.handleOnChangeInput(event, "email") }}
								value={this.state.email}
							/>
						</div>
						<div className='input-container'>
							<label>Mật khẩu</label>
							<input
								type="password"
								onChange={(event) => { this.handleOnChangeInput(event, "password") }}
								value={this.state.password}
							/>
						</div>
						<div className='input-container'>
							<label>Tên</label>
							<input
								type="text"
								onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
								value={this.state.firstName}
							/>
						</div>
						<div className='input-container'>
							<label>Họ</label>
							<input
								type="text"
								onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
								value={this.state.lastName}
							/>
						</div>
						<div className='input-container max-width-input'>
							<label>Địa chỉ</label>
							<input
								type="text"
								onChange={(event) => { this.handleOnChangeInput(event, "address") }}
								value={this.state.address}
							/>
						</div>
					</div>


				</ModalBody>
				<ModalFooter>
					<Button className='px-3' color="primary" onClick={() => { this.handleAddNewUser() }}>
						Thêm mới
					</Button>{" "}
					<Button className='px-3' color="secondary" onClick={() => { this.toggle() }}>
						Đóng
					</Button>
				</ModalFooter>
			</Modal>
		)
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


