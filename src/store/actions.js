import axios from "axios";

export const loadEvent = (dispatch, page, since = parseInt((new Date()).getTime()/1000), until = parseInt((new Date().getTime() + 365*1000*60*60*24)/1000)) => {
    dispatch({type: "EVENTS_LOAD_START"});

       axios.get('/api/events/?page_size=8&page=' + page + '&fields=id,title,dates,place,short_title,images,description,age,categories&expand=place&location=msk&actual_since=' + since + '&actual_until=' + until + '&is_free=1')
        .then((response) => {
            console.log(response);
            // Dispatching an action only when request complete

            dispatch({
                type: "EVENTS_LOAD",
                data: response.data.results,
                since: since,
                until: until,
                next: response.data.next
            })
        })
        .catch((e) => {
            dispatch({type: "EVENTS_LOAD_FAILED", error: e});
        });
};


export const resetEventNext = () => ({
    type: 'RESET_NEXT'
})

export const loadEventDetailed = (dispatch, id) => {
    dispatch({type: "EVENT_LOAD_START"});

    axios.get('/api/events/' + id + '/?fields=dates,title,description,categories,body_text,age_restriction,images&expand=place')
        .then((response) => {
            console.log(response);
            // Dispatching an action only when request complete

            dispatch({
                type: "EVENT_LOAD",
                data: response.data
            })
        })
        .catch((e) => {
            dispatch({type: "EVENT_LOAD_FAILED", error: e});
        });
};