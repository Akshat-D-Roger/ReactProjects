import { useParams } from "react-router-dom"
import { useBlog } from "../store/hooks/useBlog";
import {format} from 'date-fns'
import { Loading } from "../components/Loading";

const Blog = () => {

  const id:string = useParams().id as string;
  const {blogData,loading} = useBlog({id});

  if(loading){
    return(
      <div className="flex justify-center items-center w-full h-full">
        <Loading size="big"></Loading>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[95%] sm:w-[80%] pt-[1rem] sm:pt-[2rem] flex flex-col gap-5 md:gap-0 md:flex-row">
        <div className="md:basis-[75%]">
          <div className="text-5xl font-bold">{blogData.title}</div>
          <div className="mt-[0.3rem] text-gray-600 text-sm">Posted on {blogData.createdAt && format(new Date(blogData.createdAt),'MMMM dd, yyyy')}</div>
          <div className="mt-[1.5rem]">{blogData.content}</div>
        </div>
        {/* for author */}
        <div className="md:basis-[25%] flex flex-col gap-2">
          <div className="text-sm">Author</div>
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 bg-gray-200 rounded-full shrink-0"></div>
            <div className="flex flex-col">
              <div className="text-3xl font-semibold">{blogData.author.name}</div>
              <div className="text-sm text-gray-600">Some random fact about the author...</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Blog