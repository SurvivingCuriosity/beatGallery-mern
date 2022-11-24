import { login, register } from "../api/authAPI.js";
import { fetchUserPrivateData } from "../api/userAPI.js";
import { addBeat } from "../api/apiCalls";
//AUTH
export const loginAction = (formData, navigate, evt) => async (dispatch) => {
    evt.preventDefault();
    dispatch({ type: "AUTH_START" });

        const res = await login(formData);

        if(res.data.success === true){
            dispatch({ type: "AUTH_SUCCESS", token:res.data.token });
        }else{
            dispatch({ type: "AUTH_FAIL", error: res.data });
        }

};

export const registerAction = (formData, navigate, evt) => async (dispatch) => {
    evt.preventDefault();
    dispatch({ type: "AUTH_START" });

        const res = await register(formData);
        if (res.data.success === true) {
            dispatch({ type: "AUTH_SUCCESS", token: res.data.token });
        } else {
            dispatch({ type: "AUTH_FAIL", error: res.data });
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
        if(res.success==true){
            dispatch({ type: "GET_USER_PRIVATE_DATA_SUCCESS", data: res.data });
        }else{
            dispatch({ type: "GET_USER_PRIVATE_DATA_FAIL" });
        }
};

export const addBeatAction = (formData) => async (dispatch) => {
    dispatch({ type: "ADD_BEAT" });
        const res = await addBeat(formData);
        if (res.success == true) {
            dispatch({ type: "ADD_BEAT_SUCCESS", data: res.data });
        }else{
            dispatch({ type: "ADD_BEAT_FAIL", data: res});
        }
};