//npm i axios
import axios, { AxiosError } from "axios";
//npm i zod
import { z } from "zod";
//npm i valibot
//import { object, string, number, InferOutput, parse } from "valibot";
import { Search } from "../types";
import { useMemo, useState } from "react";

//zod weather schema validation
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    humidity: z.number(),
  }),
});

export type Weather = z.infer<typeof Weather>;

//valibot weather type validation
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_min: number(),
//     temp_max: number(),
//     humidity: number(),
//   }),
// });

// type Weather = InferOutput<typeof WeatherSchema>;

const initialState = {
  name: "",
  main: {
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
  },
};

export default function useSearch() {
  const [weather, setWeather] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false)

  const fetchData = async (search: Search) => {
    const { city, country } = search;
    //Loading my api key from .env
    const apiKey = import.meta.env.VITE_API_KEY;
    //Loading the spinner
    setLoading(true);
    //reset the state every time we make a new search
    setWeather(initialState);
    
    try {
      const geourl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
      const { data } = await axios(geourl);
      
      //zod data
      const result = Weather.safeParse(data);
      if (result.success) {
        setWeather(result.data);
      }

      //valibot data
      // const result = parse(WeatherSchema, data);
      // console.log(result);

      //   const lat = data.coord.lat
      //   const lon = data.coord.lon

      //   const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      //   const dataWeather = await axios(weather);
      //   console.log(dataWeather);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          setNotFound(true);
        }
      }
      
      
    } finally {
      setLoading(false);
    }
  };

  //Validate if there is data
  const isWeatherData = useMemo(() => weather.name, [weather]);
  return {
    //exports
    loading,
    notFound,
    weather,
    isWeatherData,
    fetchData,
  };
}
