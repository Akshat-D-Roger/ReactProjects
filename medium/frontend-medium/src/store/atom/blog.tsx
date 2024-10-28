import { atom, SetterOrUpdater } from "recoil";
import axios from "axios";
import { toast, ToastContent } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

interface Blog{
    id:string,
    title:string,
    content:string,
    published:boolean,
    createdAt:string,
    author:{
        name:string
    }
}

export const blogsAtom = atom<Blog[]>({
    key:'blogsAtom',
    default:[]
})


async function uploadBlog(title:string, content:string, isLogin:boolean, token:string, setBlogs:SetterOrUpdater<Blog[]>, navigate:NavigateFunction, userName:string){
    if(isLogin){
        try{
            const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`, {title, content}, {headers:{token}});
            if(req.data.success){
                const newBlog:Blog = {id:req.data.blogData.id as string, title, content, published:false, createdAt:req.data.blogData.createdAt, author:{name:userName}}
                setBlogs((prev:Blog[]) => [...prev,  newBlog]);
                toast('New blog created! To publish it, go to your blogs section and click on publish button')
                navigate(`/blog/${req.data.blogData.id}`)
            }
            else{
                toast(req.data.message)
            }
        }
        catch(err){
            toast(err as ToastContent<Error>);
        }
    }
    else{
        toast('Please login to create a blog')
        navigate('/login');
    }
}


export type {Blog}
export {uploadBlog};