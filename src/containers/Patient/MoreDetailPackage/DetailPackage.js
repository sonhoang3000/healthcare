import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailPackageServiceById } from '../../../services/userService';
import HomeFooter from "../../HomePage/HomeFooter"
import './DetailPackage.scss'
import _ from 'lodash';
import PackageSchedule from './PackageSchedule'

class DetailPackage extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  dataDetailPackage: {},
                  currentPackageId: -1,
            }
      }

      async componentDidMount() {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                  let id = this.props.match.params.id;

                  this.setState({
                        currentPackageId: id
                  })

                  let res = await getDetailPackageServiceById({
                        id: id,
                  });
                  if (res && res.errCode === 0) {
                        this.setState({
                              dataDetailPackage: res.data,
                        })
                  }
            }
      }

      returnToHome = () => {
            if (this.props.history) {
                  this.props.history.push(`/home`)
            }
      }

      handleMorePackage = () => {
            if (this.props.history) {
                  this.props.history.push(`/more-package`)
            }
      }

      render() {
            let { dataDetailPackage } = this.state;
            return (
                  <>
                        <HomeHeader />
                        <div className='container-body-package'>
                              <div className='title-home'>
                                    <span
                                          onClick={() => this.returnToHome()}
                                          className='color-i'>
                                          <i class="fa-solid fa-house"></i>
                                          /
                                    </span>
                                    {dataDetailPackage && dataDetailPackage.name &&
                                          <p>
                                                <span onClick={() => this.handleMorePackage()}>Khám tổng quát /</span>
                                                {dataDetailPackage.name}
                                          </p>
                                    }
                              </div>
                              <div className='intro-package'>
                                    <div className='content-left'
                                          style={{ backgroundImage: `url(${dataDetailPackage && dataDetailPackage.image ? dataDetailPackage.image : ''})` }}
                                    />

                                    <div className='content-right' >
                                          <div className='up-package'>
                                                {dataDetailPackage && dataDetailPackage.name ? dataDetailPackage.name : ""
                                                }
                                          </div>
                                          <div className='down-package'>
                                                {dataDetailPackage && dataDetailPackage.description ? dataDetailPackage.description : ""
                                                }
                                          </div>
                                    </div>
                              </div>

                              <div className='schedule-package'>
                                    <div className='content-left'>
                                          <PackageSchedule
                                                packageIdFromParent={this.state.currentPackageId}
                                          />
                                    </div>
                                    <div className='content-right'>

                                    </div>
                              </div>

                              <div className='schedule-package'>

                                    {/* <div className='content-left'>
                                          <DoctorSchedule
                                          />
                                    </div>
                                    <div className='content-right'>
                                          <DoctorExtraInfor
                                          />
                                    </div> */}
                              </div>

                              <div className='detail-infor-package'>
                                    {dataDetailPackage && dataDetailPackage.descriptionHTML && dataDetailPackage.descriptionHTML
                                          &&
                                          <div dangerouslySetInnerHTML={{ __html: dataDetailPackage.descriptionHTML }} >

                                          </div>
                                    }
                              </div>
                        </div>
                        <HomeFooter />
                  </>

            );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailPackage);
