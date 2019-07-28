const initialState = {
    events: {
        data: [],
        eventsIsLoading: false,
        eventsLoadingFailed: false,
        next: 1
    },
    event: {
        data: [],
        eventIsLoading: false,
        eventLoadingFailed: false,
    }
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
            let next = action.next ? newState.events.next + 1 : 0
            return {...newState,
                events: {
                    ...newState.events,
                    data: newState.events.data.concat(Object.values(action.data)),
                    eventsIsLoading: false,
                    eventsLoadingFailed: false,
                    since: action.since,
                    until: action.until,
                    next: next
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
        case "RESET_NEXT":
            return {
                ...newState,
                events: {
                    ...newState.events,
                    next: 1,
                    data: []
                }
            }
        case 'EVENT_LOAD_START':
            return {...newState,
                event: {...newState.event, eventIsLoading: true, eventLoadingFailed: false}
            }
        case "EVENT_LOAD":
            return {...newState,
                event: {
                    ...newState.event,
                    data: action.data,
                    eventIsLoading: false,
                    eventLoadingFailed: false
                }
            };
        case "EVENT_LOAD_FAILED":
            console.log(action)
            return {...newState,
                event: {
                    ...newState.event,
                    eventIsLoading: false,
                    eventLoadingFailed: true,
                    error: action.error
                }
            };
    }

    return newState
};