import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <footer className='footer mt-5'>
                <div className='footer-middle'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-3 col-sm-6'>
                                <h4>Movies</h4>
                                <ul className='list-unstyled'>
                                    <li>
                                        <Link to='/movies/browse/trending'>
                                            Trending
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/movies/browse/popular'>
                                            Popular
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='col-md-3 col-sm-6'>
                                <h4>Profile</h4>
                                <ul className='list-unstyled'>
                                    <li>
                                        <Link to='/'>
                                            Search users or movies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/login'>Log in</Link>
                                    </li>
                                    <li>
                                        <Link to='/register'>Register</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='footer-bottom'>
                            <p className='text-xs-center'>
                                © 2020 MyMovies - All Rights Reserved
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
