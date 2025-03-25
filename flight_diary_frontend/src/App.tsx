import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllEntries } from "./diaryService";

interface EntryProps {
  date: string;
  visibility: string;
  weather: string;
}
const Entry = (props: EntryProps) => {
  return (
    <>
    <h3>
      {props.date}
    </h3>
    <p>
      visibility: {props.visibility}
      </p>
      <p>
      weather: {props.weather}
      </p>
      <br />
    </>
  )
} 

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  return (
    <>
    <h2>Diary entries</h2>
    {diaryEntries.map(entry => <Entry key={entry.id} date={entry.date} weather={entry.weather} visibility={entry.visibility} />)}
    </>
    
  )
}

export default App
