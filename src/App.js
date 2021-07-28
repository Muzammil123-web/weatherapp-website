import React, { useState } from "react";
import './App.css';
const api ={
  key:"ed80007444ea5190084d917bed8660a8",
  base:"http://api.openweathermap.org/data/2.5/"
}

function App() {
   const [query, setQuery] = useState("");
   const [weather,setWeather] = useState({});
   
   const search = (event)=>{
     if(event.key==="Enter"){
       fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
       .then(res=>res.json())
       .then(results=>{
        setWeather(results);
        setQuery("");
        console.log(results);
       });
    
     }
   }


   const dateBuilder = (d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();
     
     return `${day} ${month} ${date} ${year}`
  }
  return (
    <div className="app">
    <main>
      <div className="search-box">
        <input type="text"
        className="search-bar"
        value={query}
        placeholder="find it out weather.."
        onChange={(e)=>setQuery(e.target.value)}
        onKeyPress={search}

        />
      </div>
      {(typeof weather.main != "undefined") ? 
     (<div><div className="location-box">
        <div className ="location">{weather.name},{weather.sys.country}</div>
        <div className ="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className ="temp">
        {Math.round(weather.main.temp)}^c
        </div>
        <div className ="weather">
          {weather.weather[0].main}
        </div>
      </div>
      </div>
      ) : ("")}
      
    </main>
      </div>
        
  );
}

export default App;
