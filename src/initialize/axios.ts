import Axios, { AxiosResponse } from 'axios';
import type { SetterOrUpdater } from 'recoil';
import ApiClient from '../apis/api-client';
import { toast } from '../components/KToast';

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
        const token = localStorage.getItem('token');
        console.log(token);
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
                toast({ content: data.message, duration: 3 });
            }
        }
        throw error;
    })
    ApiClient.setInstance(axios);
}