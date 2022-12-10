import axios from 'axios'
const CURRENT_STATUS = 'prod' //prod || dev
const API_PREFIX_DEV = 'http://192.168.1.35:5000'
const API_PREFIX_PROD = 'https://beatgallery-api.vercel.app'
const API_PREFIX = CURRENT_STATUS === 'dev' ? API_PREFIX_DEV : API_PREFIX_PROD;

//para peticiones 'publicas' que no requieren token de autenticacion
const config = {
    headers: {
        "Content-Type": "application/json",
    },
}

export const login = async (formData) => {
    const { email, password } = formData;
    try {
        const res = await axios.post(`${API_PREFIX}/api/user/login`, { email, password }, config);
        /*
            {
                data: {success: true, token: XXXXXXXXXXXXXXXXX}
                status: XXX
            }
        */
        return res;
    } catch (error) {
        return error.response;
    }
}

export const register = async (formData) => {
    const { username, email, password, isProducer, isArtist } = formData;
    try {
        const res = await axios.post(`${API_PREFIX}/api/user/register`, { username, email, password, isProducer, isArtist }, config)
        /*
            {
                data: {success: true, token: XXXXXXXXXXXXXXXXX}
                status: XXX
            }
        */
        return res;
    } catch (error) {
        return error.response;
    }
}

//se lanza tras logearse o registrarse
export const fetchUserPrivateData = async () => {
    try {
        const res = await axios.get(`${API_PREFIX}/api/user/private`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return res;
        /*
            {
                data: {success: true, userPrivateData:{_id:askjndaksd,}}
                status: XXX
            }
        */
    } catch (error) {
        // handleAPIError(error)
        // console.log(error);
    }
}
//se lanza tras logearse o registrarse
export const fetchUserPublicData = async (username) => {
    try {
        const publicUserData = await axios.get(`${API_PREFIX}/api/user/public/${username}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return publicUserData;
    } catch (error) {
        handleAPIError(error)
        // console.log(error);
    }
}

export const getUserPrivateData = async () => {
    try {
        const res = await axios.get(`${API_PREFIX}/api/user/private`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return res
    } catch (error) {
        handleAPIError(error)
    }
}

export const buscarUsuario = async (userText) => {
    try {
        const { data } = await axios.get(`${API_PREFIX}/api/user/buscar/${userText}`, config);
        return data;
    } catch (error) {
        handleAPIError(error)
    }
}

export const getBeatById = async (beatId) => {
    try {
        const res = await axios.get(`${API_PREFIX}/api/beat/${beatId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return res;
    } catch (error) {
        handleAPIError(error)
    }
}

export const addBeat = async (beatInfo) => {
    try {
        const res = await axios.post(`${API_PREFIX}/api/beat/add`, { ...beatInfo }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return res;
    } catch (error) {
        return error.response.data;
    }
}

export const editBeat = async (beatInfo) => {
    // console.log('En edit beat');
    // console.log(beatInfo);
    try {
        const res = await axios.put(`${API_PREFIX}/api/beat/update`, { ...beatInfo }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return res;
        // console.log(data);
        // navigate(`/${localStorage.getItem('username')}/beats`);
    } catch (error) {
        handleAPIError(error)
        // setError("You are not authorized please login");
        // localStorage.removeItem("authToken");
    }
}

export const editUser = async (newData) => {
    try {
        const res = await axios.put(`${API_PREFIX}/api/user/update`, { ...newData }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return res;
        // console.log(data);
        // navigate(`/${localStorage.getItem('username')}/beats`);
    } catch (error) {
        handleAPIError(error)
        // setError("You are not authorized please login");
        // localStorage.removeItem("authToken");
    }
}

export const deleteBeat = async (id) => {
    try {
        const res = await axios.delete(`${API_PREFIX}/api/beat/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
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
    // console.log(err);
    const token = err?.config?.headers?.Authorization?.split(' ')[1];

    if (!token) errormsg = 'no token'
    console.log('===ERROR EN APICALL=== ' + errormsg);
}