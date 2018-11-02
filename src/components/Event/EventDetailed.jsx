import React from "react"

export default class EventDetailed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : props.match.params.id
        };
    }

    render () {
        return (
            <div>
                ID: {this.state.id}
            </div>
        )
    }
}