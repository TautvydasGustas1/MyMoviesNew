import React from 'react';
import { Link } from 'react-router-dom';
import './Toolbar.css';
import SideDrawerButton from '../SideDrawer/DrawerToggleButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Toolbar = ({
    auth: { loading, isAuthenticated, user },
    drawerClickHandler,
    logout
}) => {
    const localUsername = !loading && user !== null && user.username;

    const authLinks = (
        <ul>
            <li>
                <Link to={`/profile/${localUsername}`}>Profile</Link>
            </li>
            <li>
                <a href='#!' onClick={logout}>
                    Logout
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/login'>Log in</Link>
            </li>
            <div className='navbar_seperator'>|</div>
            <li>
                <Link to='/register'>Sign up</Link>
            </li>
        </ul>
    );

    return (
        <header className='navbar'>
            <nav className='navbar_navigation'>
                <div className='navbar_toggle-button'>
                    <SideDrawerButton click={drawerClickHandler} />
                </div>
                <div className='navbar_logo'>
                    <Link to='/'>MyMovies</Link>
                </div>
                <div className='navbar_navigation-items'>
                    <div className='navbar_primary-links'>
                        <ul>
                            <li>
                                <Link to='/movies/browse/trending'>
                                    Trending
                                </Link>
                            </li>
                            <li>
                                <Link to='/movies/browse/popular'>Popular</Link>
                            </li>
                            <li>
                                <Link to='/search'>Search</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='spacer' />
                <div className='navbar_navigation-items'>
                    {!loading && (isAuthenticated ? authLinks : guestLinks)}
                </div>
            </nav>
        </header>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

Toolbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { logout })(Toolbar);
