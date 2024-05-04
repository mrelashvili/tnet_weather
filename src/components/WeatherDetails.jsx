import React from 'react';
import ArrowIcon from '../ui/ArrowIcon';
import WeatherInfo from './WeatherInfo';
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa';
import { formatTime } from '../utils/sunsetAndSunrise';
import HumidityChart from '../charts/HumidityChart';
import WindSpeedChart from '../charts/WindSpeedChart';

const WeatherDetails = ({ weather }) => {
  const sunrise = formatTime(weather.sys.sunrise);
  const sunset = formatTime(weather.sys.sunset);

  const visibilityVal = weather.visibility / 1000;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-auto py-10 pr-[2.5rem]">
      <WeatherInfo label="Humidity" className="text-center">
        <HumidityChart humidity={weather.main.humidity} width={1000} />
      </WeatherInfo>
      <WeatherInfo
        label="Wind Speed"
        value={`${weather.wind.speed} km/h`}
        className="text-center"
        font
      >
        <div className="text-center flex flex-col gap-2 items-center">
          <div className="flex gap-3">
            Wind Direction
            <span>
              <ArrowIcon deg={weather.wind.deg} />
            </span>
          </div>
        </div>
      </WeatherInfo>
      <WeatherInfo label="Coordinates" className="text-center">
        <p>
          Latitude: <span>{weather.coord.lon} &#xb0;</span>
        </p>
        <p>
          Longitude: <span>{weather.coord.lat} &#xb0;</span>
        </p>
      </WeatherInfo>

      <WeatherInfo
        label="Atmospheric Pressure"
        value={`${weather.main.pressure} mb (millibar)`}
        className="text-center"
      />
      <WeatherInfo label="Sunrise & Sunset" className="text-center">
        <div className="flex flex-col gap-5 items-center">
          <div className="flex items-center">
            <p className="flex gap-2 items-center w-28">
              <FaArrowAltCircleUp className="text-orange-500" />
              <span>{sunrise}</span>
            </p>
          </div>
          <div className="flex items-center">
            <p className="flex gap-2 items-center w-28">
              <FaArrowAltCircleDown className="text-orange-500" />
              <span>{sunset}</span>
            </p>
          </div>
        </div>
      </WeatherInfo>
      <WeatherInfo label="Cloud cover & Visibility" className="text-center">
        <p>Cloud Cover: {`${weather.clouds.all} %`}</p>
        <p>Visibility: {`${visibilityVal} km`}</p>
      </WeatherInfo>
    </div>
  );
};

export default WeatherDetails;
