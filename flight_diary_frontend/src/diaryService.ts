import axios from 'axios';
import { DiaryEntry } from './types';

const baseURL = "http://localhost:3000/api/diaries";

export const getAllEntries = () => {
    return axios
        .get<DiaryEntry[]>(baseURL)
        .then(response => response.data)
}