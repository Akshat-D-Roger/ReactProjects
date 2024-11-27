import { Avatar } from './Avatar'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { isLoginAtom, tokenAtom, userAtom } from '../store/atom/login'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { blogsAtom } from '../store/atom/blog'
import { signout } from '../store/atom/login'

const Navbar = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const setToken = useSetRecoilState(tokenAtom);
  const navigate = useNavigate();
  const resetBlogs = useResetRecoilState(blogsAtom)
  const resetUser = useResetRecoilState(userAtom);
  const userName = useRecoilValue(userAtom).name
  return (
    <div className='w-full px-[1rem] sm:px-[2rem] py-2 flex justify-between items-center border-b-2 border-slate-100'>
      <div className='flex '>
        <NavLink to="/" className='prata-regular text-3xl font-semibold cursor-pointer'>Bloggos</NavLink>
      </div>
      <div className='flex flex-row gap-2 sm:gap-4 items-center'>
        <Link to="/create" className='p-2 rounded-3xl bg-green-400 text-back'>Create</Link>
        {isLogin &&
        <div className='relative group'>
          <Avatar name={userName} size={'big'}/> 
          <div className='hidden group-hover:block absolute right-0'>
            <div className='mt-[1rem] mr-[1rem] p-2 px-6 grid grid-col-2 bg-slate-100 text-slate-500 gap-2 text-sm font-medium'>
              <NavLink to="/blogs" className='whitespace-nowrap hover:text-black text-left'>Your Blogs</NavLink>
              <button className='whitespace-nowrap hover:text-black text-left' onClick={()=>signout(setIsLogin, setToken, navigate, resetBlogs, resetUser)}>Sign Out</button>
            </div>
          </div>
        </div>
         }
        {!isLogin && 
          <NavLink to='/login'>
            <div className='bg-gray-100 rounded-full w-10 h-10 flex flex-col justify-center items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
          </NavLink>
        }
      </div>
    </div>
  )
}

export default Navbar