import React from 'react'
import { blogsAtom, uploadBlog } from '../store/atom/blog';
import { isLoginAtom, tokenAtom, userAtom } from '../store/atom/login';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Create = () => {
    const isLogin = useRecoilValue(isLoginAtom);
    const token = useRecoilValue(tokenAtom);
    const navigate = useNavigate();
    const setBlogs = useSetRecoilState(blogsAtom);
    const userName = useRecoilValue(userAtom).name

    function onSubmitHandler(e:React.FormEvent){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const title = formData.get('title');
        const content = formData.get('content');
        if(!title || !content){
            toast('Empty fields');
            return;
        }
        uploadBlog(title as string, content as string, isLogin, token, setBlogs, navigate, userName)
        
    }

    // if(!isLogin){
    //     return(
    //         <div className='w-full h-full flex justify-center items-center'>
    //             <Link to="/login" className='p-2 rounded-3xl bg-green-400 text-back'>Login to create a blog</Link>
    //         </div>
    //     )
    // }

  return (
    <div className='w-full h-full pt-[2rem] flex flex-col'>
        {!isLogin && 
            <div className='w-full flex justify-center items-center pb-[1rem]'>
                <Link to="/login" className='p-2 rounded-3xl bg-green-400 text-back'>Login to create a blog</Link>
            </div>
        }
        <div className='flex w-full grow justify-center'>
            <form className='w-[95%] sm:w-[80%] max-w-screen-lg h-full flex flex-col items-center' onSubmit={onSubmitHandler}>
                <div className='w-full pb-[1rem]'>
                    <input required name="title" type="text" placeholder='Title' className='w-full text-3xl p-[1rem] rounded-3xl border-2 border-black font-semibold focus:outline-none' />
                </div>
                <div className='pb-[1rem] h-full w-full'>
                    <textarea required name="content" className="h-full block p-2.5 pt-[2rem] w-full text-md rounded-3xl border-2 border-black focus:outline-none" placeholder="Write your thoughts here..."></textarea>
                </div>
                <div className='pb-[1rem]'>
                    <button disabled={!isLogin} type='submit' className={`p-2 rounded-3xl ${!isLogin ? 'bg-gray-300' : 'bg-green-400'} text-back px-[1rem] sm:px-[2rem]`}>Upload</button>
                </div>
            </form>   
        </div>
    </div>
  )
}

export default Create