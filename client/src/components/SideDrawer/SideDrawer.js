import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './SideDrawer.css';
import { logout } from '../../actions/auth';

const sideDrawer = ({
    show,
    auth: { loading, isAuthenticated, user },
    logout
}) => {
    let drawerClasses = ['side-drawer'];
    if (show) {
        drawerClasses = 'side-drawer open';
    }

    const localUsername = !loading && user !== null && user.username;

    const authLinks = (
        <div style={{ marginBottom: '10%' }}>
            <li>
                <Link to={`/profile/${localUsername}`}>Profile</Link>
            </li>
            <li>
                <a href='#!' onClick={logout}>
                    Logout
                </a>
            </li>
        </div>
    );

    const guestLinks = (
        <div style={{ marginBottom: '10%' }}>
            <li>
                <Link to='/login'>Log in</Link>
            </li>
            <div className='navbar_seperator'>|</div>
            <li>
                <Link to='/register'>Sign up</Link>
            </li>
        </div>
    );

    return (
        <nav className={drawerClasses}>
            <ul>
                {!loading && (isAuthenticated ? authLinks : guestLinks)}
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/movies/browse/trending'>Trending</Link>
                </li>
                <li>
                    <Link to='/movies/browse/popular'>Popular</Link>
                </li>
                <li>
                    <Link to='/search'>Search</Link>
                </li>
            </ul>
        </nav>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(sideDrawer);
