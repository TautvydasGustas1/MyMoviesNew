import React from 'react';
import PropTypes from 'prop-types';
import { MOVIE_DB_URI } from '../../../../utils/Constants';
import './VideoPlayer.css';

const imageWidth = 'w1280';
const fullUri = MOVIE_DB_URI + imageWidth;

const VideoPlayer = ({ backdrop_path }) => {
	return <div className='video-outer' style={{ backgroundImage: `url(${fullUri}${backdrop_path})` }} />;
};

VideoPlayer.propTypes = {
	backdrop_path: PropTypes.string.isRequired
};

export default VideoPlayer;
