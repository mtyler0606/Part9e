import axios from 'axios';
import { DiaryEntry } from './types';

const baseURL = "http://localhost:3000/api/diaries";

export const createEntry = (object: DiaryEntry) => {
    /*
    const newObj = {
        date: object.date,
        weather: object.weather,
        visibility: object.visibility,
        comment: object.comment
    }
        */
    return axios
        .post<DiaryEntry>(baseURL, object)
        .then(response => response.data)
}

export const getAllEntries = () => {
    return axios
        .get<DiaryEntry[]>(baseURL)
        .then(response => response.data)
}