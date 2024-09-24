import {assets} from '../assets/assets'
const Footer = () => {
  return (
    <div className="w-full">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-[4rem] py-[3rem] border-b-2">
            <div className="flex flex-col gap-4 text-sm text-gray-500" >
                <div>
                    <img className="w-[8rem]" src={assets.logo} alt="logo" />
                </div>
                <div className='w-2/3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa recusandae odit incidunt hic ratione facilis beatae sed, laborum illo ut sint! Totam magni cumque non qui ea autem, atque quibusdam.</div>
            </div>
            <div className="flex flex-col gap-1 text-sm text-gray-500">
                <div className="text-black text-2xl font-medium pb-3">COMPANY</div>
                <div>Home</div>
                <div>About us</div>
                <div>Delivery</div>
                <div>Privacy Policy</div>
            </div>
            <div className="flex flex-col gap-1 text-sm text-gray-500">
                <div className="text-black text-2xl font-medium pb-3">GET IN TOUCH</div>
                <div>+916375095901</div>
                <div>kakshat23121999@gmail.com</div>
                <a target="_blank" className="hover:text-cyan-400" href="https://www.instagram.com/account.akshat/">ig-account.akshat</a>
            </div> 
        </div>
        <div className="text-center text-sm py-[1rem]">
            Copyright 2024@ akshat - All Right Reserved.
        </div>
    </div>
  )
}

export default Footer