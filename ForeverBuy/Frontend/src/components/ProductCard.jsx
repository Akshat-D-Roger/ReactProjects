import { useRecoilValue } from 'recoil'
import {currencyAtom} from '../store/atoms/index'
import { NavLink } from 'react-router-dom'

const ProductCard = ({product}) => {

    const currency = useRecoilValue(currencyAtom)

  return (
    <NavLink to={`/product/${product.id}`}>
        <div className='overflow-hidden'>
            <img className="hover:scale-110 transition-all" src={(product.image)[0]} alt="product-image" loading='lazy' />
        </div>
        <div className='text-sm'>{product.name}</div>
        <p className='text-sm'>{`${currency} ${product.price}`}</p>
    </NavLink>
  )
}

export default ProductCard