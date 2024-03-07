import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HistoryPatient.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router';

class HistoryPatient extends Component {

      constructor(props) {
            super(props);
            this.state = {
            }
      }




      render() {

            return (
                  <>
                        <HomeHeader />

                        <div className='history-patient-container row'>
                              <div className='exit-click'>
                                    x
                              </div>
                              <div className='title'>NHẬP THÔNG TIN ĐỂ XEM LỊCH SỬ BỆNH ÁN</div>

                              <div className='col-12 form-group infor-input '>
                                    <label>Họ và Tên</label>
                                    <input className='form-control' type="text" placeholder='Nhập Họ và Tên'
                                    />
                              </div>

                              <div className='col-12 form-group infor-input fullname-input'>
                                    <label>Nhập CCCD</label>
                                    <input className='form-control' type="text" placeholder='Nhập CCCD'
                                    />
                              </div>

                              <div className='booking-modal-footer'>
                                    <button
                                          className='btn-booking-confirm'
                                    >
                                          Xác nhận
                                    </button>
                                    <button
                                          className='btn-booking-cancel'
                                    >
                                          Huỷ
                                    </button>

                              </div>

                        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HistoryPatient));
