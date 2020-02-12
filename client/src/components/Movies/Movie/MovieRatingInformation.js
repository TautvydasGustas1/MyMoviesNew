import React from 'react';
import PropTypes from 'prop-types';

const MovieRatingInformation = ({ vote_average, vote_count }) => {
    return (
        <div>
            <div className='row'>
                <div className='col-12'>
                    <b>IMDB Score: </b>
                    {vote_average} ({vote_count})
                </div>
            </div>
        </div>
    );
};

MovieRatingInformation.propTypes = {
    vote_average: PropTypes.number.isRequired,
    vote_count: PropTypes.number.isRequired
};

export default MovieRatingInformation;
