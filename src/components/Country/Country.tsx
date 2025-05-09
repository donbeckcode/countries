import { Link } from "react-router";
import { useFetchCountriesNamesByCodes } from "../../services/api";
import type { CountryDetails } from "../../types/types";

import "./Country.css";

interface CountryProps {
  country: CountryDetails;
  isSinglePage?: boolean;
}

export const Country = ({ country, isSinglePage = false }: CountryProps) => {
  const { name, flags, population, region, capital, borders } = country;
  const url = isSinglePage ? `/` : `/countries/${name.common}`;
  const urlLabel = isSinglePage ? "Back to home" : "Details";
  const { data } = useFetchCountriesNamesByCodes(borders || []);

  const wrapperClass = isSinglePage ? "countryWrapper wider" : "countryWrapper";

  return (
    <div className={wrapperClass} key={name.common}>
      <img className="flag" src={flags.png} alt={name.common} />
      <h3>{name.common}</h3>
      <p>Population: {population}</p>
      <p>Region: {region}</p>
      <p>Capital: {capital}</p>
      {isSinglePage && (
        <div className="borderCountries">
          <p>Border Countries:</p>
          {data?.map((country: CountryDetails) => {
            return (
              <Link
                to={`/countries/${country.name.common}`}
                key={country.name.common}
              >
                <button className="borderButton">{country.name.common}</button>
              </Link>
            );
          }) || "No borders"}
        </div>
      )}
      <Link to={url}>
        <button>{urlLabel}</button>
      </Link>
    </div>
  );
};
