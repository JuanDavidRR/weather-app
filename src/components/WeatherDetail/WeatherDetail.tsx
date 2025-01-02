import { Weather } from "../../hooks/useSearch";
import { formatTemperature } from "../../utils/formatTemperature";

import styles from "./WeatherDetail.module.css";

type WeatherDetailProps = {
  weather: Weather;
};

function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <section className={styles.container}>
      <h3>Weather details</h3>
      <h2>{weather.name}</h2>
      <p className={styles.current}>
        {formatTemperature(weather.main.temp)}&deg;C
      </p>
      <div className={styles.temperatures}>
        <p>
          Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span>
        </p>
        <p>
          Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span>
        </p>
      </div>
    </section>
  );
}

export default WeatherDetail;
