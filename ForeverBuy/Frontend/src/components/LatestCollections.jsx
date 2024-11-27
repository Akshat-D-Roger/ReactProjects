import { useRecoilValue } from 'recoil'
import { latestProductsSelector } from '../store/atoms/products'
import ProductCard from './ProductCard'
import Title from './Title'

const LatestCollections = () => {

  const latestProducts = useRecoilValue(latestProductsSelector);

  if(latestProducts.length===0){
    return(
      <div className='flex gap-x-2 justify-center items-center h-full w-full'>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
    </div>
  )
  }

  return (
    <div className='w-full flex flex-col gap-3'>
      <div className='flex justify-center'>
        <Title firstName='LATEST' secondName='COLLECTION'/>
      </div>
        <div className='text-center text-sm text-gray-600 px-[4rem]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quia sed tenetur recusandae ex. Quidem ea quos asperiores, ab molestias .</div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4'>
          {latestProducts.map(item=>(<ProductCard key={item.id} product={item}/>))}
        </div>
    </div>
  )
}

export default LatestCollections