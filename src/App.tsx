import styles from "./App.module.css";
import Alert from "./components/Alert/Alert";
import Form from "./components/Form/Form";
import Spiner from "./components/Spinner/Spiner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useSearch from "./hooks/useSearch";
function App() {
  const { loading, notFound, weather, isWeatherData, fetchData } = useSearch();
  return (
    <>
      <h1 className={styles.title}>Weather app</h1>
      <section className={styles.container}>
        {/* Column 1 */}
        <Form fetchData={fetchData} />
        {/* column 2 */}
        {loading && <Spiner />}
        {notFound ? (
          <Alert alert="City has not been found" />
        ) : (
          isWeatherData && <WeatherDetail weather={weather} />
        )}
      </section>
    </>
  );
}

export default App;
