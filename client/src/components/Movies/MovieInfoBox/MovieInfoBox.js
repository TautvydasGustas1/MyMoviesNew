import React from 'react';
import PropTypes from 'prop-types';
import './MovieInfoBox.css';

const MovieInfoBox = ({ credits: { cast, crew }, overview }) => {
	let jobs = {
		Director: '',
		main_cast: ''
	};

	crew.forEach((element) => {
		jobs[element.job] += element.name;
	});

	jobs.main_cast = cast.map((ele) => ele.name).join(' ,');

	return (
		<div className='movie-info-box-outer'>
			<p>{overview}</p>
			<div className='row'>
				<div className='col-12'>
					<b>Director: </b>
					{jobs.Director}
				</div>
				<div className='col-12'>
					<b>Runtime: </b>{' '}
				</div>
				<div className='col-12'>
					<b>Release Date: </b>{' '}
				</div>
				<div className='col-12'>
					<b>Main Cast: </b>
					{jobs.main_cast}
				</div>
			</div>
		</div>
	);
};

MovieInfoBox.propTypes = {
	credits: PropTypes.object.isRequired,
	overview: PropTypes.string.isRequired
};

export default MovieInfoBox;
