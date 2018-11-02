import React from 'react'
import EventCard from "../Event/EventCard"


import "./home.css"

export default class HomePage extends React.Component {

    render() {
        return (
            <div className="event-layout">
                <EventCard id={0}/>
                <EventCard id={1}/>
            </div>
        )
    }
}
