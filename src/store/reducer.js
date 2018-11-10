const initialState = {
    events: {
        data: [],
        eventsIsLoading: false,
        eventsLoadingFailed: false
    },
};

export const reducer = (prevState = initialState, action) => {
    const newState = {...prevState};
    switch (action.type) {
        case 'SELECT_ARTICLE':
            return {...newState, article: action.article}
        case 'EVENTS_LOAD_START':
            return {...newState,
                events: {...newState.events, eventsIsLoading: true, eventsLoadingFailed: false}
            }
        case "EVENTS_LOAD":
            return {...newState,
                events: {
                    ...newState.events,
                    data: Object.values(action.data),
                    eventsIsLoading: false,
                    eventsLoadingFailed: false,
                    since: action.since,
                    until: action.until
                }
            };
        case "EVENTS_LOAD_FAILED":
            console.log(action)
            return {...newState,
                events: {
                    ...newState.events,
                    eventsIsLoading: false,
                    eventsLoadingFailed: true,
                    error: action.error
                }
            };

    }

    return newState
};