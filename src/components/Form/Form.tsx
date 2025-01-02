import styles from "./Form.module.css";
import { countries } from "../../data/countries";
import React, { useState } from "react";
import { Search } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
  fetchData: (search: Search) => void;
};

function Form({ fetchData }: FormProps) {
  const [search, setWeather] = useState<Search>({
    city: "",
    country: "",
  });

  const [alert, setAlert] = useState("");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    //storing the data in our state
    setWeather({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Validate if one of the fields is empty
    if (Object.values(search).includes("")) {
      setAlert("All fields are required");
      return;
    }
    fetchData(search);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {alert && <Alert alert={alert} />}
      <div className={styles.field}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="City"
          value={search.city}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Country</label>
        <select
          name="country"
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">-- Select a country --</option>

          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input className={styles.submit} type="submit" value="Get weather" />
    </form>
  );
}

export default Form;
