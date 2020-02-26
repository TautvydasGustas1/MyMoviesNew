import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './SideDrawer.css';
import { logout } from '../../actions/auth';

const sideDrawer = ({
    show,
    auth: { loading, isAuthenticated, user },
    logout,
    click
}) => {
    let drawerClasses = ['side-drawer'];
    if (show) {
        drawerClasses = 'side-drawer open';
    }

    const localUsername = !loading && user !== null && user.username;

    function closeAndLogout() {
        logout();
        click();
    }

    const authLinks = (
        <div style={{ marginBottom: '10%' }}>
            <li>
                <Link onClick={() => click()} to={`/profile/${localUsername}`}>
                    Profile
                </Link>
            </li>
            <li>
                <a href='#!' onClick={() => closeAndLogout()}>
                    Logout
                </a>
            </li>
        </div>
    );

    const guestLinks = (
        <div style={{ marginBottom: '10%' }}>
            <li>
                <Link onClick={() => click()} to='/login'>
                    Log in
                </Link>
            </li>
            <li>
                <Link onClick={() => click()} to='/register'>
                    Sign up
                </Link>
            </li>
        </div>
    );

    return (
        <nav className={drawerClasses}>
            <ul>
                {!loading && (isAuthenticated ? authLinks : guestLinks)}
                <li>
                    <Link onClick={() => click()} to='/'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link onClick={() => click()} to='/movies/browse/trending'>
                        Trending
                    </Link>
                </li>
                <li>
                    <Link onClick={() => click()} to='/movies/browse/popular'>
                        Popular
                    </Link>
                </li>
                <li>
                    <Link onClick={() => click()} to='/search'>
                        Search
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(sideDrawer);
