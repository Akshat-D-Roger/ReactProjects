import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function usePublishedBlogs(){

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchPublishedBlogs(){
        setLoading(true);
        try{
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/publishedBlogs`);
            console.log(res);
            if(res.data.success){
                setBlogs(res.data.blogs)
            }
        }
        catch(err){
            if(axios.isAxiosError(err)){
                toast.error(err.response?.data?.message);
            }
            else{
                toast.error('An unexpected error occured');
            }
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchPublishedBlogs();
    }, [])

    return {blogs, loading};
}
