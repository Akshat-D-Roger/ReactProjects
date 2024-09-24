import { atom, selector } from "recoil";
import { products } from "../../assets/assets";

const productsAtom = atom({
    key:'productsAtom',
    default: products
})

const latestProductsSelector = selector({
    key:"latestProductsSelector",
    get: ({get})=>{
        const products = get(productsAtom);
        return products.slice(0,10);
    }
})

const bestSellersSelector = selector({
    key:"bestSellerssSelector",
    get:({get})=>{
        const products = get(productsAtom);
        return (products.filter(item=>(item.bestseller))).slice(0,5)
    }
})

export {productsAtom, latestProductsSelector, bestSellersSelector};