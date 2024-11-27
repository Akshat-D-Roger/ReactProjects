import { useState } from 'react'
import { assets } from '../assets/assets';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currencyAtom } from '../store/atoms';
import { addToCart } from '../store/cartChanges';
import { cartItemsAtom } from '../store/atoms/cart';
import { isLoginAtom, tokenAtom } from '../store/atoms/isLogin';

const ProductInformation = ({product}) => {
    const [selectedSize, setSelectedSize] = useState('');
    const currency = useRecoilValue(currencyAtom);
    const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
    const isLogin = useRecoilValue(isLoginAtom);
    const token = useRecoilValue(tokenAtom);

    function addToCartHandler(){
      addToCart(product.id, selectedSize, product, setSelectedSize, cartItems, setCartItems, isLogin, token);
    }

  return (
    <div className={`flex-1 sm:pt-[1rem] flex flex-col gap-[1rem] sm:ml-[2rem]}`}>
        <div className="font-medium text-2xl">{product.name}</div>
        <div className="flex flex-row items-center">
            {[...Array(4)].map((_, index) => (<img key={index} src={assets.star_icon} className="w-[15px] h-[15px]" />))}
            <img className="w-[15px] h-[15px]" src={assets.star_dull_icon} />
            <div className="ml-[1rem] text-sm">(122)</div>
        </div>
        <div className="font-medium text-2xl">{`${currency} ${product.price}`}</div>
        <div className="text-gray-500 text-md md:w-4/5">{product.description}</div>
        <div className="flex flex-row items-center pt-[1.5rem]">
            <div>Select Size</div>
            <div className="ml-[2rem] flex flex-row gap-2">
                {product.sizes.map((size, index) => (<button key={index} className={`p-2 text-l border bg-gray-300 px-4 text-black ${selectedSize === size && "border-red-500"} `} onClick={() => (setSelectedSize(size))}>{size}</button>))}
            </div>
        </div>
        <div className="mt-[1rem]">
          <button className="bg-black text-white border border-gray-200 p-3 px-8" onClick={() => { addToCartHandler() }}>Add to Cart</button>
        </div>
        <div className="border-t-2 mt-[1rem]"></div>
        <div className="flex flex-col text-sm gap-1 text-gray-500 mt-[1rem]">
          <div>100% Original product.</div>
          <div>Cash on delivery is available on this product.</div>
          <div>Easy return and exchange policy within 7 days.</div>
        </div>
  </div>
  )
}

export default ProductInformation