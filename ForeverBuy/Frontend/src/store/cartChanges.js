import { toast } from "react-toastify";
import axios from "axios";

async function addToCart(id, selectedSize, currProduct, setSelectedSize, cartItems, setCartItems, isLogin, token){
    if(!selectedSize){
      toast.error('Please select a size')
      return;
    }
    let cartItemsCopy = JSON.parse(JSON.stringify(cartItems))
    if(cartItemsCopy[id]){
      if(cartItemsCopy[id][selectedSize])
        cartItemsCopy[id][selectedSize]+=1;
      else
      cartItemsCopy[id][selectedSize] = 1;
    }
    else{
      cartItemsCopy[id] = {};
      cartItemsCopy[id][selectedSize] = 1;
      (cartItemsCopy[id]).productDetails = currProduct;
    }
    setCartItems(cartItemsCopy);
    setSelectedSize('');
    if(isLogin){
      try{
        let res = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/cart/update`, {data:{cartItems:cartItemsCopy}},{headers:{token}});
        if(!res.data.success){
          toast.error(res.data.message);
          return;
        }
      }
      catch(err){
        toast.error(err);
        return;
      }
    }
  }
  
  async function deleteProduct(item, cartItems, setCartItems, isLogin, token) {
    let cartItemsCopy = JSON.parse(JSON.stringify(cartItems));
    if (Object.hasOwn(cartItemsCopy, item.id) && Object.hasOwn(cartItemsCopy[item.id], item.size)) {
      //delete item.size key from cartItemsCopy[item.id]
      delete cartItemsCopy[item.id][item.size]
    }
    if(Object.keys(cartItemsCopy[item.id]).length===1){
      delete cartItemsCopy[item.id];
    }
    setCartItems(cartItemsCopy)
    if(isLogin){
      try{
        let res = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/cart/update`, {data:{cartItems:cartItemsCopy}},{headers:{token}});
        if(!res.data.success){
          toast.error(res.data.message);
          return;
        }
      }
      catch(err){
        toast.error(err);
        return;
      }
    }
  }
  
  async function itemQuantityHandler(event, id, size, cartItems, setCartItems, isLogin, token) {
    let quantity = Math.round(event.target.value);
  
    if (quantity <= 0) {
      toast.error('Quantity cannot be less than 1');
      quantity = 1; // Reset to 1 if 0 or negative
    }
  
    let cartItemsCopy = JSON.parse(JSON.stringify(cartItems));
    cartItemsCopy[id][size] = quantity;
    setCartItems(cartItemsCopy);
    if(isLogin){
      try{
        let res = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/cart/update`, {data:{cartItems:cartItemsCopy}},{headers:{token}});
        if(!res.data.success){
          toast.error(res.data.message);
          return;
        }
      }
      catch(err){
        toast.error(err);
        return;
      }
    }
  }

  export {addToCart, deleteProduct, itemQuantityHandler}