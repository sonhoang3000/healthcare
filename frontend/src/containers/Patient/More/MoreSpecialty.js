import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './MoreList.scss'
import { getAllSpecialty } from '../../../services/userService'
import HomeFooter from '../../HomePage/HomeFooter';
class MoreSpecialty extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  dataSpecialty: []
            }
      }

      async componentDidMount() {
            let res = await getAllSpecialty();
            if (res && res.errCode === 0) {
                  this.setState({
                        dataSpecialty: res.data ? res.data : []
                  })
            }
      }

      handleViewDetailSpecialty = (item) => {
            if (this.props.history) {
                  this.props.history.push(`/detail-specialty/${item.id}`)
            }
      }

      returnToHome = () => {
            if (this.props.history) {
                  this.props.history.push(`/home`)
            }
      }

      render() {
            let { dataSpecialty } = this.state;
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
                                    <p>Chuyên khoa khám</p>
                              </div>
                              <div className='display-specialty'>
                                    <p>Chuyên khoa khám</p>
                                    {dataSpecialty && dataSpecialty.length > 0 &&
                                          dataSpecialty.map((item, index) => {
                                                return (
                                                      <div
                                                            className="section-customize "
                                                            key={index}
                                                      >
                                                            <div className="bg-image "
                                                                  onClick={() => this.handleViewDetailSpecialty(item)}
                                                                  style={{ backgroundImage: `url(${item.image})` }}
                                                            />
                                                            <div className="specialty-name">
                                                                  {item.name}
                                                            </div>
                                                      </div>
                                                )
                                          })}

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

export default connect(mapStateToProps, mapDispatchToProps)(MoreSpecialty);
