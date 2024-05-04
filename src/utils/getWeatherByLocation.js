import axios from 'axios';

export const getWeatherByGeolocation = (
  setWeather,
  setError,
  setLoading,
  apikey
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apikey}&units=metric`
          )
          .then((response) => {
            setWeather(response.data);
          })
          .catch((error) => {
            setError('Failed to fetch weather data for your location');
            console.error(error);
          })
          .finally(() => setLoading(false));
      },
      () => {
        setError('Geolocation is not supported or permission denied');
        setLoading(false);
      }
    );
  } else {
    setError('Geolocation is not supported by this browser.');
  }
};

export const fetchWeather = async (loc, setWeather, apikey) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=${apikey}&units=metric`
    );
    setWeather(response.data);
  } catch (err) {
    throw new Error(err);
  }
};
