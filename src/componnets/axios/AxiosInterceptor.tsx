import axios from "axios"
import {useEffect} from "react"
import {useNavigate} from "react-router-dom"
import PlineTools from "../services/PlineTools"

const axiosConfig = {
    BASE_URL: 'http://localhost',
    PORT: ':8080',
    TIMEOUT: 60000,
}
export const API = axios.create()

API.defaults.baseURL = axiosConfig.BASE_URL + axiosConfig.PORT

API.defaults.headers.common['Content-Type'] = 'application/json'


const AxiosInterceptor = ({children}: any) => {
    const navigate = useNavigate()
    useEffect(() => {
        // axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        //     console.log(err);
        //     if (err.request.status === 0) {
        //         navigate('/login');
        //     }
        //     return Promise.reject(err);
        // });
    }, [navigate])

    return children
}

export default API
export {AxiosInterceptor}