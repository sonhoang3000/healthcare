import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';

class Specialty extends Component {

	constructor(props) {
		super(props)
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

	handleMoreSpecialty = () => {
		if (this.props.history) {
			this.props.history.push(`/more-specialty`)
		}
	}

	render() {
		let settings = {
			dots: false,
			infinite: false,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
		};
		let { dataSpecialty } = this.state;
		return (
			<div className="section-share section-specialty">
				<div className="section-container">
					<div className="section-header">
						<span className="title-section">Chuyên khoa phổ biến</span>
						<button
							className="btn-section"
							onClick={() => this.handleMoreSpecialty()}
						>xem thêm</button>
					</div>

					<div className="section-body">
						<Slider {...settings}>
							{dataSpecialty && dataSpecialty.length > 0 &&
								dataSpecialty.map((item, index) => {
									return (
										<div
											onClick={() => this.handleViewDetailSpecialty(item)}
											className="section-customize specialty-child"
											key={index}
										>
											<div
												className="bg-image section-specialty"
												style={{ backgroundImage: `url(${item.image})` }}
											/>
											<div className="specialty-name">{item.name}</div>
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

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
