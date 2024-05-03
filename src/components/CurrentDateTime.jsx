import React, { useState, useEffect } from 'react';

const CurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayOfWeek = daysOfWeek[currentDateTime.getDay()];
  const hours = currentDateTime.getHours();
  const minutes = currentDateTime.getMinutes();

  return (
    <div>
      <p>
        {dayOfWeek}, {hours > 12 ? hours - 12 : hours}:
        {minutes < 10 ? '0' + minutes : minutes} {hours >= 12 ? 'PM' : 'AM'}
      </p>
    </div>
  );
};

export default CurrentDateTime;
