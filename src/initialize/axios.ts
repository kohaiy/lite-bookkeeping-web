import Axios, { AxiosResponse } from 'axios';
import type { SetterOrUpdater } from 'recoil';
import ApiClient from '../apis/api-client';

let setLoading: SetterOrUpdater<boolean> | undefined;
export function subscribeToLoading(setter: SetterOrUpdater<boolean>) {
    setLoading = setter;
}
export function unsubscribeToLoading() {
    setLoading = undefined;
}

export default function initializeAxios() {
    let loadingCount = 0;
    const axios = Axios.create({
        baseURL: '/api'
    });
    axios.interceptors.request.use((config) => {
        setLoading?.(true);
        loadingCount++;
        const token = localStorage.getItem('Token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    });
    axios.interceptors.response.use(response => {
        loadingCount--;
        if (loadingCount <= 0) {
            setLoading?.(false);
        }

        return response
    }, error => {
        loadingCount--;
        if (loadingCount <= 0) {
            setLoading?.(false);
        }

        if (error.response) {
            const { data } = error.response as AxiosResponse;
            console.log(data);
            if (data.message) {
                setTimeout(() => {
                    alert(data.message);
                });
            }
        }
        throw error;
    })
    ApiClient.setInstance(axios);
}