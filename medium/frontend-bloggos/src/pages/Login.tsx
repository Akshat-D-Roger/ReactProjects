import Quote from '../components/Quote'
import LoginComp from '../components/LoginComp'

const Login = () => {
  return (
    <div className='h-full flex flex-col sm:flex-row px-[2rem] sm:px-0'>
      <div className='basis-[55%] sm:basis-[100%] sm:h-full w-full sm:flex sm:justify-center sm:items-center'>
        <LoginComp/>
      </div>
      <div className='sm:basis-[100%] sm:h-full bg-gray-100 w-full sm:flex sm:justify-center sm:items-center'>
        <Quote/>
      </div>
    </div>
  )
}




export default Login