import React from 'react';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';

class Navbar extends React.Component {
        state = {
            SideDrawerOpen: false
        };

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return{SideDrawerOpen: !prevState.SideDrawerOpen};
        });
    }

    backdropClickHandler = () => {
        this.setState({
            SideDrawerOpen: false
        });
    };

    render() {
        let backdrop;

        if(this.state.SideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>;
        }

        return(
            <div>
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
                        <SideDrawer show={this.state.SideDrawerOpen}/>
                        {backdrop}
            </div>
        );
    }
}

export default Navbar;