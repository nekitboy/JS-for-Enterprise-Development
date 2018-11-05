import axios from "axios";

export const loadEvent = (dispatch) => {
    dispatch({type: "EVENTS_LOAD_START"});

    axios.get('/api/events')
        .then((response) => {
            console.log(response.data)
            // Dispatching an action only when request complete
            dispatch({
                type: "EVENTS_LOAD",
                data: response.data
            })
        })
        .catch((e) => {
            dispatch({type: "EVENTS_LOAD_FAILED", error: e});
        });
}