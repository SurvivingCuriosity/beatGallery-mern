import axios from 'axios'

const config = {
    headers: {
        "Content-Type": "application/json",
    },
}

//TODO: HANDLE ERRORS
export const login = async (formData) => {
    const { email, password } = formData;
    try {
        const res = await axios.post('https://beatgallery-api.vercel.app/api/user/login', { email, password }, config);
        return res;
    } catch (error) {
        return error.response;
    }
}
export const register = async (formData) => {
    const { username, email, password, isProducer, isArtist } = formData;
    try {
        const res = await axios.post('https://beatgallery-api.vercel.app/api/user/register', { username, email, password, isProducer, isArtist }, config)
        return res;
    } catch (error) {
        return error.response;
    }
}