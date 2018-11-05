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
                <EventCard id={0}/>
                <EventCard id={1}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.events.data,
    eventsIsLoading: state.events.eventsIsLoading,
    eventsLoadingFailed: state.events.eventsLoadingFailed
});

const mapDispatchToProps = (dispatch) => ({
    loadEvents: () => loadEvent(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
