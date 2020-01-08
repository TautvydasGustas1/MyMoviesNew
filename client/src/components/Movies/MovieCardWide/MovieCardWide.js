import React from 'react';
import PropTypes from 'prop-types';
import './MovieCardWide.css';

const imageWidth = '780'; // for changing the width of image
const uri = `https://image.tmdb.org/t/p/w${imageWidth}`; // URI to movies api for getting the images

const MovieCardWide = ({ id, title, overview, backdrop_path }) => {
	return (
		<div className='movie_card-container'>
			<div className='row'>
				<div
					className='movie_card-wide col-12'
					style={{
						backgroundImage: `url(${uri}${backdrop_path})`
					}}
				/>
				<div className='col-12 movie_card-name'>{title}</div>
				<div className='col-12 movie_card-summary'>{overview}</div>
			</div>
		</div>
	);
};

MovieCardWide.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	backdrop_path: PropTypes.string.isRequired,
	overview: PropTypes.string.isRequired
};

export default MovieCardWide;
