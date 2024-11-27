import { useRecoilValue } from 'recoil'
import {currencyAtom} from '../store/atoms/index'
import { NavLink } from 'react-router-dom'

const ProductCard = ({product}) => {

    const currency = useRecoilValue(currencyAtom)

  return (
    <NavLink to={`/product/${product.id}`}>
      <div className={`w-full h-full flex flex-col`}>
        <div className='overflow-hidden h-[80%]'>
            <img className="hover:scale-110 transition-all w-full h-full object-cover" src={(product.image)[0]} alt="product-image" loading='lazy' />
        </div>
        <div className='text-sm leading-4 h-[13%]'>{product.name}</div>
        <p className='text-sm h-[7%]'>{`${currency} ${product.price}`}</p>
      </div>
    </NavLink>
  )
}

export default ProductCard