import { useQuery } from "@tanstack/react-query";
import type { CountryDetails } from "../types/types";

const API_URL = "https://restcountries.com/v3.1";

const fetchAllCountries = async () => {
  try {
    const response = await fetch(`${API_URL}/all`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

const fetchCountryByName = async (name: string) => {
  const response = await fetch(`${API_URL}/name/${name}`);
  const data = await response.json();
  return data;
};

const fetchCountryByRegion = async (region: string) => {
  const response = await fetch(`${API_URL}/region/${region}`);
  const data = await response.json();
  return data;
};

const fetchCountriesNamesByCodes = async (codes: string[]) => {
  const response = await fetch(`${API_URL}/alpha?codes=${codes.join(",")}`);
  const data = await response.json();
  return data;
};

export const useFetchAllCountries = () => {
  return useQuery<CountryDetails[]>({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
    staleTime: 1000 * 60 * 5,
  });
};

export const useFetchCountryByName = (name: string) => {
  return useQuery<CountryDetails>({
    queryKey: ["country", name],
    queryFn: () => fetchCountryByName(name),
  });
};

export const useFetchCountriesNamesByCodes = (names: string[]) => {
  return useQuery<CountryDetails[]>({
    queryKey: ["countryNamesByCodes", names],
    queryFn: () => fetchCountriesNamesByCodes(names),
    enabled: !!names.length,
  });
};

export const useFetchCountryByRegion = (region: string) => {
  return useQuery<CountryDetails[]>({
    queryKey: ["countriesByRegion", region],
    queryFn: () => fetchCountryByRegion(region),
    enabled: !!region,
  });
};
