import React, { useState, useEffect } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import axios from 'axios';
import Spinner from '../ui/Spinner';
import WeatherDetails from './WeatherDetails';
import CurrentDateTime from './CurrentDateTime';

const WeatherCard = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const APIKEY = '6527be30b639fe032ba2a9d4af0e9d5a';

  const fetchWeather = async (loc) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=${APIKEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      setError('Error fetching weather data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${APIKEY}&units=metric`
            )
            .then((response) => {
              setWeather(response.data);
            })
            .catch((error) => {
              setError('Failed to fetch weather data for your location');
              console.error(error);
            })
            .finally(() => setLoading(false));
        },
        () => {
          setError('Geolocation is not supported or permission denied');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather(location);
  };

  if (loading) return <Spinner />;
  if (!weather) return null;

  return (
    <div className="bg-gray-200 rounded-[2.5rem] flex gap-10">
      <div className="flex flex-col bg-white rounded-bl-[2.5rem] rounded-tl-[2.5rem] p-10">
        <div className="flex gap-5">
          <input
            type="text"
            placeholder="Search for places..."
            value={location}
            onChange={handleLocationChange}
            className="p-2 border rounded-lg focus:outline-none hover:scale-x-105 transition-all duration-300"
          />
          <button
            onClick={handleSubmit}
            className="hover:translate-x-0.5 transition-all duration-300"
          >
            <FaLongArrowAltRight />
          </button>
        </div>
        <div className="py-10 items-center flex flex-col">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt=""
            className="min-h-[120px] rounded-[100px]"
          />
          <p className="text-orange-500 font-bold	text-lg">
            {weather.weather[0].description}
          </p>

          <div className="mt-10 mb-10">
            <p className="text-[60px]">
              {weather.main.temp} <span>℃</span>
            </p>

            <p className="pb-5 border-b text-[25px] text-gray-400">
              Feels like - {weather.main.feels_like} <span>℃</span>
            </p>
          </div>

          <CurrentDateTime />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="mt-7">
          {weather.name}, {weather.sys.country}
        </h3>

        <WeatherDetails weather={weather} />
      </div>
    </div>
  );
};

export default WeatherCard;
