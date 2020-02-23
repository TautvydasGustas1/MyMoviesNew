import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './RateMovie.css';
import { MOVIE_DB_URI } from '../../../../utils/Constants';
import { postWatchedMovie } from '../../../../actions/watched';
import { connect } from 'react-redux';

const pWidth = 'w500';
let display = 'none';

const RateMovie = ({
    poster,
    defaultShow,
    setShowModal,
    user_id,
    movie_id,
    postWatchedMovie,
    title,
    poster_path,
    genres
}) => {
    if (defaultShow) {
        display = 'block';
    } else {
        display = 'none';
    }

    const postMovie = rate => {
        postWatchedMovie(user_id, movie_id, rate, title, poster_path, genres);
        try {
            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <div className='rate-movie_container'>
                <div
                    style={{ display: `${display}` }}
                    className='modal-container'
                >
                    <button
                        onClick={() => {
                            setShowModal(!defaultShow);
                        }}
                        type='button'
                        className='close'
                        aria-label='Close'
                    >
                        <span
                            style={{ fontSize: '2em' }}
                            className='text-white'
                            aria-hidden='true'
                        >
                            &times;
                        </span>
                    </button>
                    <div className='container'>
                        <div className='card-container card-container_extra'>
                            <div
                                style={{
                                    backgroundImage: `url(${MOVIE_DB_URI +
                                        pWidth +
                                        poster})`
                                }}
                                className='card m-auto card-custom'
                            ></div>
                            <div className='modal-buttons_container'>
                                <div className='row no-gutters'>
                                    <div className='col-lg-3 col-md-3 col-6'>
                                        <button
                                            onClick={() => {
                                                postMovie(1);
                                            }}
                                            className='btn btn-secondary btn-square btn-block'
                                        >
                                            Bad
                                        </button>
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-6'>
                                        <button
                                            onClick={() => {
                                                postMovie(2);
                                            }}
                                            className='btn btn-warning btn-square btn-block'
                                        >
                                            Average
                                        </button>
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-6'>
                                        <button
                                            onClick={() => {
                                                postMovie(4);
                                            }}
                                            className='btn btn-primary btn-square btn-block'
                                        >
                                            Good
                                        </button>
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-6'>
                                        <button
                                            onClick={() => {
                                                postMovie(5);
                                            }}
                                            className='btn btn-success btn-square btn-block'
                                        >
                                            Perfect
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

RateMovie.propTypes = {
    poster: PropTypes.string.isRequired,
    defaultShow: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    user_id: PropTypes.string.isRequired,
    movie_id: PropTypes.number.isRequired,
    title: PropTypes.string,
    poster_path: PropTypes.string
};

export default connect(null, { postWatchedMovie })(RateMovie);
