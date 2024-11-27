import { useState } from "react"
import { assets } from "../assets/assets"
import CartTotal from "../components/CartTotal"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { cartDataSelector, cartItemsAtom } from "../store/atoms/cart";
import { ordersAtom } from "../store/atoms/orders";

const PlaceOrder = () => {

  const [paymentMethod, setPaymentMethod] = useState(2);
  const navigate = useNavigate();
  const cart = useRecoilValue(cartDataSelector);
  const setOrders = useSetRecoilState(ordersAtom)
  const resetCartItems = useResetRecoilState(cartItemsAtom)


  function paymentMethodHandler(value)
  {
    if(value===0 || value===1){
      if(value===0){
        toast.error('stripe is disabled!. Please use COD')
      }
      else{
        toast.error('razorpay is disabled!. Please use COD')
      }
      return;
    }
    setPaymentMethod(value);
  }

  function onSubmitHandler(e){
    e.preventDefault();
    console.log('submitted');
    setOrders(prev=>[...prev, ...(cart.allItems)]);
    resetCartItems();
    navigate("/orders")
  }

  if(cart.length < 1){
    return(<div>no items in cart</div>)
  }

  return (
      <form className="w-full border-t-[1px] pt-[2rem] mb-[10rem] flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-5" onSubmit={(e)=>onSubmitHandler(e)}>
      <div className="flex flex-col gap-6 w-full sm:max-w-[480px] sm:min-w-[350px]">
        <div className='flex flex-wrap items-center gap-2'>
          <div className='text-3xl text-gray-500'>DELIVERY</div>
          <div className='text-3xl'>INFORMATION</div>
          <hr className='w-11 border-0 bg-slate-600 h-[2px]' />
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3 w-full">
            <input className="border rounded-md p-2 px-3" required type="text" placeholder="First Name" name="first-name"/>
            <input className="border rounded-md p-2 px-3" required type="text" placeholder="Last Name" name="last-name"/>
          </div>
          <div>
            <input className="border rounded-md p-2 px-3 w-full" required name="email" type="email" placeholder="Email" />
          </div>
          <div>
            <input className="border rounded-md p-2 px-3 w-full" required name="street" type="text" placeholder="Street" />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <input className="border rounded-md p-2 px-3" required type="text" placeholder="City" name="city"/>
            <input className="border rounded-md p-2 px-3" required type="text" placeholder="State" name="state"/>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <input className="border rounded-md p-2 px-3" required type="number" placeholder="Zipcode" name="zipcode"/>
            <input className="border rounded-md p-2 px-3" required type="text" placeholder="Country" name="country"/>
          </div>
          <div>
            <input className="border rounded-md p-2 px-3 w-full" required name="phone" type="number" placeholder="Phone (+91)" />
          </div>
        </div>


      </div>
      <div className="w-full sm:w-2/5 sm:min-w-[200px] flex flex-col gap-10">
        <CartTotal/>
        <div className="flex flex-col gap-2">
          <div className='flex flex-wrap items-center gap-2'>
            <div className='text-xl text-gray-500'>PAYMENT</div>
            <div className='text-xl'>METHOD</div>
            <hr className='w-11 border-0 bg-slate-600 h-[2px]' />
          </div>
          <div className="flex flex-col gap-3">
            <label className="flex flex-row gap-6 items-center border p-2 pr-6">
              <input checked={paymentMethod===0} onChange={()=>paymentMethodHandler(0)} type="radio" name="payment-method" />
                <img src={assets.stripe_logo} alt="stripe" className="w-12" />
            </label>
            <label className="flex flex-row gap-6 items-center border p-2 pr-6">
              <input checked={paymentMethod===1} onChange={()=>paymentMethodHandler(1)} type="radio" name="payment-method" />
                <img src={assets.razorpay_logo} alt="razorpay" className="w-12"/>
            </label>
            <label className="flex flex-row gap-6 items-center border p-2 pr-6">
              <input checked={paymentMethod===2} onChange={()=>paymentMethodHandler(2)} type="radio" name="payment-method" />
                <div>CASH ON DELIVERY</div>
            </label>
          </div>
        </div>
        <button type="submit" className="bg-black w-full text-white text-center p-3">Place Order</button>
      </div>
    </form>
  )
}

export default PlaceOrder