import axios from 'axios';

const DEFAULT_LOCATION = 'Tbilisi';
const ERROR_MESSAGES = {
  INVALID_CITY: 'Enter a valid city',
  FETCH_FAILED: 'Failed to fetch weather',
};

export const getWeatherByGeolocation = async (
  setWeather,
  setError,
  setLoading,
  apikey
) => {
  setLoading(true);

  try {
    if (navigator.geolocation) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apikey}&units=metric`
      );
      setWeather(response.data);
    } else {
      setError('Geolocation is not supported by this browser.');
      const data = await fetchWeather(DEFAULT_LOCATION, apikey);
      setWeather(data);
    }
  } catch (error) {
    const data = await fetchWeather(DEFAULT_LOCATION, apikey);
    setWeather(data);
  } finally {
    setLoading(false);
  }
};

export const fetchWeather = async (loc, apikey) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=${apikey}&units=metric`
    );
    return response.data;
  } catch (err) {
    return { error: ERROR_MESSAGES.FETCH_FAILED };
  }
};
