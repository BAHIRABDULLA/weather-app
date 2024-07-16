
import './DisplayWeather.css';
import { FaSearch } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import { FaWind } from 'react-icons/fa';
import { CiCloud } from 'react-icons/ci';
import { TiWeatherPartlySunny } from "react-icons/ti";
import { RiLoaderFill } from "react-icons/ri";
import { BsFillSunFill, BsFillCloudyFill, BsCloudRainHeavyFill, BsCloudFog2Fill } from "react-icons/bs";
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';

const DisplayWeather = () => {

  const apiKey = "0cc86d16bf572f78cdc96c096c7627e5"
  const apiEndPoint = 'https://api.openweathermap.org/data/2.5/'

  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null)
  const [loading ,  setLoading] =useState(false)
  const [searchCity , setSearchCity] =useState("")


  interface WeatherDataProps {
    name: string,

    main: {
      temp: number,
      humidity: number
    },
    sys: {
      country: string
    },
    weather: {
      description: string
      main: string
    }[],
    wind: {
      speed: number
    }
  }

  

  const fetchCurrenctWeather = async (lat: number, lon: number) => {
    const url = `${apiEndPoint}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    const response = await axios.get(url)
    // console.log(response.data,'response.data');

    return response.data

  }

  const fetchWeatherData = async (city:string)=>{
    const weatherResponse = await axios.get()
  }

  const iconChanger = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string
    switch (weather) {
      case 'Rain':
        iconElement = <BsCloudRainHeavyFill />
        iconColor = "#272829"
        break;

      case 'Clear':
        iconElement = <BsFillSunFill />
        iconColor = "#FFC436"
        break;

      case 'Clouds':
        iconElement = <BsFillCloudyFill />
        iconColor = "#102C57"
        break;

      case 'Mist':
        iconElement = <BsCloudFog2Fill />
        iconColor = "#279EFF"
        break;

      default:
        iconElement = <TiWeatherPartlySunny />
        iconColor = '#7B2869';
    }
    return (
      <span className='icon text-6xl animate-bounce'>{iconElement}</span>
    )
  }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      Promise.all([fetchCurrenctWeather(latitude, longitude)]).then(
        ([currentWeather]) => {
          setWeatherData(currentWeather);
          setLoading(true)
        }
      )
    })
  })

  return (
    <div className="container mx-auto max-w-md mt-8 p-10 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 shadow-lg text-white animate-fadeIn">
      <div className="searchDiv flex items-center justify-center gap-4 mb-8">
        <input
          className="searchArea w-full p-3 rounded-md outline-none text-black shadow-md"
          type="search"  value={searchCity} onChange={(e)=>setSearchCity(e.target.value)}
          placeholder="Enter a city"
        />
        <FaSearch className="searchIcon text-2xl cursor-pointer" />
      </div>
      {weatherData && loading?(
        <>
          <p className='mx-auto max-w-fit'>{weatherData.sys.country}</p>
          <div className="icon flex justify-center mt-10 mb-8">
            {/* <CiCloud className="cloudicon text-6xl animate-bounce" /> */}
            {iconChanger(weatherData.weather[0].main)}
          </div>
          <div className="details text-center mb-8">
            <h1 className="text-4xl font-bold ">{weatherData.name}</h1>
            <h1 className="text-6xl font-extrabold ">{weatherData.main.temp}°</h1>
            <h3 className="text-2xl ">{weatherData.weather[0].description}</h3>
          </div>
          <div className="bottomlevel flex justify-between items-center text-center">
            <div className="humidityLevel flex flex-col items-center animate-pulse">
              <WiHumidity className="text-4xl mb-2" />
              <h3 className="text-2xl">{weatherData.main.humidity}%</h3>
              <h5 className="text-xl">Humidity</h5>
            </div>
            <div className="windLevel flex flex-col items-center animate-pulse">
              <FaWind className="text-4xl mb-2" />
              <h3 className="text-2xl">{weatherData.wind.speed} km/h</h3>
              <h5 className="text-xl">Wind Speed</h5>
            </div>
          </div>
        </>
      ) :(
      <div className='loading flex flex-col justify-center items-center'>
        <RiLoaderFill  className='loadingIcon animate-spin text-4xl'/>
        <p className='font-sans mt-2'>Loading..</p>
      </div>
      )}
    </div>
  );
};

export default DisplayWeather;
