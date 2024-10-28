import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilState, useResetRecoilState } from "recoil";
import { isLoginAtom, signout, tokenAtom, userAtom } from "../atom/login";
import { useNavigate } from "react-router-dom";
import { blogsAtom } from "../atom/blog";

interface Blog{
    id:string,
    title:string,
    content:string,
    published:string,
    createdAt:string
}

export function useBlog({id}:{id:string}){
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
    const [blogData, setBlogData] = useState<Blog>({id:'', title:'', content:'', published:'', createdAt:''});
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useRecoilState(tokenAtom);
    const navigate = useNavigate();
    const resetBlogs = useResetRecoilState(blogsAtom);
    const resetUser = useResetRecoilState(userAtom);

    async function getBlogFromBackend(){
        try{
            setLoading(true)
            const headers = token?{token}:{}
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`, {headers});
            if(res.data.success){
                setBlogData(res.data.blog);
            }
        }
        catch(err){
            if(axios.isAxiosError(err)){
                toast.error(err.response?.data?.message as string);
                if(err.response?.status===401){
                    //auth fail (it was unpublised blog)
                    signout(setIsLogin, setToken, navigate, resetBlogs, resetUser);
                }
                else if(err.response?.status===403){
                    //unauthtorised to access
                    navigate('/')
                }
                else if(err.response?.status===404){
                    //blog does not exist
                    navigate('/');
                }
                else if(err.response?.status===500){
                    //internal server error
                    navigate('/')
                }
            }
            else{
                console.error(err);
                toast.error('An unexpected error occured');
                navigate('/')
            }
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getBlogFromBackend()
    }, [id, isLogin])

    return {blogData, loading}
}