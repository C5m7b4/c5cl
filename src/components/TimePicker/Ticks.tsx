import React from 'react';

const Ticks = () => {
  const buildTick = (index: number) => {
    return React.createElement(
      'div',
      {
        key: index,
        className: 'tick ' + (index % 5 === 0 ? 'big ' : ''),
        style: {
          transform: 'rotate(' + index * 6 + 'deg)',
          WebkitTransform: 'rotate(' + index * 6 + 'deg)',
        },
      },
      React.createElement('div', null)
    );
  };

  const buildTicks = () => {
    const ticks: any[] = [];
    for (var i = 0; i < 60; i++) {
      ticks.push(buildTick(i));
    }
    return ticks;
  };

  return <div className="ticks">{buildTicks()}</div>;
};

export default Ticks;
