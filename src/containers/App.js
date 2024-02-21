import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import { userIsAuthenticated, userIsNotAuthenticated, } from "../hoc/authentication";
import { path } from "../utils";
import CustomScrollbars from "../components/CustomScrollbars";

import Home from "../routes/Home";
import Login from "./Auth/Login";
import SystemAdmin from "../routes/SystemAdmin.js";
import DoctorAdmin from "../routes/DoctorAdmin.js";

import HomePage from './HomePage/HomePage.js';
import VerifyEmail from "./Patient/VerifyEmail.js";
import DetailDoctor from "./Patient/Doctor/DetailDoctor.js";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty.js";
import DetailClinic from "./Patient/Clinic/DetailClinic.js";
import DetailHandbook from "./Patient/Handbook/DetailHandbook.js"
class App extends Component {

	render() {
		return (
			<Fragment>
				<Router history={history}>
					<div className="main-container">
						<div className="content-container">
							<CustomScrollbars style={{ height: "100vh", width: "100%" }}>
								<Switch>
									<Route path={path.HOME} exact component={Home} />
									<Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
									<Route path={path.SYSTEM_ADMIN} component={userIsAuthenticated(SystemAdmin)} />
									<Route path={path.DOCTOR_ADMIN} component={userIsAuthenticated(DoctorAdmin)} />

									<Route path={path.HOMEPAGE} component={(HomePage)} />
									<Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
									<Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
									<Route path={path.DETAIL_CLINIC} component={DetailClinic} />
									<Route path={path.DETAIL_HANDBOOK} component={DetailHandbook} />

									<Route path={path.VERIFY_EMAIL_BOOK} component={VerifyEmail} />

								</Switch>
							</CustomScrollbars>
						</div>

						<ToastContainer
							position="bottom-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
					</div>
				</Router>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
