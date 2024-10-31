import { useState } from "react"
import axios from 'axios'
import { useSetRecoilState } from "recoil";
import { isLoginAtom, tokenAtom } from "../store/atoms/isLogin";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {

  let [loginOrRegister, setLoginOrRegister] = useState('Login');
  let setLogin = useSetRecoilState(isLoginAtom);
  let setToken = useSetRecoilState(tokenAtom);
  let navigate = useNavigate();

  function changeLoginOrRegister(){
    if(loginOrRegister==='Login'){
      setLoginOrRegister('Register');
    }
    else{
      setLoginOrRegister('Login')
    }
  }

  async function onSubmitHandler(e){
    e.preventDefault()
    const formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');
    if(loginOrRegister==='Login'){
      let res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/user/login`, {email, password});
      if(res.data.success){
        let token = res.data.token;
        localStorage.setItem('token', JSON.stringify(token))
        setLogin(true);
        setToken(token);
        navigate('/')
      }
      else{
        toast.error(res.data.message)
      }
    }
    else{
      let name = formData.get('name')
      let res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/user/register`, {name, email, password})
      if(res.data.success){
        let token = res.data.token;
        localStorage.setItem('token', JSON.stringify(token))
        setLogin(true);
        setToken(token);
        navigate('/')
      }
      else{
        toast.error(res.data.message)
      }
    }
  }

  return (
    <form onSubmit={(e)=>onSubmitHandler(e)} className="flex flex-col items-center justify-center sm:gap-10 gap-3 border-t-[1px] pt-[2rem] mb-[10rem] w-full">
      <div className="text-[2.5rem] prata-regular">{loginOrRegister }</div>
      <div className="flex flex-col items-center justify-between gap-4 w-full sm:w-[25rem] relative">
        {loginOrRegister ==='Register' && <input required type="text" placeholder="Name" name="name" className={`w-full border p-2`}/>}
        <input required type="email" placeholder="Email" name="email" className="w-full border p-2"/>
        <input required type="password" placeholder="Password" name="password" className="w-full border p-2"/>
        <div className="text-sm absolute -bottom-8 right-0 hover:cursor-pointer" onClick={()=>{changeLoginOrRegister()}}>{loginOrRegister==='Login' ? 'Create account' : 'Login'}</div>
      </div>
      <div className="mt-4 sm:mt-0">
        <button type="submit" className="bg-black p-3 px-12 text-white mt-[1rem]">{loginOrRegister==='Login' ? 'Sign In' : 'Sign Up'}</button>
      </div>
      <ToastContainer/>
    </form>
  )
}

export default Login