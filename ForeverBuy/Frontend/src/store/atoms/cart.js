import {atom, selector} from 'recoil'
 
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


export {cartItemsAtom, cartDataSelector}