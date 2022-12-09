const initialState = {
    userData: null,
    loading: false,
    error: false,
    msg: ''
}
/*
    updateData a true indica que han de refrescarse los datos del usuario (despues de añadir o editar información)
*/

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // NAVIGATION DONE
        case "NAVIGATION_DONE":
            return { ...state, redirect:null };
        // AUTH
        case "AUTH_START":
            return { ...state, loading: true, error: false, msg: '', updateData: false };
        case "AUTH_SUCCESS":
            localStorage.setItem('authToken', action?.token);
            return { ...state, token: action.token, loading: false, error: false, msg: 'Welcome', updateData: true };
        case "AUTH_FAIL":
            return { ...state, loading: false, error: true, msg: action.error, updateData: false };
        case "LOG_OUT":
            localStorage.clear();
            return { userData: null, loading: false, error: false, msg: 'See you soon', updateData: false }
        // USER DATA
        case "GET_USER_PRIVATE_DATA":
            return { ...state, loading: true, error: false, updateData: false };
        case "GET_USER_PRIVATE_DATA_SUCCESS":
            return { ...state, userData: action.data, loading: false, error: false, success: true, updateData: false };
        case "GET_USER_PRIVATE_DATA_FAIL":
            return { ...state, loading: false, error: true, msg: 'Couldn\'t get user data', updateData: false };
        // ADD_BEAT
        case "ADD_BEAT":
            return { ...state, loading: true, error: false, msg: 'Adding beat', updateData: false };
        case "ADD_BEAT_SUCCESS":
            return {
                ...state, loading: false, error: false, msg: 'Beat added succesfully', success: true, updateData: true, redirect: `/${JSON.parse(localStorage.getItem('store')).userData.username}/beats` };
        case "ADD_BEAT_FAIL":
            return { ...state, loading: false, error: true, msg: 'Error adding beat', updateData: false };
        // EDIT_BEAT
        case "EDIT_BEAT":
            return { ...state, loading: true, error: false, msg: 'Updating beat', updateData: false };
        case "EDIT_BEAT_SUCCESS":
            return { ...state, loading: false, error: false, msg: 'Beat updated succesfully', success: true, updateData: true, redirect: `/${JSON.parse(localStorage.getItem('store')).userData.username}/beats` };
        case "EDIT_BEAT_FAIL":
            return { ...state, loading: false, error: true, msg: 'Error updating beat', updateData: false };
        // DELETE_BEAT
        case "DELETE_BEAT":
            return { ...state, loading: true, error: false, msg: 'Deleting beat', updateData: false };
        case "DELETE_BEAT_SUCCESS":
            return { ...state, loading: false, error: false, msg: 'Beat deleted succesfully', success: true, updateData: true };
        case "DELETE_BEAT_FAIL":
            return { ...state, loading: false, error: true, msg: 'Error deleting beat', updateData: false };
        // EDIT_PROFILE
        case "EDIT_PROFILE":
            return { ...state, loading: true, error: false, msg: 'Editing profile', updateData: false };
        case "EDIT_PROFILE_SUCCESS":
            return { ...state, loading: false, error: false, msg: 'Profile updated !', success: true, updateData: true, redirect: `/${JSON.parse(localStorage.getItem('store')).userData.username}` };
        case "EDIT_PROFILE_FAIL":
            return { ...state, loading: false, error: true, msg: 'Error updating profile', updateData: false };
        default:
            return state;
    }
};

export default reducer;