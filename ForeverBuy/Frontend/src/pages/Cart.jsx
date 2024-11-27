import { cartDataSelector, cartItemsAtom } from "../store/atoms/cart"
import { deleteProduct, itemQuantityHandler } from "../store/cartChanges";
import { useRecoilState, useRecoilValue } from "recoil"
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { NavLink } from "react-router-dom";
import { isLoginAtom, tokenAtom } from "../store/atoms/isLogin";
import Title from "../components/Title";

const Cart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const {allItems, length} = useRecoilValue(cartDataSelector);
  const isLogin = useRecoilValue(isLoginAtom)
  const token = useRecoilValue(tokenAtom)

  return (
    <div className="w-full border-t-[1px] pt-[2rem] mb-[10rem] flex flex-col gap-[5rem]">
      <div className="flex flex-col gap-[2rem]">
        <div>
          <Title firstName="YOUR" secondName="CART"/>
        </div>
        <div className="flex flex-col">
          {allItems.map((item, index) => {
            return (
              <div key={index} className="flex flex-row py-4 border-y justify-between items-center">
                <div className="flex flex-row gap-6 w-2/5">
                  <div className="shrink-0"><img src={item.image} alt='product-image' className="w-20" /></div>
                  <div className="flex flex-col gap-4">
                    <div className="text-xs sm:text-lg">{item.name}</div>
                    <div className="flex flex-row gap-4 items-center">
                      <div>${item.price}</div>
                      <div className="border p-2 py-1">{item.size}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <input type="number" value={item.quantity} min={1} step={1} onChange={(e) => { itemQuantityHandler(e, item.id, item.size, cartItems, setCartItems, isLogin, token) }} className="w-10 border outline-none" />
                </div>
                <div>
                  <button onClick={() => { deleteProduct(item, cartItems, setCartItems, isLogin, token) }}>
                    <img src={assets.bin_icon} alt="delete-button" className="w-5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {length>0 && <div className="w-full flex justify-end">
        <div className="w-full sm:w-2/5 flex flex-col gap-10">
          <CartTotal/> 
          <NavLink to="/place-order" className="p-2 px-4 bg-black text-white text-center w-full">Proceed To Checkout</NavLink>
        </div>
      </div>}
    </div>
  )
}

export default Cart