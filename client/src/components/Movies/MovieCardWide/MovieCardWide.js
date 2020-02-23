import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const MovieCardWide = ({ link, image, title, text }) => {
    const history = useHistory();

    function handleClick() {
        history.push(link);
    }

    return (
        <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
                handleClick();
            }}
            className='card mb-3'
        >
            <img className='card-img-top' src={image} alt={title} />
            <div className='card-body'>
                <h5 className='card-title'>{title}</h5>
                <p className='card-text'>{text}</p>
            </div>
        </div>
    );
};

MovieCardWide.propTypes = {
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string
};

export default MovieCardWide;
