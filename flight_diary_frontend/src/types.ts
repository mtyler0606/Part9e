export interface DiaryEntry {
    id: number;
    date: string;
    weather: string; //Weather?
    visibility: string; //visibility?
    comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

