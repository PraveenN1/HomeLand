import React, { useContext } from 'react';

import CountryDropDown from './CountryDropdown'
import PropertyDropDown from './PropertyDropdown'
import PriceRangeDropDown from './PriceRangeDropdown'

import { BiSearch } from "react-icons/bi";
import { HouseContext } from './HouseContext';
import { housesData } from '../data';

const Search = () => {
  const {houses}=useContext(HouseContext);
  // console.log(houses);

  const {handleClick}=useContext(HouseContext)
  return (
    <div className='px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between items-center g-4 lg:g-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur'>
      <CountryDropDown/>
      <PropertyDropDown/>
      <PriceRangeDropDown/>
      <button onClick={handleClick} className='bg-violet-700 w-full lg:max-w-[150px] text-white flex justify-center items-center h-12 rounded-full text-2xl '>
        <BiSearch/>
      </button>
    </div>
  )
};

export default Search;
