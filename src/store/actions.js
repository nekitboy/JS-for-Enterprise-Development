import axios from "axios";

export const loadEvent = (dispatch, since = parseInt((new Date()).getTime()/1000), until = parseInt((new Date().getTime() + 365*1000*60*60*24)/1000)) => {
    dispatch({type: "EVENTS_LOAD_START"});

    axios.get('/api/events/?page_size=8&fields=id,title,dates,place,short_title,images,description,age,categories&expand=place&location=msk&actual_since=' + since + '&actual_until=' + until + '&is_free=1')
        .then((response) => {
            console.log(response);
            // Dispatching an action only when request complete


            dispatch({
                type: "EVENTS_LOAD",
                data: response.data.results,
                since: since,
                until: until
            })
        })
        .catch((e) => {
            dispatch({type: "EVENTS_LOAD_FAILED", error: e});
        });
};