import { bestSellersSelector } from '../store/atoms/products'
import ProductCard from './ProductCard'
import { useRecoilValue } from 'recoil'

const BestSellers = () => {
    const bestSellerProducts = useRecoilValue(bestSellersSelector)

    return (
      <div className='w-full flex flex-col gap-3'>
          <div className='flex flex-wrap justify-center items-center'>
              <div className='text-3xl pr-2 text-gray-500'>BEST</div>
              <div className='text-3xl pr-2'>SELLERS</div>
              <hr className='w-11 border-0 bg-slate-600 h-[2px]'/>
          </div>
          <div className='text-center text-sm text-gray-600 px-[4rem]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quia sed tenetur recusandae ex. Quidem ea quos asperiores, ab molestias .</div>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4'>
              {bestSellerProducts.map(item=>(<ProductCard key={item.id} product={item}/>))}
          </div>
      </div>
    )
} 

export default BestSellers