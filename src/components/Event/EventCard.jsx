import React from "react"

import { Card, CardHeader, CardMedia } from '@material-ui/core/';
import PropTypes from 'prop-types';
import { BlurCircular, LocationOnOutlined, PhoneOutlined, DateRange } from '@material-ui/icons/';
import "./EventCard.css"

import {Link} from "react-router-dom";
import {loadEvent} from "../../store/actions";
import connect from "react-redux/es/connect/connect";
import {HomePage} from "../Home/home";



export class EventCard extends React.Component{
    constructor(props) {
        super(props);
    }

    datecount = 0

    render () {
        this.datecount = 0
        return (
            <Link to={"/event/" + this.props.event.id}>
                <Card className={"event-card"}>
                    <CardMedia
                        image={this.props.event.images[0].image}
                        classes={{
                            root: 'media'
                        }}/>
                    <div className="card-content">
                        <h3 className={'title'}>{this.props.event.title}</h3>
                        <div className="left-content">
                            <p>Даты:</p>
                            {this.props.event.dates.map((date) => {
                                if (this.datecount < 3 && (date.start >= this.props.since && date.start < this.props.until ||
                                    date.end >= this.props.since && date.end < this.props.until) || date.start < 0) {
                                    this.datecount++

                                    let start = new Date(date.start*1000)
                                    let end = new Date(date.end*1000)

                                    return (
                                        <div className={'date'} key={date.start}>
                                            <DateRange className={'icon'}/>
                                            {format(start, end)}
                                        </div>
                                    )
                                }
                                else if (this.datecount === 3)
                                    this.datecount++
                            })}
                            {this.datecount > 3 && <p>...</p>}
                        </div>
                        <div className="right-content">
                            <p>Категории:</p>
                            { this.props.event.categories.map((category) => (
                                <React.Fragment key={category}>
                                    <div className="category"><BlurCircular className={'icon'}/><span>{category}</span></div>
                                </React.Fragment>
                            )) }
                        </div>
                        {this.props.event.place && (<div className="bottom">
                            <div>{this.props.event.place.title}</div>
                            <div>
                                <LocationOnOutlined className={'icon'}/>
                                {this.props.event.place.address}
                                {this.props.event.place.phone && this.props.event.place.phone.length > 0 && <span style={{marginLeft: '40px'}}><PhoneOutlined className={'icon'}/>{this.props.event.place.phone}</span>}
                            </div>
                        </div>)}
                    </div>
                </Card>
            </Link>
        )
    }
 }

EventCard.propTypes = {
    event: PropTypes.object.isRequired
}

function format(dateStart, dateEnd) {
    if (dateStart.getTime() === dateEnd.getTime())
        return dateStart.toLocaleString('ru', {weekday: 'short', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'})
    else if (dateEnd.getTime() - dateStart.getTime() <= 1000*60*60*24)
        return dateStart.toLocaleString('ru', {weekday: 'short', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'}) + ' - ' + dateEnd.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})
    else if (dateStart.getHours() !== dateEnd.getHours() || dateStart.getMinutes() !== dateEnd.getMinutes())
        return dateStart.toLocaleString('ru', {day: '2-digit', month: 'long'}) + ' - ' +
            dateEnd.toLocaleString('ru', {day: '2-digit', month: 'long'}) + ', ' +
            dateStart.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'}) + '-' +
            dateEnd.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'});
    else if (dateStart.getTime() < 0)
        return 'Круглый год'
    else
        return dateStart.toLocaleString('ru', {day: '2-digit', month: 'long'}) + ' - ' +
            dateEnd.toLocaleString('ru', {day: '2-digit', month: 'long'});
}

const mapStateToProps = (state) => ({
    since: state.app.events.since,
    until: state.app.events.until
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCard)

