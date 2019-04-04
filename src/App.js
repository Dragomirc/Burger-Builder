import React, { Component } from "react";
import { Route } from "react-router-dom";
import Layout from "./components/layout";
import BurgerBuilder from "./containers/burger-builder";
import Checkout from "./containers/checkout";
import Orders from "./containers/orders";
import Auth from "./containers/auth";
import Logout from "./containers/logout";

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                </Layout>
            </div>
        );
    }
}

export default App;
