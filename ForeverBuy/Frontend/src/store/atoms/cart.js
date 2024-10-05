import {atom, selector} from 'recoil'
import { toast } from 'react-toastify';
import axios from 'axios'
 
const cartItemsAtom = atom({
    key:'cartItemsAtom',
    default:{}
})

const cartDataSelector = selector({
  key:'cartDataSelector',
  get:({get})=>{
    let cartItems = get(cartItemsAtom);
    let cartData = [];
    let price = 0;
    let length = 0;
    Object.keys(cartItems).forEach(id=>{
      let productDetails = cartItems[id].productDetails;
      Object.keys(cartItems[id]).forEach(size=>{
        if(size!=='productDetails'){
          cartData.push({name:productDetails.name, image:(productDetails.image)[0], price: productDetails.price, size, quantity:cartItems[id][size], id});
          price+=(productDetails.price*cartItems[id][size]);
          length+=cartItems[id][size];
        }
      })
    })
    return({allItems: cartData, price, length})
  }
})

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
  if(isLogin){
    try{
      let res = await axios.put('http://localhost:4000/api/cart/update', {data:{cartItems:cartItemsCopy}},{headers:{token}});
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
  setCartItems(cartItemsCopy);
  setSelectedSize('');
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
  if(isLogin){
    try{
      let res = await axios.put('http://localhost:4000/api/cart/update', {data:{cartItems:cartItemsCopy}},{headers:{token}});
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
  setCartItems(cartItemsCopy)
}

async function itemQuantityHandler(event, id, size, cartItems, setCartItems, isLogin, token) {
  let quantity = Math.round(event.target.value);

  if (quantity <= 0) {
    toast.error('Quantity cannot be less than 1');
    quantity = 1; // Reset to 1 if 0 or negative
  }

  let cartItemsCopy = JSON.parse(JSON.stringify(cartItems));
  cartItemsCopy[id][size] = quantity;
  if(isLogin){
    try{
      let res = await axios.put('http://localhost:4000/api/cart/update', {data:{cartItems:cartItemsCopy}},{headers:{token}});
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
  setCartItems(cartItemsCopy);
}


export {cartItemsAtom,addToCart, cartDataSelector, deleteProduct, itemQuantityHandler}