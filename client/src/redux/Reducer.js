const initialState = { 
    userData: null, 
    loading: false, 
    error: false, 
    msg: '' 
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // AUTH
        case "AUTH_START":
            return { ...state, loading: true, error: false, msg: 'Auth started' };
        case "AUTH_SUCCESS":
            localStorage.setItem('authToken', action?.token);
            return { ...state, token: action.token, loading: false, error: false, msg: 'Auth success' };
        case "AUTH_FAIL":
            return { ...state, loading: false, error: action.error, msg: 'Auth failed' };
        case "LOG_OUT":
            localStorage.clear();
            return { userData: null, loading: false, error: false, msg: '' }
        // USER DATA
        case "GET_USER_PRIVATE_DATA":
            return { ...state, userData: null, loading: true, error: false, msg: 'Getting private data' };
        case "GET_USER_PRIVATE_DATA_SUCCESS":
            return { ...state, userData: action.data, loading: false, error: false, msg: 'Getting private data done' };
        case "GET_USER_PRIVATE_DATA_FAIL":
            return { ...state, userData: null, loading: false, error: true, msg: 'Couldn\'t get user data' };
        // ADD_BEAT
        case "ADD_BEAT":
            return { ...state, loading: true, error: false, msg: 'Adding beat' };
        case "ADD_BEAT_SUCCESS":
            return { ...state, loading: false, error: false, msg: 'Beat added succesfully' };
        case "ADD_BEAT_FAIL":
            return { ...state, loading: false, error: true, msg: 'Error adding beat' };
        default:
            return state;
    }
};

export default reducer;