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
import System from "../routes/System";
import Doctor from "../routes/Doctor.js";

import HomePage from './HomePage/HomePage.js';
import DetailDoctor from "./Patient/Doctor/DetailDoctor.js";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty.js";
import DetailClinic from "./Patient/Clinic/DetailClinic.js";

import MoreDoctor from "./Patient/More/MoreDoctor"
import MoreSpecialty from "./Patient/More/MoreSpecialty"
import MoreClinic from "./Patient/More/MoreClinic"

import HistoryPatient from "./Patient/HistoryPatient/HistoryPatient"

import VerifyEmail from "./Patient/VerifyEmail.js";
class App extends Component {

	handlePersistorState = () => {
		const { persistor } = this.props;
		let { bootstrapped } = persistor.getState();
		if (bootstrapped) {
			if (this.props.onBeforeLift) {
				Promise.resolve(this.props.onBeforeLift())
					.then(() => this.setState({ bootstrapped: true }))
					.catch(() => this.setState({ bootstrapped: true }));
			} else {
				this.setState({ bootstrapped: true });
			}
		}
	};

	componentDidMount() {
		this.handlePersistorState();
	}

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
									<Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
									<Route path={'/doctor/'} component={userIsAuthenticated(Doctor)} />

									<Route path={path.HOMEPAGE} component={(HomePage)} />
									<Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
									<Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
									<Route path={path.DETAIL_CLINIC} component={DetailClinic} />

									<Route path={path.MORE_DOCTOR} component={MoreDoctor} />
									<Route path={path.MORE_SPECIALTY} component={MoreSpecialty} />
									<Route path={path.MORE_CLINIC} component={MoreClinic} />

									<Route path={path.HISTORY_PATIENT} component={HistoryPatient} />

									<Route path={path.VERIFY_EMAIL_BOOK} component={VerifyEmail} />

								</Switch>
							</CustomScrollbars>
						</div>

						{/* <ToastContainer
							className="toast-container"
							toastClassName="toast-item"
							bodyClassName="toast-item-body"
							autoClose={false}
							hideProgressBar={true}
							pauseOnHover={false}
							pauseOnFocusLoss={true}
							closeOnClick={false}
							draggable={false}
							closeButton={<CustomToastCloseButton />}
						/> */}

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
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
