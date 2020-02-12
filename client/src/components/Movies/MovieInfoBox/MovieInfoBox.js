import React from 'react';
import PropTypes from 'prop-types';
import './MovieInfoBox.css';

const MovieInfoBox = ({ credits: { cast, crew }, release, runtime }) => {
    let jobs = {
        Director: '',
        main_cast: ''
    };

    crew.forEach(element => {
        jobs[element.job] += element.name;
    });

    jobs.main_cast = cast
        .slice(0, 15)
        .map(ele => ele.name)
        .join(', ');

    return (
        <div>
            <div className='row'>
                <div className='col-12'>
                    <b>Director: </b>
                    {jobs.Director}
                </div>
                <div className='col-12'>
                    <b>Runtime: </b>
                    {`${runtime}min`}
                </div>
                <div className='col-12'>
                    <b>Release Date: </b>
                    {release}
                </div>
                <div className='col-12'>
                    <b>Main Cast: </b>
                    {jobs.main_cast}
                </div>
            </div>
        </div>
    );
};

MovieInfoBox.propTypes = {
    credits: PropTypes.object.isRequired,
    overview: PropTypes.string.isRequired
};

export default MovieInfoBox;
