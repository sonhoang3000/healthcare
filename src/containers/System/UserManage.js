import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers, deleteUserService, } from "../../services/userService";

class UserManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
		};
	}

	async componentDidMount() {
		await this.getAllUsersFromReact();
	}

	getAllUsersFromReact = async () => {
		let response = await getAllUsers("ALL");
		if (response && response.errCode === 0) {
			this.setState({
				arrUsers: response.users,
			});
		}
	};

	handleDeleteUser = async (user) => {
		try {
			let res = await deleteUserService(user.id)
			if (res && res.errCode === 0) {
				await this.getAllUsersFromReact();
			} else {
				alert(res.errMessage)
			}
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		let arrUsers = this.state.arrUsers;
		return (
			<div className="user-container">
				<div className="title text-center">Quản lý người dùng</div>

				<div className="users-table mt-4 mx-2">
					<table id="customers">
						<tbody>
							<tr>
								<th>Email</th>
								<th>Tên</th>
								<th>Họ</th>
								<th>Địa chỉ</th>
								<th>Số điện thoại</th>
								<th>Giới tính</th>
								<th>Chức vụ</th>
								<th>Xoá người dùng</th>
							</tr>

							{arrUsers &&
								arrUsers.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.email}</td>
											<td>{item.firstName}</td>
											<td>{item.lastName}</td>
											<td>{item.address}</td>
											<td>{item.phonenumber}</td>
											<td>{item.gender}</td>
											<td>{item.positionId}</td>
											<td>
												<button className="btn-delete" onClick={() => this.handleDeleteUser(item)} > <i className="fas fa-trash"></i> </button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
