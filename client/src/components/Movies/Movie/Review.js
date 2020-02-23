import React from 'react';
import PropTypes from 'prop-types';
import like from '../../images/like.png';

const Review = ({
    username,
    rate,
    avatar,
    likes,
    comment,
    handleLikeSubmit,
    id
}) => {
    return (
        <div className='row'>
            <div className='col-12 review-avatar'>
                <img
                    className='rounded-circle  mr-2'
                    width='35px'
                    alt='avatar'
                    src={avatar}
                />
                <div className='d-inline-block align-bottom'>
                    <div>{username}</div>
                    <div>{rate}</div>
                </div>
            </div>
            <div className='col-12 p-3 review-comment'>
                <p>{comment}</p>
            </div>
            <div className='col-12 d-flex'>
                <div>
                    <div className='media'>
                        <span className='media-left mr-2'>
                            <img
                                onClick={() => handleLikeSubmit(id)}
                                src={like}
                                alt='like'
                                width='15px'
                                style={{ cursor: 'pointer' }}
                            />
                        </span>
                        <div className='media-body'>
                            <p style={{ fontSize: '15px' }}>{likes.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Review.propTypes = {
    username: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    likes: PropTypes.array.isRequired,
    comment: PropTypes.string.isRequired
};

export default Review;
