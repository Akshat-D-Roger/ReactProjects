import { atom, selector } from "recoil";

// async function getProducts(){
//     let products = await axios.get('http://localhost:4000/api/product/list');
//     if(products.data.success)
//         return products.data.products;
//     else
//     return [];
// }

// const getProductsFromBackendSelector = selector({
//     key:'getProductsFromBackend',
//     get:async ()=>{
//         let products = await getProducts();
//         return products;
//     }
// })

const productsAtom = atom({
    key:'productsAtom',
    default: []
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
        return (products.filter(item=>(item.bestSeller))).slice(0,5);
    }
})

export {productsAtom, latestProductsSelector, bestSellersSelector};