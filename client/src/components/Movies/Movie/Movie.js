import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMovie, clearState } from '../../../actions/movies';
import {
    postReview,
    getReviews,
    likeUnlikeReview
} from '../../../actions/review';
import './Movie.css';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import { MOVIE_DB_URI } from '../../../utils/Constants';
import MovieInfoBox from '../MovieInfoBox/MovieInfoBox';
import MovieInformation from './MovieInformation';
import MovieRatingInformation from './MovieRatingInformation';
import PosterNotFound from '../../images/posterNotFound.png';
import RateMovie from './RateMovie/RateMovie';
import avatarDef from '../../images/profile-avatar.png';
import Review from './Review';
import WriteReview from './WriteReview';
import Spinner from '../../layout/Spinner/Spinner';

const query = '?append_to_response=videos,credits';

const Movie = ({
    getMovie,
    movie: { loading, movie, reviews },
    match,
    user,
    watched,
    postReview,
    getReviews,
    likeUnlikeReview,
    clearState
}) => {
    useEffect(() => {
        getMovie(match.params.id, query);
        getReviews(match.params.id);

        return () => {
            clearState();
        };
    }, [getMovie, getReviews, match.params.id, clearState]);

    const handleLikeSubmit = id => {
        likeUnlikeReview(id, user.id);
    };

    const handleSubmitReview = () => {
        if (comment !== '') {
            postReview(comment, user.username, movie.id);
            setComment('');
            setShowCommentPanel(false);
        }
    };

    const [showCommentPanel, setShowCommentPanel] = useState(false);

    const [comment, setComment] = useState('');

    const [showVideo, setShowVideo] = useState(false);

    const [showModal, setShowModal] = useState(false);

    return (
        <Fragment>
            {!loading && movie !== null ? (
                <div>
                    <section
                        className='video-container'
                        style={
                            showVideo
                                ? { height: '500px' }
                                : { height: '350px' }
                        }
                    >
                        <VideoPlayer
                            backdrop_path={movie.backdrop_path}
                            showVideo={showVideo}
                            setShowVideo={setShowVideo}
                            YoutubeVideoKey={
                                movie.videos.results.length === 0
                                    ? null
                                    : movie.videos.results[0].key
                            }
                        />
                    </section>
                    <div className='card card-body card-custom-vid rounded-bottom mb-4'>
                        <div className='row m-1'>
                            <div className='col-8 name_tag-inner'>
                                {movie.title}
                            </div>
                            <div className='col-4 text-right'>
                                {user !== null && (
                                    <span>
                                        {watched.watched.find(
                                            data => data.movie_id === movie.id
                                        ) ? (
                                            <div>Watched and rated</div>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setShowModal(!showModal);
                                                }}
                                                className='btn btn-primary'
                                            >
                                                Seen
                                            </button>
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='movie-info_container'>
                        <div className='row'>
                            <div className='movie-info_left col-lg-4 col-md-5 col-12'>
                                <div>
                                    <img
                                        alt={movie.title}
                                        width='100%'
                                        src={
                                            movie.poster_path === null
                                                ? PosterNotFound
                                                : MOVIE_DB_URI +
                                                  'w500' +
                                                  movie.poster_path
                                        }
                                    />
                                </div>
                            </div>
                            <div className='movie-info_right mt-lg-0 mt-md-0 mt-3 col-lg-8 col-md-7 col-12'>
                                <div className='card card-body mb-3'>
                                    <MovieInformation
                                        overview={movie.overview}
                                        genres={movie.genres}
                                        release_date={movie.release_date}
                                    />
                                </div>
                                <div className='card card-body mb-3'>
                                    <MovieInfoBox
                                        release={movie.release_date}
                                        runtime={movie.runtime}
                                        credits={movie.credits}
                                        overview={movie.overview}
                                    />
                                </div>
                                <div className='card card-body'>
                                    <MovieRatingInformation
                                        vote_average={movie.vote_average}
                                        vote_count={movie.vote_count}
                                    />
                                </div>
                                <div className='card mt-3'>
                                    <div className='card-header'>
                                        <div className='row'>
                                            <div className='col-6'>Reviews</div>
                                            <div className='col-6 text-right'>
                                                <button
                                                    onClick={() =>
                                                        setShowCommentPanel(
                                                            !showCommentPanel
                                                        )
                                                    }
                                                    className='btn btn-small btn-primary'
                                                >
                                                    Write review
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            {showCommentPanel ? (
                                                <div className='col-12'>
                                                    <WriteReview
                                                        setComment={setComment}
                                                        comment={comment}
                                                        handleSubmitReview={
                                                            handleSubmitReview
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                            {reviews.length !== 0 ? (
                                                reviews.map((review, index) => (
                                                    <Review
                                                        key={index}
                                                        username={
                                                            review.username
                                                        }
                                                        rate={review.rate}
                                                        avatar={avatarDef}
                                                        comment={review.comment}
                                                        likes={review.likes}
                                                        handleLikeSubmit={
                                                            handleLikeSubmit
                                                        }
                                                        id={review._id}
                                                    />
                                                ))
                                            ) : (
                                                <div>No reviews</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {user !== null && (
                        <div>
                            <RateMovie
                                setShowModal={setShowModal}
                                defaultShow={showModal}
                                poster={
                                    movie.paster_path === null
                                        ? PosterNotFound
                                        : movie.poster_path
                                }
                                user_id={user._id}
                                movie_id={movie.id}
                                title={movie.title}
                                poster_path={movie.poster_path}
                                genres={movie.genres}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className='text-center'>
                    <Spinner width='300px' />
                </div>
            )}
        </Fragment>
    );
};

Movie.propTypes = {
    getMovie: PropTypes.func.isRequired,
    movie: PropTypes.object.isRequired,
    user: PropTypes.object,
    clearState: PropTypes.func
};

const mapStateToProps = state => ({
    movie: state.movies,
    user: state.auth.user,
    watched: state.watched
});

export default connect(mapStateToProps, {
    getMovie,
    postReview,
    getReviews,
    likeUnlikeReview,
    clearState
})(Movie);
