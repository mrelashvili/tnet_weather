import React from 'react';

const ArrowIcon = ({ deg }) => {
  const style = {
    transform: `rotate(${deg}deg)`,
  };

  return (
    <div className="arrow-icon text-red-600 font-bold" style={style}>
      &#8594;
    </div>
  );
};

export default ArrowIcon;
