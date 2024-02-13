import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {

	render() {
		return (
			<div className="section-share section-about">
				<div className='section-about-header'>
					Truyền thông nói về BookingCare
				</div>
				<div className='section-about-content'>
					<div className='content-left'>
						<iframe width="650" height="400" src="https://www.youtube.com/embed/FyDQljKtWnI?si=iEF6LPnnISaK8pHy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>					</div>
					<div className='content-right'>
						<div className='right-about'>
							<div className='img-about'>
								<span className='img-1'></span>
							</div>
							<div className='img-about'>
								<span className='img-2'></span>
							</div>
							<div className='img-about'>
								<span className='img-3'></span>
							</div>
							<div className='img-about'>
								<span className='img-4'></span>
							</div>
						</div>



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

export default connect(mapStateToProps, mapDispatchToProps)(About);
