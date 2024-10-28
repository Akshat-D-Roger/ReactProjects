import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { toast } from "react-toastify";
import { signout, tokenAtom, isLoginAtom, userAtom } from "../atom/login";
import { blogsAtom } from "../atom/blog";

export function useLogin(){
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
    const setToken = useSetRecoilState(tokenAtom);
    const setUser = useSetRecoilState(userAtom)
    const resetBlogs = useResetRecoilState(blogsAtom);
    const resetUser = useResetRecoilState(userAtom);
    const navigate = useNavigate();

    function checkLogin(){
        if(!isLogin){
            const localStorageToken = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if(localStorageToken && user){
                try{
                    const parsedToken:string = JSON.parse(localStorageToken);
                    const parsedUser:{name:string; email:string} = JSON.parse(user);
                    if(!parsedUser.name || !parsedUser.email){
                        toast(`issue in fetching from localStorage`);
                        signout(setIsLogin, setToken, navigate, resetBlogs, resetUser);
                    }
                    setIsLogin(true);
                    setToken(parsedToken);
                    setUser(parsedUser);

                }
                catch(err){
                    toast(`issue in fetching from localStorage: ${err}`);
                    signout(setIsLogin, setToken, navigate, resetBlogs, resetUser);
                }
            }
        }
    }

    useEffect(checkLogin, [])
}