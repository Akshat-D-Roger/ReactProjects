import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { productsAtom } from '../store/atoms/products';
import { assets } from '../assets/assets';
import ProductCard from '../components/ProductCard';
import { filteredItemsAtom, filterObject, selectedFilterAtom, selectedSortAtom, sortedItemsAtom } from '../store/atoms/filterAndSort';
import { useEffect, useRef, useState } from 'react';
import FilterComp from '../components/FilterComp';


const Collections = () => {

  const products = useRecoilValue(productsAtom);
  const firstRender = useRef(true)

  const [showFilter, setShowFilter] = useState(false);

  const selectedFilters = useRecoilValue(selectedFilterAtom);
  const [filteredItems, setFilteredItems] = useRecoilState(filteredItemsAtom);
  const resetFilters = useResetRecoilState(selectedFilterAtom);

  const [selectedSort, setSelectedSort] = useRecoilState(selectedSortAtom)
  const [sortedItems, setSortedItems] = useRecoilState(sortedItemsAtom)
  const resetSort = useResetRecoilState(selectedSortAtom)

  //////////////////////////////////////////////////////////////////////////////////////////////////

  function filterProducts() {
    let tempProducts = products;
    (Object.keys(selectedFilters)).forEach(item => {
      let filterType = item;
      let filterValue = selectedFilters[item];
      if (filterValue.length > 0) {
        tempProducts = tempProducts.filter(product => {
          return filterValue.includes(product[filterType])
        })
      }
    });
    setFilteredItems(tempProducts);
  }

  function sortProducts() {
    let filteredItemsCopy = filteredItems.slice();
    switch (selectedSort) {
      case 'highToLow':
        setSortedItems(filteredItemsCopy.sort((a, b) => (b.price - a.price)))
        break;

      case 'lowToHigh':
        setSortedItems(filteredItemsCopy.sort((a, b) => (a.price - b.price)))
        break;

      default:
        setSortedItems(filteredItemsCopy);
        break;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    return () => { 
      resetFilters(),resetSort() 
    }
  }, [])

  useEffect(() => {
    filterProducts();
  }, [selectedFilters, products])

  useEffect(() => { 
    if(firstRender.current){
      firstRender.current = false;
      return;
    }
    sortProducts();
   }, [selectedSort,filteredItems])

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className='flex flex-col sm:flex-row gap-[1.5rem] sm:gap-[3rem] w-full border-t-[1px] pt-[2rem] mb-[10rem]'>
      {/* --------------------------------------------------------------------------------------------------------------- */}
      {/* filters */}
      <div className='w-full sm:w-1/5 sm:min-w-[165px] flex flex-col gap-[2rem] h-fit sm:sticky sm:top-0'>
        <div className='flex flex-row gap-2 items-center w-fit cursor-pointer sm:cursor-default' onClick={() => { setShowFilter(!showFilter) }}>
          <div className='text-2xl'>FILTERS</div>
          <img className={`sm:hidden h-3 ${showFilter && 'rotate-90'}`} src={assets.dropdown_icon} alt="dropdown-icon" />
        </div>
        <div className={`flex flex-col gap-[2rem] ${!showFilter && 'hidden'} sm:flex`}>
          {filterObject.map((item, index) => {
            return (
              <FilterComp key={index} item={item} />
            )
          })}
        </div>
      </div>
      {/* --------------------------------------------------------------------------------------------------------------- */}
      {/* products */}

      <div className='w-full sm:w-3/4 flex flex-col gap-[3rem]'>
        <div className='w-full flex justify-between items-center gap-1'>
          <div className='flex flex-wrap justify-center items-center gap-2'>
            <div className='text-2xl text-gray-500'>ALL</div>
            <div className='text-2xl'>COLLECTIONS</div>
            <hr className='w-11 border-0 bg-slate-600 h-[2px]' />
          </div>
          <div>
            <select onChange={(e) => { setSelectedSort(e.target.value) }} className="py-2 px-4 text-sm rounded-sm border border-black">
              <option value="relevance">Sort by: relevance</option>
              <option value="lowToHigh">Sort by: low to high</option>
              <option value="highToLow">Sort by: high to low</option>
            </select>
          </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {sortedItems.map(item => (<ProductCard key={item.id} product={item} />))}
        </div>
      </div>


    </div>
  )
}

export default Collections