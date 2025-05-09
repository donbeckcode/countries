import { useParams } from "react-router";
import { useFetchCountryByName } from "../../services/api";
import { Country } from "../../components/Country/Country";
import { Loader } from "../../components/Loader/Loader";
import { Header } from "../../components/Header/Header";

import "./CountryDetails.css";

export const CountryDetails = () => {
  const name = useParams<{ name: string }>().name || "";
  const { data, isLoading } = useFetchCountryByName(name);

  return (
    <>
      <Header />
      <div className="countryDetailsWrapper">
        {isLoading ? <Loader /> : <Country isSinglePage country={data[0]} />}
      </div>
    </>
  );
};

//     return <p>Loading...</p>;
//   }
//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }
//   if (!data) {
//     return <p>No data</p>;
//   }
//   const country = data[0];
//   const { name, flags, population, region, capital } = country;
//   const nativeName = Object.values(name.nativeName)[0].common;
//   const currencies = Object.values(country.currencies).map(
//     (currency) => currency.name
//   );
//   const languages = Object.values(country.languages).join(", ");
//   const tld = country.tld.join(", ");
//   const subregion = country.subregion;
//   const borders = country.borders
//     ? country.borders.join(", ")
//     : "No borders";
