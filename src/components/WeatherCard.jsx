import React, { useState, useEffect } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Spinner from '../ui/Spinner';
import WeatherDetails from './WeatherDetails';
import CurrentDateTime from './CurrentDateTime';
import {
  fetchWeather,
  getWeatherByGeolocation,
} from '../utils/getWeatherByLocation';
import { useRef } from 'react';

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    getWeatherByGeolocation(
      setWeather,
      setError,
      setLoading,
      import.meta.env.VITE_API_KEY
    );
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loc = inputRef.current.value;

    if (!loc) {
      setError(ERROR_MESSAGES.INVALID_CITY);
      return;
    }

    const result = await fetchWeather(loc, import.meta.env.VITE_API_KEY);

    if (result.error) {
      setError(result.error);
    } else {
      setWeather(result);
      setError('');
      inputRef.current.value = '';
    }
  };

  if (loading || !weather) return <Spinner />;

  return (
    <div className="bg-gray-200 rounded-[2.5rem] flex max-[1080px]:flex-col gap-10">
      <div className="flex flex-col bg-white rounded-bl-[2.5rem] max-[1080px]:rounded-bl-[0] rounded-tl-[2.5rem] max-[1080px]:rounded-tr-[2.5rem] p-10">
        <div className="flex gap-5 justify-center">
          <div>
            <form className="flex gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                ref={inputRef}
                placeholder="Search for places..."
                className="p-2 border rounded-lg focus:outline-none hover:scale-x-105 transition-all duration-300"
              />
              <button
                className="hover:translate-x-0.5 transition-all duration-300"
                aria-label="Submit"
              >
                <FaLongArrowAltRight />
              </button>
            </form>
            {error && <h1 className="text-left text-red-700 mt-3">{error}</h1>}
          </div>
        </div>
        <div className="py-10 items-center flex flex-col">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt=""
            className="min-h-[120px] rounded-[100px]"
          />
          <p className="text-red-600 font-bold text-lg">
            {weather.weather[0].description}
          </p>

          <div className="mt-10 mb-10">
            <p className="text-[60px]">
              {weather.main.temp} <span>℃</span>
            </p>

            <p className="pb-5 border-b text-[25px] text-gray-400">
              Feels like: {weather.main.feels_like} <span>℃</span>
            </p>
          </div>

          <CurrentDateTime />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <p className="mt-7 text-[20px] sm:text-[40px] md:text-[80px] text-red-600">
          {weather.name}
          <span className="md:text-lg text-gray-600 text-[10px]">
            {' '}
            {weather.sys.country}
          </span>
        </p>

        <WeatherDetails weather={weather} />
      </div>
    </div>
  );
};

export default WeatherCard;
