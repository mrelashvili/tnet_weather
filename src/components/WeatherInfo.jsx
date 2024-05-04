import React from 'react';

const WeatherInfo = ({ children, label, value, font }) => {
  return (
    <div className="bg-white pt-4 pb-8 rounded-[20px] shadow-md flex flex-col justify-between">
      <p className={`text-gray-300 font-medium pb-3`}>{label}</p>
      <p className={`text-lg font-bold ${font ? `text-[40px]` : 'null'}`}>
        {value}
      </p>
      {children}
    </div>
  );
};

export default WeatherInfo;
