import { useRecoilValue } from 'recoil'
import { latestProductsSelector } from '../store/atoms/products'
import ProductCard from './ProductCard'

const LatestCollections = () => {

    const latestProducts = useRecoilValue(latestProductsSelector)

  return (
    <div className='w-full flex flex-col gap-3'>
        <div className='flex flex-wrap justify-center items-center'>
            <div className='text-3xl pr-2 text-gray-500'>LATEST</div>
            <div className='text-3xl pr-2'>COLLECTIONS</div>
            <hr className='w-11 border-0 bg-slate-600 h-[2px]'/>
        </div>
        {/* <Title text1="LATEST" text2="COLLECTIONS"/> */}
        <div className='text-center text-sm text-gray-600 px-[4rem]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quia sed tenetur recusandae ex. Quidem ea quos asperiores, ab molestias .</div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4'>
            {latestProducts.map(item=>(<ProductCard key={item.id} product={item}/>))}
        </div>
    </div>
  )
}

export default LatestCollections