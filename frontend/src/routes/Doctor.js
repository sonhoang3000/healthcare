import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import HeaderAdmin from '../containers/HeaderAdmin/HeaderAdmin';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
class Doctor extends Component {

	render() {
		const { isLoggedIn } = this.props;

		return (
			<React.Fragment>
				{isLoggedIn && <HeaderAdmin />}
				<div className="system-container">
					<div className="system-list">
						<Switch>
							<Route path="/doctor/manage-schedule" component={ManageSchedule} />
							<Route path="/doctor/manage-patient" component={ManagePatient} />

						</Switch>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
