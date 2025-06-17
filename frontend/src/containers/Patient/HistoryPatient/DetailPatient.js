import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailPatient.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router';

class DetailPatient extends Component {

      constructor(props) {
            super(props);
            this.state = {
            }
      }




      render() {

            return (
                  <>
                        <HomeHeader />
                        DetailPatient
                  </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailPatient));
