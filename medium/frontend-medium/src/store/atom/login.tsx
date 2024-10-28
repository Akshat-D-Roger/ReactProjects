import { atom, Resetter, SetterOrUpdater } from "recoil";
import axios from "axios";
import { toast, ToastContent } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

export const isLoginAtom = atom({
    key:'isLoginAtom',
    default:false
})

export const tokenAtom = atom({
    key:'tokenAtom',
    default:''
})

export const userAtom = atom({
    key:'userAtom',
    default: {name:'', email:''}
})

export async function sendSignupReq(name:string, email:string, password:string, setIsLogin:SetterOrUpdater<boolean>, setToken:SetterOrUpdater<string>, navigate:NavigateFunction, setUser:SetterOrUpdater<{name: string;email: string;}>, setLoading:SetterOrUpdater<boolean>):Promise<void>{
    setLoading(true);
    try{
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, {name, email, password});
        if(res.data.success && res.data.token){
            setIsLogin(true);
            setToken(res.data.token);
            setUser(res.data.user);
            localStorage.setItem('token', JSON.stringify(res.data.token));
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/');
        }
        else{
            toast.error(res.data.message);
        }
    }
    catch(err){
        toast.error(err as ToastContent<Error>)
    }
    finally{
        setLoading(false);
    }
}

export async function sendSigninReq(email:string, password:string, setIsLogin:SetterOrUpdater<boolean>, setToken:SetterOrUpdater<string>, navigate:NavigateFunction, setUser:SetterOrUpdater<{name: string;email: string;}>,setLoading:SetterOrUpdater<boolean>):Promise<void>{
    setLoading(true)
    try{
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`, {email, password});
        if(res.data.success && res.data.token){
            setIsLogin(true);
            setToken(res.data.token);
            setUser(res.data.user);
            localStorage.setItem('token', JSON.stringify(res.data.token));
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/');
        }
        else{
            toast.error(res.data.message);
        }
    }
    catch(err){
        toast.error(err as ToastContent<Error>)
    }
    finally{
        setLoading(false);
    }
}

export function signout(setIsLogin:SetterOrUpdater<boolean>, setToken:SetterOrUpdater<string>, navigate:NavigateFunction, resetBlogs:Resetter, resetUser:Resetter){
    setIsLogin(false);
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    resetBlogs();
    resetUser();
    navigate('/login');
}