import React from 'react'
import Login from './components/Login'
import Products from './components/Products'
import "./App.css"

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

const App = () => {

    return (
    <div>
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/products" component={Products} />
            </Switch>
        </Router>
    </div>
    )
}

export default App;
