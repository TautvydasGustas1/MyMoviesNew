import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PosterCard from '../../PosterCard/PosterCard';

const Watched = ({ watched }) => {
    return (
        <Fragment>
            <div className='watched-container'>
                <div className='row justify-content-start'>
                    {watched.length !== 0 ? (
                        watched.map((movie, key) => (
                            <div key={key} className='col-lg-2dot4 col-4'>
                                <PosterCard
                                    id={movie.movie_id}
                                    title={movie.title}
                                    poster_path={movie.poster_path}
                                />
                            </div>
                        ))
                    ) : (
                        <p className='text-center w-100'>
                            No movies watched :/
                        </p>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

Watched.propTypes = {
    watched: PropTypes.array.isRequired
};

export default Watched;
