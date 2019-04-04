import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Toolbar from "../toolbar";
import SideDrawer from "../side-drawer";
import classes from "./styles.module.css";

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };
    render() {
        const { isAuthenticated } = this.props;

        return (
            <React.Fragment>
                <Toolbar
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuthenticated={isAuthenticated}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isAuthenticated={isAuthenticated}
                />

                <main className={classes.Content}>{this.props.children}</main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
    isAuthenticated: auth.token !== null
});
export default connect(mapStateToProps)(Layout);

Layout.propTypes = {
    children: PropTypes.array
};
Layout.defaultProps = {
    children: null
};
