import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Provider } from "react-redux"
import {store} from "./store";
import Layout from "./layout"

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout/>
        </Router>
    </Provider>
);

const handleClick = (data) => {
    console.log(data)
};

ReactDOM.render(
<App/>,
    document.getElementById('app')
);
