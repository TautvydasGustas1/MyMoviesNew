import React from 'react';
import './Movies.css';
import { withRouter } from 'react-router-dom';
import MovieCardWide from './MovieCardWide/MovieCardWide';
import trendingMoviesImage from '../images/trending-image.jpg';
import popularMoviesImage from '../images/popular-image.jpg';

const Movies = () => {
    return (
        <div className='row'>
            <div className='col-lg-6 col-12'>
                <MovieCardWide
                    link='/movies/browse/trending'
                    image={trendingMoviesImage}
                    title={'Trending Movies'}
                    text={'asdjadkadjaksd aklsd jalsdkj alsdk jal'}
                />
            </div>
            <div className='col-lg-6 col-12'>
                <MovieCardWide
                    link='/movies/browse/popular'
                    image={popularMoviesImage}
                    title={'Popular Movies'}
                    text={'asdjadkadjaksd aklsd jalsdkj alsdk jal'}
                />
            </div>
        </div>
    );
};

export default withRouter(Movies);
