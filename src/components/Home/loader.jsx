import React from 'react'
import {LinearProgress} from "@material-ui/core";

export default ({title = 'Loading'}) => {

    return (
        <React.Fragment>
            <p>{title}</p>
            <LinearProgress color={'secondary'}/>
        </React.Fragment>)
}