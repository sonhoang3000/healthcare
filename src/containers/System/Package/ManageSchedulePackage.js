import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedulePackage.scss';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from "react-toastify"
import _ from 'lodash';
import { saveBulkSchedulePackage } from '../../../services/userService';

class ManageSchedulePackage extends Component {
      constructor(props) {
            super(props);

            this.state = {
                  listPackage: [],
                  selectedPackage: {},
                  currentDate: '',
                  rangeTime: [],
            }
      }



      componentDidMount() {
            this.props.fetchAllPackages();
            this.props.fetchAllSchedulePackageTime();
      }

      componentDidUpdate(prevProps, prevState, snapshot) {
            if (prevProps.allPackages !== this.props.allPackages) {
                  let dataSelectPackage = this.buildDataInputSelect(this.props.allPackages)
                  this.setState({
                        listPackage: dataSelectPackage
                  })
            }
            if (prevProps.allSchedulePackageTime !== this.props.allSchedulePackageTime) {
                  let data = this.props.allSchedulePackageTime;
                  if (data && data.length > 0) {
                        data = data.map(item => ({ ...item, isSelected: false }))
                  }
                  this.setState({
                        rangeTime: data
                  })
            }
      }

      buildDataInputSelect = (inputData) => {
            let result = [];
            if (inputData && inputData.length > 0) {
                  inputData.forEach((item, index) => {
                        let object = {};
                        let labelVi = `${item.name}`;
                        object.label = labelVi ? labelVi : "";
                        object.value = item.id;
                        result.push(object)
                  })
            }
            return result;
      }

      handleChangeSelect = async (selectedOption) => {
            this.setState({ selectedPackage: selectedOption });
      };

      handleOnChangeDatePicker = (date) => {
            this.setState({
                  currentDate: date[0]
            })
      }

      handleClickBtnTime = (time) => {
            let { rangeTime } = this.state;
            if (rangeTime && rangeTime.length > 0) {
                  rangeTime = rangeTime.map(item => {
                        if (item.id === time.id) item.isSelected = !item.isSelected;
                        return item;
                  })
                  this.setState({
                        rangeTime: rangeTime
                  })
            }
      }

      handSaveSchedule = async () => {
            let { rangeTime, selectedPackage, currentDate } = this.state;
            let result = [];

            if (!currentDate) {
                  toast.error("Invalid date!")
                  return;
            }
            if (selectedPackage && _.isEmpty(selectedPackage)) {
                  toast.error("Invalid seclected Package!")
                  return;
            }

            let formatedDate = new Date(currentDate).getTime();

            if (rangeTime && rangeTime.length > 0) {
                  let selectedTime = rangeTime.filter(item => item.isSelected === true);
                  if (selectedTime && selectedTime.length > 0) {
                        selectedTime.forEach((item, index) => {
                              let object = {};
                              object.packageId = selectedPackage.value;
                              object.date = formatedDate;
                              object.timeType = item.keyMap;
                              result.push(object)
                        })

                  } else {
                        toast.error("Invalid seclected time!")
                        return;
                  }
            }

            let res = await saveBulkSchedulePackage({
                  arrSchedulePackage: result,
                  packageId: selectedPackage.value,
                  formatedDate: formatedDate
            });

            if (res && res.errCode === 0) {
                  toast.success("Save infor succeed!")
            } else {
                  toast.error("error saveBulkSchedulePackage !")
                  console.log('error saveBulkSchedulePackage >>> res:', res)
            }

      }

      render() {
            let { rangeTime } = this.state;
            let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

            console.log('check state', this.state)
            console.log('check props', this.props)
            return (
                  <div className='manage-schedule-container'>
                        <div className='m-s-title'>
                              Quản lý kế hoạch khám bệnh của goi dich vu
                        </div>
                        <div className='container'>
                              <div className='row'>
                                    <div className='col-6 form-group'>
                                          <label>Chọn bác sĩ</label>
                                          <Select
                                                value={this.state.selectedPackage}
                                                onChange={this.handleChangeSelect}
                                                options={this.state.listPackage}
                                          />
                                    </div>
                                    <div className='col-6 form-group'>
                                          <label>Chọn ngày</label>
                                          <DatePicker
                                                onChange={this.handleOnChangeDatePicker}
                                                className="form-control"
                                                value={this.state.currentDate}
                                                minDate={yesterday}
                                          />
                                    </div>
                                    <div className='col-12 pick-hour-container' >
                                          {rangeTime && rangeTime.length > 0 &&
                                                rangeTime.map((item, index) => {
                                                      return (
                                                            <button
                                                                  className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                                                  onClick={() => this.handleClickBtnTime(item)}
                                                                  key={index}>
                                                                  {item.valueVi ? item.valueVi : ""}
                                                            </button>
                                                      )
                                                })
                                          }
                                    </div>
                                    <div className='col-12'>
                                          <button className='btn btn-primary btn-save-schedule'
                                                onClick={() => this.handSaveSchedule()}
                                          >
                                                Lưu thông tin
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>

            );
      }
}

const mapStateToProps = state => {
      return {
            isLoggedIn: state.user.isLoggedIn,
            allPackages: state.admin.allPackages,
            allSchedulePackageTime: state.admin.allSchedulePackageTime,
      };
};

const mapDispatchToProps = dispatch => {
      return {
            fetchAllPackages: () => dispatch(actions.fetchAllPackages()),
            fetchAllSchedulePackageTime: () => dispatch(actions.fetchAllSchedulePackageTime()),
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedulePackage);
