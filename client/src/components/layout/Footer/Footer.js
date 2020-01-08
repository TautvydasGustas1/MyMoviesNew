import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

class Footer extends React.Component {
	render() {
		return (
			<div className='footer mt-5'>
				<div className='footer-middle'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-3 col-sm-6'>
								<h4>Movies</h4>
								<ul className='list-unstyled'>
									<li>
										<Link to='/'>Lorem ipsum</Link>
									</li>
								</ul>
							</div>
							<div className='col-md-3 col-sm-6'>
								<h4>About</h4>
								<ul className='list-unstyled'>
									<li>
										<Link to='/'>Lorem ipsum</Link>
									</li>
								</ul>
							</div>
							<div className='col-md-3 col-sm-6'>
								<h4>Profile</h4>
								<ul className='list-unstyled'>
									<li>
										<Link to='/'>Lorem ipsum</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className='footer-bottom'>
							<p className='text-xs-center'>© 2019 MyMovies - All Rights Reserved</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
