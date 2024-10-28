import { usePublishedBlogs } from "../store/hooks/usePublishedBlogs"
import { Loading } from "../components/Loading";
import { Blog } from "../store/atom/blog";
import BlogCard from "../components/BlogCard";


const Home = () => {
  const {blogs, loading} = usePublishedBlogs();

  if(loading){
    return(
      <div className="flex justify-center items-center w-full h-full">
        <Loading size="big"></Loading>
      </div>
    )
  }

  return(
    <div className='flex justify-center h-full'>
      <div className='w-[80%] sm:w-[60%] max-w-[750px] h-full'>
        <div className="my-[2rem] text-semibold text-3xl text-center">PUBLISHED BLOGS</div>
        { blogs.length>0 ? 
            blogs.map((item:Blog)=>{
                return(<BlogCard key={item.id} id={item.id} authorName={item.author.name} title={item.title} content={item.content} date={item.createdAt} publish={item.published}/>)
            }):
            <div className="h-full flex items-center justify-center">No blogs written! Create a new one</div> 
        }
      </div>
    </div>
  )
}

export default Home