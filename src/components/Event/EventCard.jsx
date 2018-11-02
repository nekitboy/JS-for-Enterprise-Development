import React from "react"
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';

import "./EventCard.css"
import Link from "react-router-dom/es/Link";

export default class EventCard extends React.Component{
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Link to={"/event/" + this.props.id}>
                <Card className={"event-card"}>
                    Card {this.props.id}
                </Card>
            </Link>
        )
    }
}

EventCard.propTypes = {
    id: PropTypes.number.isRequired
}