import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../HomePage/HomeHeader';
import './MoreList.scss'
import HomeFooter from '../../HomePage/HomeFooter';
class MoreDoctor extends Component {

      constructor(props) {
            super(props)
            this.state = {
                  arrDoctors: []
            }
      }

      componentDidUpdate(prevProps, prevState, snapshot) {
            if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
                  this.setState({
                        arrDoctors: this.props.topDoctorsRedux
                  })
            }
      }

      componentDidMount() {
            this.props.loadTopDoctors();
      }

      handleViewDetailDoctor = (doctor) => {
            if (this.props.history) {
                  this.props.history.push(`/detail-doctor/${doctor.id}`)
            }
      }

      returnToHome = () => {
            if (this.props.history) {
                  this.props.history.push(`/home`)
            }
      }

      render() {
            let arrDoctors = this.state.arrDoctors;

            return (
                  <>
                        <HomeHeader />
                        <div className='more-list'>
                              <div className='title-home'>
                                    <span
                                          onClick={() => this.returnToHome()}
                                          className='color-i'>
                                          <i class="fa-solid fa-house"></i>
                                          /
                                    </span>
                                    <p>Bác sĩ nổi bật</p>
                              </div>
                              <div className='display-specialty'>
                                    <p>Bác sĩ nổi bật</p>
                                    {arrDoctors && arrDoctors.length > 0 &&
                                          arrDoctors.map((item, index) => {
                                                let imageBase64 = '';
                                                if (item.image) {
                                                      imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                                }
                                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                                                return (
                                                      <div className="section-customize" key={index} onClick={() => this.handleViewDetailDoctor(item)}  >
                                                            <div className='customize-border'>
                                                                  <div className='bg-image section-outstanding-doctor'
                                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                                  />
                                                                  <div className='doctor-name text-center'>
                                                                        <div className='infor-doctor-p' >{nameVi}</div>
                                                                        {/* <div>Cơ Xương Khớp </div> */}
                                                                  </div>
                                                            </div>
                                                      </div>
                                                )
                                          })
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
            topDoctorsRedux: state.admin.topDoctors
      };
};

const mapDispatchToProps = dispatch => {
      return {
            loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreDoctor);
