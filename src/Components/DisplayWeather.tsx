import './DisplayWeather.css';
import { FaSearch } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import { FaWind } from 'react-icons/fa';
import { CiCloud } from 'react-icons/ci';

const DisplayWeather = () => {
  return (
    <div className="container mx-auto max-w-md mt-8 p-10 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 shadow-lg text-white animate-fadeIn">
      <div className="searchDiv flex items-center justify-center gap-4 mb-8">
        <input
          className="searchArea w-full p-3 rounded-md outline-none text-black shadow-md"
          type="search"
          placeholder="Enter a city"
        />
        <FaSearch className="searchIcon text-2xl cursor-pointer" />
      </div>
      <div className="flex justify-center mb-8">
        <CiCloud className="cloudicon text-6xl animate-bounce" />
      </div>
      <div className="details text-center mb-8">
        <h1 className="text-4xl font-bold ">Calicut</h1>
        <h1 className="text-6xl font-extrabold ">48°</h1>
        <h3 className="text-2xl ">Partly Cloudy</h3>
      </div>
      <div className="bottomlevel flex justify-between items-center text-center">
        <div className="humidityLevel flex flex-col items-center animate-pulse">
          <WiHumidity className="text-4xl mb-2" />
          <h3 className="text-2xl">65%</h3>
          <h5 className="text-xl">Humidity</h5>
        </div>
        <div className="windLevel flex flex-col items-center animate-pulse">
          <FaWind className="text-4xl mb-2" />
          <h3 className="text-2xl">2.57 km/h</h3>
          <h5 className="text-xl">Wind Speed</h5>
        </div>
      </div>
    </div>
  );
};

export default DisplayWeather;
