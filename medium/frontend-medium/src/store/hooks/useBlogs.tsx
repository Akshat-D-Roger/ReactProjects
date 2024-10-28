import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import { isLoginAtom, tokenAtom, signout, userAtom } from "../atom/login";
import { blogsAtom } from "../atom/blog";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useBlogs(){
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
    const [token, setToken] = useRecoilState(tokenAtom);
    const resetUser = useResetRecoilState(userAtom)
    const setBlogs = useSetRecoilState(blogsAtom);
    const resetBlogs = useResetRecoilState(blogsAtom);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function getBlogsFromBackend(){
        try{
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`, {headers:{token}});
            if(res.data.success){
                setBlogs(res.data.blogs);
            }
            //if res.data.success is false, it will also have a response status code other than 200 and will go in catch
        }
        catch(err){
            if(axios.isAxiosError(err)){
                toast.error(err.response?.data?.message as string);
                if(err.response?.status===401){
                    signout(setIsLogin, setToken, navigate, resetBlogs, resetUser);
                }
                else if(err.response?.status===500){
                    navigate('/');
                }
            }
            else{
                navigate('/')
                console.error(err);
                toast.error('An unexpected error occured')
            }
        }
        finally{
            setLoading(false);
        }
    }


    useEffect(()=>{
        if(isLogin){
            getBlogsFromBackend();
        }
    }, [isLogin])

    return {loading};
}