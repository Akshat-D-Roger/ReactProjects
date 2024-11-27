import {  useState } from 'react'

const ProductMedia = ({product}) => {

const [mainImage, setMainImage] = useState(product.image[0]);

  return (
    <div className="flex flex-col-reverse sm:flex-row flex-1 gap-3">
        <div className={`div1 flex flex-row sm:flex-col w-full sm:w-[23%] justify-between sm:justify-start gap-1.5 sm:gap-3 overflow-x-auto overflow-y-auto`}>
            {product.image.map((image, index) => <img key={index} src={image} alt="product-image" className="w-[20svw] sm:w-full cursor-pointer" onMouseEnter={() => { setMainImage(image) }} />)}
        </div>

        <div className="div2 w-full sm:grow">
            <img src={mainImage} alt="main-image" className="w-full" />
        </div>
    </div>
  )
}

export default ProductMedia