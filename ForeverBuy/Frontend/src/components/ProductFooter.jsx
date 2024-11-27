const ProductFooter = () => {
  return (
    <div>
        <div className="flex flex-row w-full sm:w-auto">
          <div className={`p-2 px-4 text-sm font-semibold border w-[50%] sm:w-auto text-center`}>Description</div>
          <div className={`p-2 px-4 text-sm border w-[50%] sm:w-auto text-center`}>Reviews(122)</div>
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
  )
}

export default ProductFooter