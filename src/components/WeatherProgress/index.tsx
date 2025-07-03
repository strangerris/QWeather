import React from 'react';

interface WeatherProgressProps {
  minTemp: number;
  maxTemp: number;
  dayMin: number;
  dayMax: number;
  currentTemp?: number;
  isToday?: boolean;
}

const WeatherProgress: React.FC<WeatherProgressProps> = ({ minTemp, maxTemp, dayMin, dayMax, currentTemp, isToday }) => {
  const rangeWidth = ((dayMax - dayMin) / (maxTemp - minTemp)) * 100;
  const startOffset = ((dayMin - minTemp) / (maxTemp - minTemp)) * 100;
  const currentOffset = currentTemp ? ((currentTemp - minTemp) / (maxTemp - minTemp)) * 100 : 0;

  const clampTemp = (temp: number) => {
    return Math.min(Math.max(temp, -20), 50);
  };

  const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  const getGradient = (temp: number) => {
    const clampedTemp = clampTemp(temp);
    const tempPoints = [-20, -10, 0, 10, 20, 30, 40, 50];
    const colorPoints = ['#9FD097', '#A0D298', '#B0E3A9', '#C0F4BA', '#F1CE43', '#FFA527', '#FF8027', '#FF6527'];

    let index = 0;
    while (index < tempPoints.length - 1 && clampedTemp > tempPoints[index + 1]) {
      index++;
    }

    const startTemp = tempPoints[index];
    const endTemp = tempPoints[index + 1];
    const ratio = (clampedTemp - startTemp) / (endTemp - startTemp);

    const startRgb = hexToRgb(colorPoints[index]);
    const endRgb = hexToRgb(colorPoints[index + 1]);

    const r = Math.round(startRgb[0] + (endRgb[0] - startRgb[0]) * ratio);
    const g = Math.round(startRgb[1] + (endRgb[1] - startRgb[1]) * ratio);
    const b = Math.round(startRgb[2] + (endRgb[2] - startRgb[2]) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div style={{ position: 'relative', height: '10px', backgroundColor: '#ccc', borderRadius: '10px', width: '100%' }}>
      <div
        style={{
          position: 'absolute',
          left: `${startOffset}%`,
          width: `${rangeWidth}%`,
          height: '100%',
          background: `linear-gradient(to right, ${getGradient(dayMin)}, ${getGradient(dayMax)})`,
          borderRadius: '10px'
        }}
      />
      {isToday && currentTemp && (
        <div
          style={{
            position: 'absolute',
            left: `${currentOffset}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
            backgroundColor: 'white',
            borderRadius: '50%'
          }}
        />
      )}
    </div>
  );
};

export default WeatherProgress;