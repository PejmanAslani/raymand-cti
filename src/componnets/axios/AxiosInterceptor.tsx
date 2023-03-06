import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PlineTools from "../services/PlineTools"

const axiosConfig = {
    BASE_URL: 'http://localhost',
    PORT: ':8080',
    TIMEOUT:6000
}

export const API = axios.create();
axios.interceptors.request.use(function (config: any) {
    const token = PlineTools.getCookies('token');
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config;
});
axios.defaults.baseURL = axiosConfig.BASE_URL + axiosConfig.PORT

axios.defaults.headers.common['Content-Type'] = 'application/json'

const AxiosInterceptor = ({ children }: any) => {
    axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
    const navigate = useNavigate()
    useEffect(() => {
        const resInterceptor = (response: any) => {
            return response
        }
        const errInterceptor = (error: any) => {
            console.log(error)
            if (error.response?.status === 401) {
                PlineTools.removeCookies('token');
                navigate('/login');
                return;
            }
            throw error
        }

        const interceptor = axios.interceptors.response.use(resInterceptor, errInterceptor)
        return () => axios.interceptors.response.eject(interceptor)

    }, [navigate])

    return children
}

export default API
export { AxiosInterceptor }