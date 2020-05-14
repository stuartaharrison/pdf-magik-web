export default (state, action) => {
    switch (action.type) {
        case 'POST_FILE_REQUEST':
            return {
                ...state,
                result: null,
                loading: true
            };
        case 'POST_FILE_COMPLETE':
            return {
                ...state,
                loading: false,
                error: null,
                result: action.payload
            };
        case 'POST_FILE_ERROR':
            return {
                ...state,
                loading: false,
                result: null,
                error: action.payload
            };
        default:
            return state;
    }
}