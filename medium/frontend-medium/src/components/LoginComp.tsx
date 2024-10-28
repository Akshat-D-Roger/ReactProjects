import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { isLoginAtom, sendSignupReq, sendSigninReq, tokenAtom, userAtom } from '../store/atom/login';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { Loading } from './Loading';

const SignupComp = ()=>{
    const setIsLogin = useSetRecoilState(isLoginAtom);
    const setToken = useSetRecoilState(tokenAtom);
    const setUser = useSetRecoilState(userAtom);
    const navigate = useNavigate();
    const [loginOrRegister,setLoginOrRegister] = useState(1); //1 is for signin , 0 is for register
    const [loading, setLoading] = useState(false);

    function loginOrRegisterHandler(){
      if(loginOrRegister === 0){
        setLoginOrRegister(1);
      }
      else{
        setLoginOrRegister(0);
      }
    }

    function submitHandler(event:React.FormEvent){
      event.preventDefault();
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      if((loginOrRegister === 0 && !formData.get('name')) || !formData.get('email') || !formData.get('password')){
        toast.error('input field empty!');
        return;
      }
      else{
        if(loginOrRegister === 0){
          sendSignupReq(formData.get('name') as string, formData.get('email') as string, formData.get('password') as string, setIsLogin, setToken, navigate, setUser, setLoading);
        }
        else{
          sendSigninReq(formData.get('email') as string, formData.get('password') as string, setIsLogin, setToken, navigate, setUser, setLoading)
        }
      }      
    }
  
    return(
      <div className='w-full sm:w-3/4'>
        <div className='flex flex-col items-center'>
          <div className='text-3xl font-semibold'>Create an account</div>
          <div className='flex flex-row text-gray-500'>
            <div>Already have an account?</div>
            <button onClick={loginOrRegisterHandler} className='underline sm:pl-1 hover:text-red-500'>{loginOrRegister === 1 ? 'Signup' :'Login'}</button>
          </div>
        </div>
        <form className='flex flex-col gap-4 mt-[2rem]' onSubmit={submitHandler}>
          {loginOrRegister === 0 && 
            <div className='flex flex-col gap-[0.75rem]'>
            <label htmlFor="name" className='text-sm font-semibold'>Name</label>
            <input required type="text" id="name" name='name' placeholder='Enter your name' className='p-2 rounded-md border-2'/>
            </div>
          }
          <div className='flex flex-col gap-[0.75rem]'>
            <label htmlFor="email" className='text-sm font-semibold'>Email</label>
            <input required type="email" id="email" name='email' placeholder='me@example.com' className='p-2 rounded-md border-2'/>
          </div>
          <div className='flex flex-col gap-[0.75rem]'>
            <label htmlFor="password" className='text-sm font-semibold'>Password (more than 8 characters)</label>
            <input required type="password" id="password" name='password' placeholder='mystrongpassword' className='p-2 rounded-md border-2'/>
          </div>
          <button disabled={loading ? true : false} type="submit" className={`py-2 mt-[2rem] text-lg rounded-md ${loading ?  'bg-black text-white' : 'bg-black text-white hover:bg-red-500 hover:text-black'} flex justify-center`}>
            {!loading ? 'submit' : <Loading size="small"/>}
          </button>
        </form>
      </div>
    )
  }

export default SignupComp