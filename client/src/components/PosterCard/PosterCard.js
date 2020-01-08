import React from 'react';
import PropTypes from 'prop-types';
import { MOVIE_DB_URI } from '../../utils/Constants';
import './PosterCard.css';
import { Link } from 'react-router-dom';

const imageWidth = `w500`;
const fullUri = MOVIE_DB_URI + imageWidth;

const PosterCard = ({ id, title, poster_path }) => {
	return (
		<Link to={`/movies/` + id}>
			<div className='poster-wrapper'>
				<img alt={title} width='150px' src={fullUri + poster_path} />
				<p>{title}</p>
			</div>
		</Link>
	);
};

PosterCard.propTypes = {
	title: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	poster_path: PropTypes.string.isRequired
};

export default PosterCard;
