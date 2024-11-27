import { useState } from "react";
import { assets } from "../assets/assets";
import { filterObject } from "../store/atoms/filterAndSort";
import Title from "./Title";
import FilterSubComp from "./FilterSubComp";
import FilterPriceRange from "./FilterPriceRange";

const Filter = () => {

    const [showFilter, setShowFilter] = useState(false);


  return (
    <div className='w-full sm:w-1/5 sm:min-w-[165px] flex flex-col gap-[2rem] h-fit sm:sticky sm:top-0'>
        <div className='flex flex-row gap-2 items-center w-fit cursor-pointer sm:cursor-default' onClick={() => { setShowFilter(!showFilter) }}>
        <Title firstName="FILTERS" secondName=""/>
        <img className={`sm:hidden h-3 ${showFilter && 'rotate-90'}`} src={assets.dropdown_icon} alt="dropdown-icon" />
        </div>
        <div className={`flex flex-col gap-[2rem] ${!showFilter && 'hidden'} sm:flex`}>
        {filterObject.map((item, index) => {
            return (
            <FilterSubComp key={index} item={item} />
            )
        })}
        <FilterPriceRange/>
        </div>
  </div>
  )
}

export default Filter