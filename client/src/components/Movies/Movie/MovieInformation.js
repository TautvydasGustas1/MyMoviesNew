import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const MovieInformation = ({ release_date, genres, overview }) => {
    return (
        <div>
            <h5>
                <Moment format='YYYY'>{release_date}</Moment> |{' '}
                {genres.map(genre => genre.name).join(', ')}
            </h5>
            <p>{overview}</p>
        </div>
    );
};

MovieInformation.propTypes = {
    release_date: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    overview: PropTypes.string.isRequired
};

export default MovieInformation;
