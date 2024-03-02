import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './MoreList.scss'
import { getAllClinic } from '../../../services/userService';
import HomeFooter from '../../HomePage/HomeFooter';

class MoreClinic extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  dataClinics: []
            }
      }

      async componentDidMount() {
            let res = await getAllClinic();
            if (res && res.errCode === 0) {
                  this.setState({
                        dataClinics: res.data ? res.data : []
                  })
            }
      }

      handleViewDetailClinic = (clinic) => {
            if (this.props.history) {
                  this.props.history.push(`/detail-clinic/${clinic.id}`)
            }
      }

      returnToHome = () => {
            if (this.props.history) {
                  this.props.history.push(`/home`)
            }
      }

      render() {
            let { dataClinics } = this.state
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
                                    <p>Cơ sở y tế</p>
                              </div>

                              <div className='p-clinic'>Cơ sở y tế</div>

                              <div className='display-clinic row '>

                                    {dataClinics && dataClinics.length > 0 &&
                                          dataClinics.map((item, index) => {
                                                return (
                                                      <div className="section-customize clinic-child-more col-4"
                                                            onClick={() => this.handleViewDetailClinic(item)}
                                                            key={index}
                                                      >
                                                            <div className="bg-image section-medical-facility"
                                                                  style={{ backgroundImage: `url(${item.image})` }}
                                                            />
                                                            <div className='clinic-name'>{item.name}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MoreClinic);
