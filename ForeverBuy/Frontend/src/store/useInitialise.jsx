import { useRecoilState, useSetRecoilState } from "recoil";
import { productsAtom } from "./atoms/products";
import { useEffect } from "react";
import axios from "axios";
import { isLoginAtom, tokenAtom } from "./atoms/isLogin";
import { cartItemsAtom } from "./atoms/cart";
import { logout } from "./logout";
import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";

export default function useInitialise(){
    const setProducts = useSetRecoilState(productsAtom);
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
    const [token, setToken] = useRecoilState(tokenAtom);
    const setCartItems = useSetRecoilState(cartItemsAtom);
    const navigate = useNavigate();

    async function getProductsFromBackend(){
        try{
            let res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/product/list`);
            if(!res.data.success){
                console.log(res.data.message);
            }
            else if(res.data.products.length===0){
                console.log('currently no products are available')
            }
            else{
                setProducts(res.data.products)
            }
        }
        catch(err){
            console.log(`issue in retrieving products: ${err}`)
        }
    }

    useEffect(()=>{getProductsFromBackend()}, []);

    function checkToken(){
        if(!isLogin){
            let token = localStorage.getItem('token');
            if(token){
                setIsLogin(true);
                setToken(JSON.parse(token));
            }
        }
    }

    useEffect(()=>{checkToken()}, [])

    //cartItems atom is 100% dependant on isLogin state but it is not derived from isLogin state. So, less sense to use selector

    async function getCartItemsFromBackend(){
        try{
            let res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/cart/get`, {headers:{token}});
            if(!res.data.success){
                if(res.data.message==='not able to fetch cart right now'){
                    console.log(res.data.message)
                }
                else{
                    //make user logout as either it has invalid token or it doesnt exist or the token wasnt sent
                    logout(setIsLogin, setToken, navigate);
                }
            }
            else{
                setCartItems(res.data.cartItems)
            }
        }
        catch(err){
            console.log(`not able to fetch cart: ${err}`)
        }
    }

    useEffect(()=>{
        if(isLogin){
            getCartItemsFromBackend();
        }
        else{
            setCartItems({});
        }
    }, [isLogin])
}