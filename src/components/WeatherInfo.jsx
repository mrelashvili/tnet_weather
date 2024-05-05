import React from 'react';

const WeatherInfo = ({ children, label, value }) => {
  return (
    <div className="bg-white p-4 pb-8 rounded-[20px] shadow-md flex flex-col justify-between">
      <p className={`text-gray-600 font-medium pb-3`}>{label}</p>
      <p className={` font-bold text-[30px]`}>{value}</p>
      {children}
    </div>
  );
};

export default WeatherInfo;
