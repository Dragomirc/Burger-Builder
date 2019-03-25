import React from "react";
import PropTypes from "prop-types";
import classes from "./styles.css";

const Layout = props => {
    console.log(classes);
    return (
        <React.Fragment>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={classes.content}>{props.children}</main>
        </React.Fragment>
    );
};

export default Layout;

Layout.propTypes = {
    children: PropTypes.object
};
Layout.defaultProps = {
    children: null
};
