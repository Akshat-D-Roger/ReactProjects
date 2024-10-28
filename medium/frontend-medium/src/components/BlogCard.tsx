import { useNavigate } from "react-router-dom"
import { Avatar } from "./Avatar"
import {format} from 'date-fns'
import axios from "axios"
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil"
import { isLoginAtom, signout, tokenAtom, userAtom } from "../store/atom/login"
import { toast } from "react-toastify"
import { blogsAtom } from "../store/atom/blog"
import { useState } from "react"
import { Loading } from "./Loading"

interface BlogCardType{
    id:string,
    authorName:string,
    title:string,
    content:string,
    date:string,
    publish:boolean
}


const BlogCard = ({id, authorName, title, content, date, publish}:BlogCardType) => {
    const navigate = useNavigate();
    const [token, setToken] = useRecoilState(tokenAtom);
    const setIsLogin = useSetRecoilState(isLoginAtom);
    const resetUser = useResetRecoilState(userAtom);
    const resetBlogs = useResetRecoilState(blogsAtom);
    const [loadingPublish, setLoadingPublish] = useState(false);

    function navigateToBlog(id:string){
        navigate(`/blog/${id}`)
    }

    async function publishBlog(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.stopPropagation();
        setLoadingPublish(true);
        try{
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/publish`, {blogId:id}, {headers:{token}});
            if(res.data.success){
                toast('Blog published!');
                setTimeout(()=>{window.location.reload();}, 1000)
            }
        }
        catch(err){
            if(axios.isAxiosError(err)){
                if(err.response?.status===401){
                    //signout
                    signout(setIsLogin, setToken, navigate, resetBlogs, resetUser);
                }
                else if(err.response?.status===400){
                    //blog not found
                    toast(err.response?.data?.message);
                }
                else{
                    toast('Internal server issue');
                }
            }
            else{
                toast(`An unexpected error occured`);
                console.error(err);
            }
        }
        finally{
            setLoadingPublish(false);
        }
        
    }

  return (
    <div onClick={()=>{navigateToBlog(id)}} className="flex flex-col pt-[1rem] sm:pt-[2rem] hover:bg-slate-100 px-2 cursor-pointer">
        <div className="w-full flex justify-between items-start">
            <div className="flex flex-row gap-2 justify-start flex-wrap items-center">
                <div>
                    {<Avatar name={authorName} size={'small'}/>}
                </div>
                <div className="text-xs">{authorName}</div>
                <div className="w-[0.2rem] h-[0.2rem] rounded-full bg-black"></div>
                <div className="text-xs text-slate-500">{format(new Date(date),'MMMM dd, yyyy')}</div>
            </div>
            <div>
                {!publish && <button onClick={(e)=>publishBlog(e)} className="p-1 sm:p-2 text-black text-xs sm:text-sm border-2 border-black bg-yellow-400 hover:bg-yellow-300 hover:text-black rounded-3xl" title="publish">
                    {!loadingPublish ? 'Publish' : <Loading size={'small'}/>}    
                </button>}
            </div>
        </div>
        <div className="text-2xl font-semibold pt-[0.5rem]">{title}</div>
        <div className="text-md font-normal pt-[0.5rem]">{content.slice(0,200) + '...'}</div>
        <div className="w-full border-b-2 border-slate-100 pt-[1rem] sm:pt-[2rem] "></div>
    </div>
  )
}

export default BlogCard