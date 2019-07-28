import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {Provider} from "react-redux"
import {store} from "./store/store";
import NotFound from "./components/404/404"

import "./main.css"
import 'typeface-roboto'
import Header from "./components/Header/header";
import HomePage from "./components/Home/home";
import EventDetailed from "./components/Event/EventDetailed";
import About from "./components/About/about"


const App = () => (
    <React.Fragment>
        <Header/>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path={"/event/:id"} component={EventDetailed} />
            <Route path={"/about"} component={About} />
            <Route component={NotFound}/>
        </Switch>
    </React.Fragment>
);

ReactDOM.render((
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    ),
    document.getElementById('app')
);
