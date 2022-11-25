import axios from 'axios'
import {handleAPIError} from './apiCalls'

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

//se lanza tras logearse o registrarse
export const fetchUserPrivateData = async () => {
    try {
        const res = await axios.get(`https://beatgallery-api.vercel.app/api/user/private`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return res.data;
    } catch (error) {
        // handleAPIError(error)
        console.log(error);
    }
}