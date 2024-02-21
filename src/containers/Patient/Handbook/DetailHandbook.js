import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailHandbook.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailHandbookById } from '../../../services/userService';
import _ from 'lodash';
class DetailHandbook extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  arrDoctorId: [],
                  dataDetailHandbook: {},
            }
      }

      async componentDidMount() {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                  let id = this.props.match.params.id;
                  let res = await getDetailHandbookById({
                        id: id
                  });


                  if (res && res.errCode === 0) {
                        let data = res.data;
                        let arrDoctorId = [];
                        if (data && !_.isEmpty(res.data)) {
                              let arr = data.doctorHandbook;
                              if (arr && arr.length > 0) {
                                    arr.forEach(item => {
                                          arrDoctorId.push(item.doctorId)
                                    })
                              }
                        }

                        this.setState({
                              dataDetailHandbook: res.data,
                              arrDoctorId: arrDoctorId,
                        })
                  }
            }
      }

      render() {
            let { arrDoctorId, dataDetailHandbook } = this.state
            return (
                  <div className='detail-handbook-container'>
                        <HomeHeader />
                        <div className='detail-handbook-body'>

                              <div className='description-handbook'>
                                    {dataDetailHandbook && !_.isEmpty(dataDetailHandbook)
                                          &&
                                          <>
                                                <div className='title-handbook'>{dataDetailHandbook.name}</div>
                                                <div className='address-handbook'>{dataDetailHandbook.address}</div>
                                                <div dangerouslySetInnerHTML={{ __html: dataDetailHandbook.descriptionHTML }} ></div>
                                          </>
                                    }
                              </div>

                              {arrDoctorId && arrDoctorId.length > 0 &&
                                    arrDoctorId.map((item, index) => {
                                          return (
                                                <div className='each-doctor' key={index}>
                                                      <div className='dt-content-left'>
                                                            <div className='profile-doctor'>
                                                                  <ProfileDoctor
                                                                        doctorId={item}
                                                                        isShowDescriptionDoctor={true}
                                                                        isShowLinkDetail={true}
                                                                        isShowPrice={false}
                                                                  />
                                                            </div>
                                                      </div>
                                                      <div className='dt-content-right'>
                                                            <div className='doctor-schedule'>
                                                                  <DoctorSchedule
                                                                        doctorIdFromParent={item}
                                                                  />
                                                            </div>
                                                            <div className='doctor-extra-infor'>
                                                                  <DoctorExtraInfor
                                                                        doctorIdFromParent={item}
                                                                  />
                                                            </div>

                                                      </div>
                                                </div>
                                          )
                                    })
                              }
                        </div>

                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
