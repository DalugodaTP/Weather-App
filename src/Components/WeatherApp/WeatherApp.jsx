import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from "../../../src/assets/search.png"
import clear_icon from '../../../src/assets/clear.png'
import cloud_icon from '../../../src/assets/cloud.png'
import drizzle_icon from '../../../src/assets/drizzle.png'
import rain_icon from '../../../src/assets/rain.png'
import snow_icon from '../../../src/assets/snow.png'
import wind_icon from '../../../src/assets/wind.png'
import humidity_icon from '../../../src/assets/humidity.png'

const WeatherApp = () =>{
    
    let api_key = "f0c9687a758f9f9ec46d7deebf072bad";

    const[wicon,setWicon] = useState(cloud_icon);


    //--Search Function for search button
    const search = async () =>{
        const element = document.getElementsByClassName("cityInput")
        // If the input field is empty then return 0
        if(element[0].value === ""){
            return 0;
        }
        // If the input is not Zero below will be executed
        // Metric data from API (using template literals)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        // Use Fetch API to get data
        let response = await fetch(url); // data from the API will be stored in the response variable

        // Pass the data to JSON format
        let data = await response.json();

        // Catch the elements using class name
        const humidity = document.getElementsByClassName("humidity-percentage")
        const wind = document.getElementsByClassName("wind-rate")
        const temperature = document.getElementsByClassName("weather-temp")
        const location = document.getElementsByClassName("weather-location")

        // Change inner html 
        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        temperature[0].innerHTML = data.main.temp+"°c";
        location[0].innerHTML = data.name;

        // Change the Icon based on the weather icon code
        if (data.weather[0].icon==="01d" || data.weather[0].icon==="01n") {
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setWicon(snow_icon);
        }
        else{
            setWicon(clear_icon);
        }

    }

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search'/>
                <div className="search-icon" onClick={()=>{search()}}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24°c</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percentage">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp