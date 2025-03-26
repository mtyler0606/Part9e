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
    createEntry({id: id, date: date, visibility: visibility, weather: weather, comment: comment}).then(data => {setDiaryEntries(diaryEntries.concat(data as DiaryEntry))})
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  }
  
  const handleVisiblity = (value: string) => setVisibility(value);
  const handleWeather = (value: string) => setWeather(value);
  //visibility = great good ok poor
  //weather = sunny rainy cloudy stormy windy
  return (
    <>
    <h2>Add new entry</h2>
    <form >
      <label htmlFor="date">Date</label>
      <input type="date" id="date" onChange={(event) => setDate(event.target.value)} />
      
      <div>
        <legend>Visibility</legend>
        <label htmlFor="great">great</label>
        <input type="radio" id="great" value="great" checked={visibility === "great"} onChange={() => handleVisiblity("great")}/>
        <label htmlFor="good">good</label>
        <input type="radio" id="good" value="good" checked={visibility === "good"} onChange={() => handleVisiblity("good")}/>
        <label htmlFor="ok">ok</label>
        <input type="radio" id="ok" value="ok" checked={visibility === "ok"} onChange={() => handleVisiblity("ok")}/>
        <label htmlFor="poor">poor</label>
        <input type="radio" id="poor" value="poor" checked={visibility === "poor"} onChange={() => handleVisiblity("poor")}/>
      </div>
      <div>
        <legend>Weather</legend>
        <label htmlFor="sunny">sunny</label>
        <input type="radio" id="sunny" value="sunny" checked={weather === "sunny"} onChange={() => handleWeather("sunny")}/>
        <label htmlFor="rainy">rainy</label>
        <input type="radio" id="rainy" value="rainy" checked={weather === "rainy"} onChange={() => handleWeather("rainy")}/>
        <label htmlFor="cloudy">cloudy</label>
        <input type="radio" id="ok" value="cloudy" checked={weather === "cloudy"} onChange={() => handleWeather("cloudy")}/>
        <label htmlFor="windy">windy</label>
        <input type="radio" id="windy" value="poor" checked={weather === "windy"} onChange={() => handleWeather("windy")}/>
      </div>
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
