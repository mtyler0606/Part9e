import axios from 'axios';
import { DiaryEntry } from './types';

const baseURL = "http://localhost:3000/api/diaries";

export const createEntry = (object: DiaryEntry) => {

        return axios
        .post<DiaryEntry>(baseURL, object)
        .then(response => response.data)
        .catch (error => {
        if(axios.isAxiosError(error)){
            console.log("Error status:", error.status);
            console.error(error.response);
        }
        else {
            console.error(error);
        }
    })
}

export const getAllEntries = () => {
    return axios
        .get<DiaryEntry[]>(baseURL)
        .then(response => response.data)
}