import React from 'react';
import { Link } from 'react-router-dom';

import './Toolbar.css';
import SideDrawerButton from '../SideDrawer/DrawerToggleButton';
const Toolbar = props => {

    return (
        <header className="navbar">
            <nav className="navbar_navigation">
                <div className="navbar_toggle-button">
                    <SideDrawerButton click={props.drawerClickHandler} />
                </div>
                <div className="navbar_logo"><Link to="/">MyMovies</Link></div>
                <div className="navbar_navigation-items">
                    <div className="navbar_primary-links" >
                        <ul>
                            <li><Link to="/">Movies library</Link></li>
                            <li><Link to="/">Explore</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="spacer" />
                <div className="navbar_navigation-items">
                    <ul>
                        <li><Link to="/">Log in</Link></li>
                        <div className="navbar_seperator">|</div>
                        <li><Link to="/">Sign up</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Toolbar;
