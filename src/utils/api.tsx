import axios from 'axios';

export const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const freeApi = axios.create({
    baseURL: API_URL,
});