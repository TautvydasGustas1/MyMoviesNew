import React from 'react';
import PropTypes from 'prop-types';
import { MOVIE_DB_URI } from '../../../../utils/Constants';
import './VideoPlayer.css';

const imageWidth = 'w1280';
const fullUri = MOVIE_DB_URI + imageWidth;

const VideoPlayer = ({
    backdrop_path,
    setShowVideo,
    showVideo,
    YoutubeVideoKey
}) => {
    const video = (
        <iframe
            title='video'
            width='100%'
            height='100%'
            src={`https://www.youtube.com/embed/${YoutubeVideoKey}`}
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
        />
    );

    const overlay = (
        <div
            className='player-overlay'
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(${fullUri}${backdrop_path})`
            }}
        >
            <div className='overlay d-flex flex-row justify-content-center align-items-center'>
                <div onClick={() => setShowVideo(true)} className='play' />
            </div>
        </div>
    );

    return <div className='video-outer'>{showVideo ? video : overlay}</div>;
};

VideoPlayer.propTypes = {
    backdrop_path: PropTypes.string,
    showVideo: PropTypes.bool.isRequired,
    setShowVideo: PropTypes.func.isRequired,
    YoutubeVideoKey: PropTypes.string
};

export default VideoPlayer;
