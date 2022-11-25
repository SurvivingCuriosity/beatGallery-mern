import axios from 'axios'

//para peticiones 'publicas' que no requieren token de autenticacion
const config = {
    headers: {
        "Content-Type": "application/json",
    },
}
//para peticiones privadas que requieren token de autenticación
const authConfig = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
}

//TODO: HANDLE ERRORS
export const getUserPrivateBeats = async () => {
    try {
        const res = await axios.get(`/api/user/private/beats`, authConfig);
        return res;
    } catch (error) {
        handleAPIError(error)
        //localStorage.removeItem("authToken");
        // setError("You are not authorized please login");
        // navigate('/login')
    }
}

export const getUserPublicData = async (username) => {
    try {
        const res = await axios.get(`/api/user/public/${username}`, authConfig);
        return res
    } catch (error) {
        handleAPIError(error)
        //localStorage.removeItem("authToken");
        // setError("You are not authorized please login");
        // navigate('/login')
    }
}

export const getUserPrivateData = async () => {
    try {
        const res = await axios.get(`/api/user/private`, authConfig);
        return res
    } catch (error) {
        handleAPIError(error)
        //localStorage.removeItem("authToken");
        // setError("You are not authorized please login");
        // navigate('/login')
    }
}

export const buscarUsuario = async (userText) => {
    try {
        const { data } = await axios.get(`https://beatgallery-api.vercel.app/api/user/buscar/${userText}`, authConfig);
        return data;
    } catch (error) {
        handleAPIError(error)
        //localStorage.removeItem("authToken");
        // setError("You are not authorized please login");
        // navigate('/login')
    }
}

export const getBeatById = async (beatId) => {
    try {
        const res = await axios.get(`https://beatgallery-api.vercel.app/api/beat/${beatId}`, authConfig);
        return res;
        // console.log(data);
        // navigate(`/${localStorage.getItem('username')}/beats`);
    } catch (error) {
        handleAPIError(error)
        // setError("You are not authorized please login");
        // localStorage.removeItem("authToken");
    }
}

export const addBeat = async (beatInfo) => {
    try {
        const res = await axios.post("https://beatgallery-api.vercel.app/api/beat/add", { ...beatInfo }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateBeat = async (beatInfo) => {
    try {
        const res = await axios.put("https://beatgallery-api.vercel.app/api/beat/:id", { ...beatInfo }, authConfig);
        return res;
        // console.log(data);
        // navigate(`/${localStorage.getItem('username')}/beats`);
    } catch (error) {
        handleAPIError(error)
        // setError("You are not authorized please login");
        // localStorage.removeItem("authToken");
    }
}

export const handleAPIError = (err) => {
    let errormsg;
    console.log(err);
    const token = err.config.headers.Authorization.split(' ')[1];

    if (!token) errormsg = 'no token'
    console.log('===ERROR EN APICALL=== ' + errormsg);
}