import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { productsAtom } from "../store/atoms/products";
import ProductMedia from "../components/ProductMedia";
import ProductInformation from "../components/ProductInformation";
import ProductFooter from "../components/ProductFooter"

const Product = () => {

  const params = useParams();
  const { productId } = params;
  const products = useRecoilValue(productsAtom)
  const [currProduct, setCurrProduct] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);

    if(products.length===0)
    return;

    const product = products.find((item) => item.id === productId);
    if (!product) {
      console.error('no product found')
    }
    else {
      setCurrProduct(product);
    }

    setLoading(false);
  }, [productId, products])

  if(loading){
    return(
      <div className='flex gap-x-2 justify-center items-center h-full w-full'>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
      </div>
    )
  }
  if(!currProduct){
    return(
      <div className="w-full h-full flex items-center justify-center">
        Sorry, Product not found....
      </div>
    )
  }

  return (
    <div className="w-full border-t-[1px] pt-[2rem] mb-[10rem] flex flex-col gap-[3rem]">
      <div className="flex flex-col sm:flex-row gap-[1rem] w-full">
        <ProductMedia product={currProduct}/>
        <ProductInformation product={currProduct}/>
      </div>
      <ProductFooter/>
    </div>
  )
  /* {relatedProducts &&
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
  } */
}

export default Product