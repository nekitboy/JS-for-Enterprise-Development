import React from 'react'
import EventCard from "../Event/EventCard"
import {connect} from "react-redux"
import {LinearProgress} from '@material-ui/core'

import "./home.css"
import {loadEvent, resetEventNext} from "../../store/actions";
import Search from "./Search";

export class HomePage extends React.Component {

    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('upd')
        // New date
        if (nextProps.date !== this.props.date && (new Date(nextProps.date).getTime() > (new Date().getTime() - 1000*60*60*24) || nextProps.date.length===0)) {
            document.removeEventListener('scroll', this.trackScrolling);
            this.props.resetNext()
            this.loadData(nextProps.date, 1)
        }
        if (nextProps.next !== this.props.next && nextProps.next > 0)
            this.addScrollEvent()
        return true
    }

    loadData(date = this.props.date, page = this.props.next) {
        console.log('load')
        if (date) {
            let since = (new Date(date).getTime())/1000
            let until = since + 60*60*24
            this.props.loadEvents(page, since, until)
        }
        else {
            this.props.loadEvents(page)
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="sticky">
                    <Search/>
                    {this.props.eventsIsLoading && <LinearProgress color={'secondary'}/>}
                    {this.props.eventsLoadingFailed && <div>Ой-ой :(</div>}
                </div>
                <div className="event-layout" >
                    {this.props.data.map((event) => {
                        if (event.title.toLowerCase().indexOf(this.props.title.toLowerCase()) >= 0 || this.props.title.length === 0)
                            return (
                                <EventCard key={event.id} event={event}/>
                            )
                    })}
                </div>
            </React.Fragment>
        )
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight && el.getBoundingClientRect().bottom>200;
    }

    addScrollEvent() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentDidMount() {
        this.addScrollEvent()
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('app');
        if (this.isBottom(wrappedElement)) {
            console.log('header bottom reached');
            document.removeEventListener('scroll', this.trackScrolling);
            this.loadData()
        }
    };
}

const mapStateToProps = (state) => ({
    data: state.app.events.data,
    eventsIsLoading: state.app.events.eventsIsLoading,
    eventsLoadingFailed: state.app.events.eventsLoadingFailed,
    date: dateSelector(state),
    title: titleSelector(state),
    next: state.app.events.next
});

const dateSelector = (state) => {
    if (state.form && state.form.search && state.form.search.values)
        return state.form.search.values.date_s
}

const titleSelector = (state) => {
    if (state.form && state.form.search && state.form.search.values)
        return state.form.search.values.title_s
    return ''
}

const mapDispatchToProps = (dispatch) => ({
    loadEvents: (page, since, until) => loadEvent(dispatch, page, since, until),
    resetNext: () => dispatch(resetEventNext())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
