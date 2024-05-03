import React from 'react';

const ArrowIcon = ({ deg }) => {
  const style = {
    transform: `rotate(${deg}deg)`,
  };

  return (
    <div className="arrow-icon" style={style}>
      &#8594;
    </div>
  );
};

export default ArrowIcon;
