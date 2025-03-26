import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllEntries, createEntry } from "./diaryService";

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
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  const addDiary = () => {
    const id = Math.max(...diaryEntries.map(entry => entry.id)) + 1;
    createEntry({id: id, date: date, visibility: visibility, weather: weather, comment: comment}).then(data => {setDiaryEntries(diaryEntries.concat(data))})
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  }
  
  return (
    <>
    <h2>Add new entry</h2>
    <form >
      <label>Date</label>
      <input type="text" onChange={(event) => setDate(event.target.value)} />
      <label>Visibility</label>
      <input type="text" onChange={(event) => setVisibility(event.target.value)} />
      <br />
      <label>Weather</label>
      <input type="text" onChange={(event) => setWeather(event.target.value)} />
      <label>Comment</label>
      <input type="text" onChange={(event) => setComment(event.target.value)} />
      <br />
      <button onClick={addDiary}>Add Diary</button>
    </form>
    <h2>Diary entries</h2>
    {diaryEntries.map(entry => <Entry key={entry.id} date={entry.date} weather={entry.weather} visibility={entry.visibility} />)}
    </>
    
  )
}

export default App
