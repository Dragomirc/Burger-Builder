import React, { Component } from "react";
import { Route } from "react-router-dom";
import Layout from "./components/layout";
import BurgerBuilder from "./containers/burger-builder";
import Checkout from "./containers/checkout";
import Orders from "./containers/orders";

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/" exact component={BurgerBuilder} />
                </Layout>
            </div>
        );
    }
}

export default App;
