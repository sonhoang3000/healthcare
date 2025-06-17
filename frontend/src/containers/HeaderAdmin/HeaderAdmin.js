import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './HeaderAdmin.scss';
import { USER_ROLE } from "../../utils";
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }

            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }

        this.setState({
            menuApp: menu
        })
    }


    render() {
        const { processLogoutHeaderAdmin, userInfo } = this.props;
        console.log('check userInfo props:', this.props);

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='languages'>
                    <span className="welcome">
                        Xin chào,
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                    </span>
                    {/* {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogoutHeaderAdmin} title="Log out" >
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogoutHeaderAdmin: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
