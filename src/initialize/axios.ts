import Axios, { AxiosResponse } from 'axios';
import ApiClient from '../apis/api-client';

export default function initializeAxios() {
    const axios = Axios.create({
        baseURL: '/api'
    });
    axios.interceptors.request.use((config) => {
        const token = localStorage.getItem('Token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    });
    axios.interceptors.response.use(response => response, error => {
        if (error.response) {
            const { data } = error.response as AxiosResponse;
            console.log(data);
            if (data.message) {
                alert(data.message);
            }
        }
        throw error;
    })
    ApiClient.setInstance(axios);
}