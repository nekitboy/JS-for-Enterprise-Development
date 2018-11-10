import React from "react"
import {loadEventDetailed} from "../../store/actions";
import { Slide } from 'react-slideshow-image'
import {LinearProgress} from "@material-ui/core";
import connect from "react-redux/es/connect/connect";
import {HomePage} from "../Home/home";

import "./EventDetailed.css"

export class EventDetailed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : props.match.params.id
        };
        this.props.loadEvent(this.state.id)
    }

    properties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true
    }

    render () {
        const images = []
        if (this.props.data.images) {
            for (var i = 0; i < this.props.data.images.length; i++)
                images.push(this.props.data.images[i].image)
        }
        return (
            <div className={'event-detailed'}>
                {this.props.eventIsLoading && <LinearProgress color={'secondary'}/>}
                {this.props.eventLoadingFailed && <div>Ой-ой :(</div>}
                {!this.props.eventIsLoading && (
                <React.Fragment>
                    <h1>{this.props.data.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: this.props.data.description }} />
                    <div className="gallery"><Slide {...this.properties}>
                        {images.map((image) => (
                            <div key={image} className="each-slide">
                                <div style={{'backgroundImage': `url(${image})`}}/>
                            </div>))}
                        </Slide>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: this.props.data.body_text }} />
                </React.Fragment>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.app.event.data,
    eventIsLoading: state.app.event.eventIsLoading,
    eventLoadingFailed: state.app.event.eventLoadingFailed,
});

const mapDispatchToProps = (dispatch) => ({
    loadEvent: (id) => loadEventDetailed(dispatch, id)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailed)