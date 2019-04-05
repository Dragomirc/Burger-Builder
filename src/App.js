import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./components/layout";
import BurgerBuilder from "./containers/burger-builder";
import Checkout from "./containers/checkout";
import Orders from "./containers/orders";
import Auth from "./containers/auth";
import Logout from "./containers/logout";
import { authCheckState } from "./redux/actions/auth";

class App extends Component {
    componentDidMount() {
        this.props.authCheckState();
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div>
                <Layout>{routes}</Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(
    mapStateToProps,
    { authCheckState }
)(App);
