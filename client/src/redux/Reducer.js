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
        // DENY_ACTION
        case "DENY_ACTION":
            return { ...state, pendingAction: null, needsConfirm: null };
        // MESSAGE_SHOWN
        case "NAVIGATION_DONE":
            return { ...state, redirect: null };
        // MESSAGE_SHOWN
        case "MESSAGE_SHOWN":
            return { ...state, msg: '' };
        // AUTH
        case "AUTH_START":
            return { ...state, loading: true, msg: '' };
        case "AUTH_SUCCESS":
            localStorage.setItem('authToken', action?.token);
            return { ...state, token: action.token, loading: false, error: false, msg: 'Welcome', updateData: true, redirect: '/' };
        case "AUTH_FAIL":
            return { ...state, loading: false, error: true, msg: action.error,  updateData: false };
        case "LOG_OUT":
            localStorage.clear();
            return { msg: 'See you soon', loading:true }
        // USER DATA
        case "GET_USER_PRIVATE_DATA":
            return { ...state, loading: true, updateData: false };
        case "GET_USER_PRIVATE_DATA_SUCCESS":
            return { ...state, userData: action.data, loading: false, error: false, success: true, updateData: false };
        case "GET_USER_PRIVATE_DATA_FAIL":
            return { ...state, loading: false, error: true, msg: 'Couldn\'t get user data', updateData: false };
        // USER DATA
        case "GET_USER_PUBLIC_DATA":
            return { ...state, loading: true };
        case "GET_USER_PUBLIC_DATA_SUCCESS":
            return { ...state, publicUserData: action.data, loading: false, error: false, success: true};
        case "GET_USER_PUBLIC_DATA_FAIL":
            return { ...state, loading: false, error: true, msg: 'Couldn\'t get user data'};
        // ADD_BEAT
        case "ADD_BEAT":
            return { ...state, loading: true };
        case "ADD_BEAT_SUCCESS":
            return { ...state, loading: false, error: false, msg: 'Beat added succesfully', success: true, updateData: true, redirect: `/${JSON.parse(localStorage.getItem('store')).userData.username}/beats` };
        case "ADD_BEAT_FAIL":
            return { ...state, loading: false, error: true, success: false, msg: 'Error adding beat'};
        // EDIT_BEAT
        case "EDIT_BEAT":
            return { ...state, loading: true };
        case "EDIT_BEAT_SUCCESS":
            return { ...state, loading: false, error: false, msg: 'Beat updated succesfully', success: true, updateData: true, redirect: `/${JSON.parse(localStorage.getItem('store')).userData.username}/beats` };
        case "EDIT_BEAT_FAIL":
            return { ...state, loading: false, error: true, msg: 'Error updating beat'};
        // DELETE_BEAT
        case "DELETE_BEAT":
            return { ...state, needsConfirm: 'Do you want to delete this beat?', pendingAction: { action: 'DELETE_BEAT', targetId: action.data } };
        case "CONFIRM_DELETE_BEAT":
            return { ...state, loading: true, pendingAction: null, needsConfirm: null };
        case "DELETE_BEAT_SUCCESS":
            return { ...state, loading: false, error: false, msg: 'Beat deleted succesfully', success: true, updateData: true, needsConfirm: false };
        case "DELETE_BEAT_FAIL":
            return { ...state, loading: false, error: true, msg: 'Error deleting beat', updateData: false, needsConfirm: false };
        // EDIT_PROFILE
        case "EDIT_PROFILE":
            return { ...state, loading: true };
        case "EDIT_PROFILE_SUCCESS":
            return { ...state, loading: false, error: false, msg: 'Profile updated !', success: true, updateData: true, redirect: `/${JSON.parse(localStorage.getItem('store')).userData.username}` };
        case "EDIT_PROFILE_FAIL":
            return { ...state, loading: false, error: true, msg: 'Error updating profile'};
        default:
            return state;
    }
};

export default reducer;