import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePackage.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewPackage } from '../../../services/userService';
import { CommonUtils } from "../../../utils";
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManagePackage extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  name: '',
                  address: '',
                  price: '',
                  imageBase64: '',
                  description: '',
                  descriptionHTML: '',
                  descriptionMarkdown: '',
            }
      }

      handleOnchangeInput = (event, id) => {
            let stateCopy = { ...this.state };
            stateCopy[id] = event.target.value;
            this.setState({
                  ...stateCopy
            })
      }

      handleEditorChange = ({ html, text }) => {
            this.setState({
                  descriptionHTML: html,
                  descriptionMarkdown: text,
            })
      }

      handleOnchangeImage = async (event) => {
            let data = event.target.files;
            let file = data[0];
            if (file) {
                  let base64 = await CommonUtils.getBase64(file);
                  this.setState({
                        imageBase64: base64,
                  })

            }
      }

      handleSaveNewPackage = async () => {
            let res = await createNewPackage(this.state);
            if (res && res.errCode === 0) {
                  toast.success('Add new clinic succeed')
                  this.setState({
                        name: '',
                        imageBase64: '',
                        address: '',
                        price: '',
                        description: '',
                        descriptionHTML: '',
                        descriptionMarkdown: '',
                  })
            } else {
                  toast.error('Something wrong ...')
                  console.log('check res', res)
            }
      }

      render() {
            console.log('checl state', this.state)
            return (
                  <div className='manage-specialty-container'>
                        <div className='ms-title'>Quản lý gói khám </div>

                        <div className='all-new-specialty row'>
                              <div className='col-6 form-group'>
                                    <label>Tên gói khám </label>
                                    <input className='form-control' type="text" value={this.state.name}
                                          onChange={(event) => this.handleOnchangeInput(event, 'name')}
                                    />
                              </div>
                              <div className='col-6 form-group'>
                                    <label>Ảnh gói khám </label>
                                    <input className='form-control-file' type="file"
                                          onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                              </div>
                              <div className='col-6 form-group'>
                                    <label>Giá  gói  khám</label>
                                    <input className='form-control' type="number" value={this.state.price}
                                          onChange={(event) => this.handleOnchangeInput(event, 'price')}
                                    />
                              </div>

                              <div className='col-6 form-group'>
                                    <label>Địa chỉ của gói khám  </label>
                                    <input className='form-control' type="text" value={this.state.address}
                                          onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                    />
                              </div>

                              <div className='col-12 form-group'>
                                    <label>Mô tả của gói khám  </label>
                                    <input className='form-control' type="text" value={this.state.description}
                                          onChange={(event) => this.handleOnchangeInput(event, 'description')}
                                    />
                              </div>

                              <div className='col-12'>
                                    <MdEditor
                                          style={{ height: '400px' }}
                                          renderHTML={text => mdParser.render(text)}
                                          onChange={this.handleEditorChange}
                                          value={this.state.descriptionMarkdown}
                                    />
                              </div>

                              <div className='col-12'>
                                    <button className='btn-save-specialty'
                                          onClick={() => this.handleSaveNewPackage()}
                                    >Save</button>
                              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePackage);
