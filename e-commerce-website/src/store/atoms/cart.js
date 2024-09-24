import {atom, selector} from 'recoil'
import { toast } from 'react-toastify';

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

function addToCart(id, selectedSize, currProduct, setSelectedSize, cartItems, setCartItems){
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
}

function deleteProduct(item, cartItems, setCartItems) {
  let cartItemsCopy = JSON.parse(JSON.stringify(cartItems));
  if (Object.hasOwn(cartItemsCopy, item.id) && Object.hasOwn(cartItemsCopy[item.id], item.size)) {
    //delete item.size key from cartItemsCopy[item.id]
    delete cartItemsCopy[item.id][item.size]
  }
  setCartItems(cartItemsCopy)
}

function itemQuantityHandler(event, id, size, cartItems, setCartItems) {
  let quantity = Math.round(event.target.value);

  if (quantity <= 0) {
    toast.error('Quantity cannot be less than 1');
    quantity = 1; // Reset to 1 if 0 or negative
  }

  let cartItemsCopy = JSON.parse(JSON.stringify(cartItems));
  cartItemsCopy[id][size] = quantity;
  setCartItems(cartItemsCopy);
}


export {cartItemsAtom,addToCart, cartDataSelector, deleteProduct, itemQuantityHandler}