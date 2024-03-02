import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './MoreExaminationPackage.scss'
import { getAllPackage } from '../../../services/userService';
import HomeFooter from '../../HomePage/HomeFooter';
import NumberFormat from 'react-number-format';
import { withRouter } from 'react-router';

class MoreClinic extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  dataPackage: []
            }
      }

      async componentDidMount() {
            let res = await getAllPackage();
            if (res && res.errCode === 0) {
                  this.setState({
                        dataPackage: res.data ? res.data : []
                  })
            }
      }

      handleViewDetailPackage = (detailpackage) => {
            if (this.props.history) {
                  this.props.history.push(`/detail-package/${detailpackage.id}`)
            }
      }

      returnToHome = () => {
            if (this.props.history) {
                  this.props.history.push(`/home`)
            }
      }


      render() {
            let { dataPackage } = this.state
            console.log('check dataPackage', this.state.dataPackage)
            return (
                  <>
                        <HomeHeader />

                        <div className='display-more-package'>
                              <div className='title-home'>
                                    <span
                                          onClick={() => this.returnToHome()}
                                          className='color-i'>
                                          <i class="fa-solid fa-house"></i>
                                          /
                                    </span>
                                    <p>Khám tổng quát </p>
                              </div>

                              <div className='title-package'>Gói khám tổng quát nổi bật </div>
                              <div className='package-container row'>
                                    {dataPackage && dataPackage.length > 0 &&
                                          dataPackage.map((item, index) => {
                                                return (
                                                      <div className="package-child col-3"
                                                            onClick={() => this.handleViewDetailPackage(item)}
                                                            key={index}
                                                      >
                                                            <div className="bg-image section-medical-facility"
                                                                  style={{ backgroundImage: `url(${item.image})` }}
                                                            />
                                                            <div className='package-name'>{item.name}</div>

                                                            <div className='package-price'>
                                                                  <div className='display-left'> Giá khám: </div>
                                                                  <div className='display-right'>
                                                                        <div>
                                                                              <NumberFormat
                                                                                    className='currency'
                                                                                    value={item.price}
                                                                                    displayType={'text'}
                                                                                    thousandSeparator={true}
                                                                                    suffix={'VND'}
                                                                              />
                                                                        </div>

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
      };
};

const mapDispatchToProps = dispatch => {
      return {
      };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreClinic));
