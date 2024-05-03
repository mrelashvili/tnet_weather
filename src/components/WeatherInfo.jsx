import React from 'react';

const WeatherInfo = ({ children, label, value }) => {
  return (
    <div className="bg-white pt-4 pb-8 rounded-[20px] shadow-md flex flex-col">
      <p className="text-gray-300 font-medium">{label}</p>
      <p className="text-lg font-bold">{value}</p>
      {children}
    </div>
  );
};

export default WeatherInfo;
