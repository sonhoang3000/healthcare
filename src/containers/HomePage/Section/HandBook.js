import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { getAllHandbook } from '../../../services/userService'

class HandBook extends Component {

	constructor(props) {
		super(props)
		this.state = {
			dataHandbook: []
		}
	}

	async componentDidMount() {
		let res = await getAllHandbook();
		if (res && res.errCode === 0) {
			this.setState({
				dataHandbook: res.data ? res.data : []
			})
		}
	}

	handleViewDetailHandbook = (item) => {
		if (this.props.history) {
			this.props.history.push(`/detail-handbook/${item.id}`)
		}
		console.log('check item', item)
	}

	render() {
		let { dataHandbook } = this.state
		return (
			<div className="section-share section-handbook ">
				<div className="section-container">
					<div className="section-header">
						<span className="title-section">Cẩm nang</span>
						<button className="btn-section">Xem thêm</button>
					</div>

					<div className="section-body">
						<Slider {...this.props.settings}>
							{dataHandbook && dataHandbook.length > 0 &&
								dataHandbook.map((item, index) => {
									return (
										<div
											onClick={() => this.handleViewDetailHandbook(item)}
											className="section-customize handbook-child"
											key={index}
										>
											<div className="bg-image section-handbook"
												style={{ backgroundImage: `url(${item.image})` }}
											/>
											<div className='handbook-name'>{item.name}</div>
										</div>
									)
								})}



						</Slider>
					</div>
				</div>
			</div >
		)


	}

}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.user.isLoggedIn
	};
};

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
