import React from 'react';
import ArrowIcon from '../ui/ArrowIcon';
import WeatherInfo from './WeatherInfo';
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa';
import { formatTime } from '../utils/sunsetAndSunrise';

const WeatherDetails = ({ weather }) => {
  const sunrise = formatTime(weather.sys.sunrise);
  const sunset = formatTime(weather.sys.sunset);

  const visibilityVal = weather.visibility / 1000;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-auto py-10 pr-[2.5rem]">
      <WeatherInfo
        label="Humidity"
        value={`${weather.main.humidity}%`}
        className="text-center"
      />
      <div>
        <WeatherInfo
          label="Wind Speed"
          value={`${weather.wind.speed} km/h`}
          className="text-center"
        >
          <div className="text-center flex flex-col gap-2 items-center">
            <p>Wind Direction</p>
            <ArrowIcon deg={weather.wind.deg} />
          </div>
        </WeatherInfo>
      </div>
      <WeatherInfo
        label="Condition"
        value="Mostly Cloudy"
        className="text-center"
      />

      <WeatherInfo
        label="Rain Probability"
        value="30%"
        className="text-center"
      />
      <WeatherInfo label="Sunrise & Sunset" className="text-center">
        <div className="flex flex-col gap-5 items-center">
          <div className="flex items-center">
            <FaArrowAltCircleUp /> <span>{sunrise}</span>
          </div>
          <div className="flex items-center">
            <FaArrowAltCircleDown /> <p>{sunset}</p>
          </div>
        </div>
      </WeatherInfo>
      <WeatherInfo
        label="Visibility"
        value={`${visibilityVal} km`}
        className="text-center"
      />
    </div>
  );
};

export default WeatherDetails;
