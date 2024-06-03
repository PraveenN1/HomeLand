import React, { useState, useEffect, createContext } from 'react';
import { housesData } from '../data.js';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Price range (any)');
  const [loading, setLoading] = useState(false);

  // Return all countries
  useEffect(() => {
    const allCountries = new Set(houses.map((house) => house.country));
    setCountries(['Location (any)', ...allCountries].sort());
  }, [houses]);

  // Return all property types
  useEffect(() => {
    const allProperties = new Set(houses.map((house) => house.type));
    setProperties(['Property type (any)', ...allProperties].sort());
  }, [houses]);

  const handleClick = () => {
    setLoading(true);

    // Function to check if the value is "(any)" or "any"
    const checkAny = (string) => {
      return typeof string === 'string' && (string.includes('(any)') || string.includes('any'));
    };

    // Default price range
    const defaultPriceRange = '0 1000000';

    // Parsing price range
    const priceRange = price && !checkAny(price) ? price : defaultPriceRange;
    const [minPrice, maxPrice] = priceRange
      .split(' ')
      .filter((value) => !isNaN(value))
      .map(Number);

    const filteredHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      // All filters are default
      if (checkAny(country) && checkAny(property) && checkAny(price)) {
        return true;
      }

      // Apply filters
      if (!checkAny(country) && house.country !== country) {
        return false;
      }

      if (!checkAny(property) && house.type !== property) {
        return false;
      }

      if (!checkAny(price) && (housePrice < minPrice || housePrice > maxPrice)) {
        return false;
      }

      return true;
    });

    console.log("Filtered Houses:", filteredHouses);

    // Display the filtered houses
    setTimeout(() => {
      setHouses(filteredHouses);
      setLoading(false);
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        houses,
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        loading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
