const initialState = {
    events: [],
    eventsIsLoading: false,
    eventsLoadingFailed: false
};

export const reducer = (prevState = initialState, action) => {
    console.log('Got action: ', action);
    const newState = {...prevState};
    switch (action.type) {
        case 'SELECT_ARTICLE':
            return {...newState, article: action.article}
        case 'EVENTS_LOAD_START':
            return {...newState, eventsIsLoading: true, eventsLoadingFailed: false}
        case "EVENTS_LOAD":
            return {...newState,
                events: Object.values(action.data),
                eventsIsLoading: false,
                eventsLoadingFailed: false
            };
        case "EVENTS_LOAD_FAILED":
            return {...newState,
                eventsIsLoading: false,
                eventsLoadingFailed: true
            };

    }

    return newState
};