import { useLocation } from 'react-router-dom';

export const useSearch = () => {
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    return {
        get: (key: string) => search.get(key),
        set: (key: string, value: string) => search.set(key, value),
        toString: () => search.toString(),
    };
};
