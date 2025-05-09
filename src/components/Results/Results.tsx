import { useState, type ChangeEvent } from "react";
import {
  useFetchAllCountries,
  useFetchCountryByRegion,
} from "../../services/api";
import type { CountryDetails } from "../../types/types";
import { Country } from "../Country/Country";
import { Loader } from "../Loader/Loader";

import "./Results.css";

const REGION_OPTIONS = {
  "": "All",
  Africa: "Africa",
  Americas: "America",
  Asia: "Asia",
  Europe: "Europe",
  Oceania: "Oceania",
};

export const Results = () => {
  const { data, isLoading } = useFetchAllCountries();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const { data: regionData, isLoading: regionLoading } =
    useFetchCountryByRegion(region);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const result = region ? regionData : data;
  const resultLoading = region ? regionLoading : isLoading;

  const filteredCountries = result?.filter((country: CountryDetails) => {
    const countryName = country.name.common.toLowerCase();
    return countryName.includes(searchTerm.toLocaleLowerCase());
  });

  const countriesToDisplay =
    searchTerm.length >= 3 ? filteredCountries : result;

  const handleSetRegion = (e: ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  return (
    <div className="resultsWrapper">
      <div className="searchWrapper">
        <input
          type="text"
          placeholder="Search for a country..."
          className="searchInput"
          onChange={handleSearch}
          value={searchTerm}
        />
        <select value={region} onChange={handleSetRegion} className="select">
          {Object.entries(REGION_OPTIONS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {resultLoading && <Loader />}
      <div className="results">
        {countriesToDisplay?.length === 0 && !resultLoading ? (
          <p className="noResults">No results found</p>
        ) : (
          countriesToDisplay?.map((country: CountryDetails) => (
            <Country key={country.name.common} country={country} />
          ))
        )}
      </div>
    </div>
  );
};
