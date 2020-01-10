import React from 'react';
import PropTypes from 'prop-types';
import { MOVIE_DB_URI } from '../../utils/Constants';
import './PosterCard.css';
import { Link } from 'react-router-dom';
import notFoundImage from '../images/posterNotFound.png';

const imageWidth = `w500`;
let source = '';
const PosterCard = ({ id, title, poster_path }) => {
	if (poster_path != null) {
		source = MOVIE_DB_URI + imageWidth + poster_path;
	} else {
		source = notFoundImage;
	}

	return (
		<Link to={`/movies/` + id}>
			<div className='poster-wrapper'>
				<img alt={title} width='150px' src={source} />
				<p>{title}</p>
			</div>
		</Link>
	);
};

PosterCard.propTypes = {
	title: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	poster_path: PropTypes.string
};

export default PosterCard;
