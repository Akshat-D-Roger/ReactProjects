import {atom, selector} from 'recoil'
import {productsAtom} from './products';

const searchAtom = atom({
    key:'searchAtom',
    default:''
})

const allOrSearchedProducts = selector({
    key:'allOrSearchedProducts',
    get:({get})=>{
        let products = get(productsAtom);
        const search = get(searchAtom);
        if(!search){
            return products;
        }
        if(!products)
        return [];
        products = products.filter(item=>(item.name.toLowerCase()).includes(search.toLowerCase()));
        return products;
    }
})

export {searchAtom, allOrSearchedProducts};