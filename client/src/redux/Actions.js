import { login, register, fetchUserPrivateData, addBeat, editBeat, editUser } from "../api/apiCalls";

//AUTH
export const loginAction = (formData, navigate, evt) => async (dispatch) => {
    evt.preventDefault();
    dispatch({ type: "AUTH_START" });

    const res = await login(formData);
    /*
        res={
            data:{success: true, token:XXXXXXXXXXXXX}
            status:XXX
        }
        res={
            data:{success: false, error:"Una cadena con mensaje de error"}
            status:XXX
        }
    */

    if (res?.data?.success === true) {
        dispatch({ type: "AUTH_SUCCESS", token: res.data.token });
    } else {
        dispatch({ type: "AUTH_FAIL", error: res.data.error });
    }

};

export const registerAction = (formData, navigate, evt) => async (dispatch) => {
    evt.preventDefault();
    dispatch({ type: "AUTH_START" });
    const res = await register(formData);
    if (res?.data?.success === true) {
        dispatch({ type: "AUTH_SUCCESS", token: res.data.token });
    } else {
        dispatch({ type: "AUTH_FAIL", error: res.data.error });
    }

};

export const logoutAction = (navigate) => async (dispatch) => {
    localStorage.clear();
    dispatch({ type: "LOG_OUT" })
    navigate("../", { replace: true });
}

//USERDATA
export const getUserPrivateDataAction = () => async (dispatch) => {
    dispatch({ type: "GET_USER_PRIVATE_DATA" });
    const res = await fetchUserPrivateData();
    /*
        res={
            data: {success : true, userPrivateData}
            status: XXX
        }
    */
    if (res?.data?.success === true) {
        dispatch({ type: "GET_USER_PRIVATE_DATA_SUCCESS", data: res.data.userPrivateData });
    } else {
        dispatch({ type: "GET_USER_PRIVATE_DATA_FAIL", error: res.data.error });
    }
};

export const addBeatAction = (formData) => async (dispatch) => {
    dispatch({ type: "ADD_BEAT" });
    const res = await addBeat(formData);
    // console.log(res);
    if (res?.data?.success === true) {
        dispatch({ type: "ADD_BEAT_SUCCESS", data: res.data });
    } else {
        dispatch({ type: "ADD_BEAT_FAIL", error: res?.data?.error });
    }
};

export const editBeatAction = (formData) => async (dispatch) => {
    dispatch({ type: "EDIT_BEAT" });
    const res = await editBeat(formData);
    // console.log(res);
    if (res?.data?.success === true) {
        dispatch({ type: "EDIT_BEAT_SUCCESS", data: res.data });
    } else {
        dispatch({ type: "EDIT_BEAT_FAIL", error: res.data.error });
    }
};

export const editProfileAction = (formData, evt) => async (dispatch) => {
    evt?.preventDefault();
    dispatch({ type: "EDIT_PROFILE" });
    const res = await editUser(formData);
    // console.log(res);
    if (res?.data?.success === true) {
        dispatch({ type: "EDIT_PROFILE_SUCCESS", data: res.data });
    } else {
        dispatch({ type: "EDIT_PROFILE_FAIL", error: res.data.error });
    }
}

export const navigationDone = () => async (dispatch) => {
    dispatch({ type: "NAVIGATION_DONE" });
}