import React from 'react'
import EventCard from "../Event/EventCard"
import {connect} from "react-redux"

import "./home.css"
import {loadEvent} from "../../store/actions";

export class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.props.loadEvents()
    }

    render() {
        return (
            <div className="event-layout">
                {this.props.eventsIsLoading && <div>Подождите, идет загрузка</div>}
                {this.props.eventsLoadingFailed && <div>Ой-ой :(</div>}
                {console.log(this.props.data)}
                {this.props.data.map((event) => <EventCard key={event.id} event={event}/>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.events.data,
    eventsIsLoading: state.events.eventsIsLoading,
    eventsLoadingFailed: state.events.eventsLoadingFailed,
    since: state.events.since,
    until: state.events.until
});

const mapDispatchToProps = (dispatch) => ({
    loadEvents: (since, until) => loadEvent(dispatch, since, until)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
