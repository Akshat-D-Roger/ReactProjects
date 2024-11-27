import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';
import Title from '../components/Title';
import Sort from '../components/Sort';
import Search from '../components/Search';
import { useCollection } from '../store/hooks/useCollection';
import { useEffect, useState } from 'react';


const Collections = () => {

  const {sortedItems} = useCollection();
  const loadSize = 20;
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(()=>{
    //if loadsize is greater than allItemsSize , then slice works only till last item in array
    setDisplayItems(sortedItems.slice(0,loadSize))
  }, [sortedItems])

  function loadMoreHandler(){
    setDisplayItems(prev=>[...prev, ...sortedItems.slice(displayItems.length, displayItems.length+loadSize)])
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className='w-full pt-[2rem] mb-[10rem]'>
      <div className='w-full'>
        <Search></Search>
      </div>
      <div className='flex flex-col sm:flex-row gap-[1.5rem] sm:gap-[3rem]'>
        <Filter/>
        <div className='w-full sm:w-3/4 flex flex-col gap-[3rem]'>
          <div className='w-full flex flex-wrap sm:flex-nowrap justify-between items-center gap-1 gap-y-[1rem]'>
            <Title firstName='ALL' secondName='COLLECTION'/>
            <Sort/>
          </div>
          {/* products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-7'>
            {displayItems.map(item => (<ProductCard key={item.id} product={item} />))}
          </div>
          <div className='flex justify-center'>
            <button disabled={displayItems.length===sortedItems.length} className='border-2 border-black p-2 bg-pink-200 disabled:bg-[#cccccc] disabled:text-[#666666] disabled:border-[#999999]' onClick={loadMoreHandler}>load more</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collections