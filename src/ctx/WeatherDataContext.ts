import { createContext, useContext } from 'react';

export const WeatherDataContext = createContext({
    name: null,
    now: null,
    day: null,
    week: null,
})

export const useWeatherData = () => {
    const weatherData = useContext(WeatherDataContext);
    return weatherData;
}
