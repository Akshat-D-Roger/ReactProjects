import { useParams } from "react-router-dom"
import { assets } from "../assets/assets";
import { useEffect, useState } from "react";
import { currencyAtom } from "../store/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { productsAtom } from "../store/atoms/products";
import ProductCard from "../components/ProductCard";
import { cartItemsAtom, addToCart } from "../store/atoms/cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isLoginAtom, tokenAtom } from "../store/atoms/isLogin";

const Product = () => {

  const params = useParams();
  const { productId } = params;
  const products = useRecoilValue(productsAtom)
  const [currProduct, setCurrProduct] = useState('');
  const [mainImage, setMainImage] = useState('');
  const currency = useRecoilValue(currencyAtom);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const token = useRecoilValue(tokenAtom)

  useEffect(() => {
    let product = products.find(item => item.id === productId);
    if (!product) {
      console.error('no product found')
    }
    else {
      setCurrProduct(product);
      setMainImage((product.image)[0])
      function findRelatedProducts() {
        setRelatedProducts(products.filter(item => { return item.category === product.category && item.subCategory === product.subCategory }))
      }
      findRelatedProducts();
    }
  }, [productId, products])

  if (!currProduct) {
    return (<div>product not found</div>)
  }

  return (
    <div className="w-full border-t-[1px] pt-[2rem] mb-[10rem] flex flex-col gap-[3rem]">
      <div className="flex flex-col sm:flex-row gap-[1rem] w-full">

        <div className="flex flex-col-reverse sm:flex-row flex-1 gap-3">
          <div className={`div1 flex flex-row sm:flex-col w-full sm:w-[23%] justify-between sm:justify-start gap-1.5 sm:gap-3 overflow-x-auto overflow-y-auto`}>
            {currProduct.image.map((image, index) => <img key={index} src={image} alt="product-image" className="w-[20svw] sm:w-full cursor-pointer" onClick={() => { setMainImage(image) }} />)}
          </div>
          <div className="div2 w-full sm:grow">
            <img src={mainImage} alt="main-image" className="w-full" />
          </div>
        </div>

        <div className="flex-1 sm:pt-[1rem] flex flex-col gap-[1rem] sm:ml-[2rem]">
          <div className="font-medium text-2xl">{currProduct.name}</div>
          <div className="flex flex-row items-center">
            {[...Array(4)].map((_, index) => (<img key={index} src={assets.star_icon} className="w-[15px] h-[15px]" />))}
            <img className="w-[15px] h-[15px]" src={assets.star_dull_icon} />
            <div className="ml-[1rem] text-sm">(122)</div>
          </div>
          <div className="font-medium text-2xl">{`${currency} ${currProduct.price}`}</div>
          <div className="text-gray-500 text-md md:w-4/5">{currProduct.description}</div>
          <div className="flex flex-row items-center pt-[1.5rem]">
            <div>Select Size</div>
            <div className="ml-[2rem] flex flex-row gap-2">
              {currProduct.sizes.map((size, index) => (<button key={index} className={`p-2 text-l border bg-gray-300 px-4 ${selectedSize === size && "border-red-500"} `} onClick={() => (setSelectedSize(size))}>{size}</button>))}
            </div>
          </div>
          <div className="mt-[1rem]">
            <button className="bg-black text-white border border-gray-200 p-3 px-8" onClick={() => { addToCart(productId, selectedSize, currProduct, setSelectedSize, cartItems, setCartItems, isLogin, token) }}>Add to Cart</button>
            <ToastContainer />
          </div>
          <div className="border-t-2 mt-[1rem]"></div>
          <div className="flex flex-col text-sm gap-1 text-gray-500 mt-[1rem]">
            <div>100% Original product.</div>
            <div>Cash on delivery is available on this product.</div>
            <div>Easy return and exchange policy within 7 days.</div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-row w-full sm:w-auto">
          <div className="p-2 px-4 text-sm font-semibold border w-[50%] sm:w-auto text-center">Description</div>
          <div className="p-2 px-4 text-sm border w-[50%] sm:w-auto text-center">Reviews(122)</div>
        </div>
        <div className="p-7 px-4 border text-sm text-gray-500 flex flex-col gap-5">
          <div>
            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
          </div>
          <div>
            E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
          </div>
        </div>
      </div>

      {relatedProducts &&
        <div className="sm:mt-[5rem]">
          <div className='flex flex-wrap justify-center items-center gap-2'>
            <div className='text-3xl text-gray-500'>RELATED</div>
            <div className='text-3xl'>PRODUCTS</div>
            <hr className='w-11 border-0 bg-slate-600 h-[2px]' />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6 mt-[2rem]">
            {(relatedProducts.slice(0, 5)).map((item, index) => {
              return <ProductCard key={index} product={item} />
            })}
          </div>
        </div>
      }
    </div>
  )
}

export default Product