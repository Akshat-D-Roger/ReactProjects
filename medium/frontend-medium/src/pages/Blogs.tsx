import { useRecoilValue } from "recoil"
import BlogCard from "../components/BlogCard"
import { isLoginAtom, userAtom } from "../store/atom/login"
import { blogsAtom } from "../store/atom/blog";
import { Blog } from "../store/atom/blog";
import { useBlogs } from "../store/hooks/useBlogs";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";

const Blogs = () => {
    const isLogin = useRecoilValue(isLoginAtom)
    const {loading} = useBlogs();
    const blogs = useRecoilValue(blogsAtom);
    const authorName = useRecoilValue(userAtom).name;


    if(!isLogin){
      return(
        <div className="w-full h-full flex justify-center items-center">
          Please <Link to="/login" className="p-2 rounded-3xl bg-green-400 text-back mx-1">login</Link> to see all your blogs!
        </div>
      )
    }
    else if(loading){
      return(
        <div className="flex justify-center items-center w-full h-full">
          <Loading size="big"></Loading>
        </div>
      )
    }

  return (
    <div className='flex justify-center h-full'>
      <div className='w-[80%] sm:w-[60%] max-w-[750px] h-full'>
        { blogs.length>0 ? 
            blogs.map((item:Blog)=>{
                return(<BlogCard key={item.id} id={item.id} authorName={authorName} title={item.title} content={item.content} date={item.createdAt} publish={item.published}/>)
            }):
            <div className="h-full flex items-center justify-center">No blogs written! Create a new one</div> 
        }
      </div>
    </div>
  )
}

export default Blogs