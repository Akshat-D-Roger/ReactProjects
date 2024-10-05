import {assets} from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row w-full gap-[1rem] sm:gap-0 items-center sm:items-start sm:justify-around text-center mt-[2rem]'>
        <div className='flex flex-col items-center'>
            <div className='p-1 pb-[1rem]'>
                <img className='w-12' src={assets.exchange_icon} alt="exchange-icon" />
            </div>
            <div className='font-semibold text-md'>Easy Exchange Policy</div>
            <div className='text-gray-400 text-md'>We offer hassle free exchange policy</div>
        </div>
        <div className='flex flex-col items-center'>
            <div className='p-1 pb-[1rem]'>
                <img className='w-12' src={assets.quality_icon} alt="quality-icon" />
            </div>
            <div className='font-semibold text-md'> 7 Days Return Policy</div>
            <div className='text-gray-400 text-md'>We provide 7 day free return policy</div>
        </div>
        <div className='flex flex-col items-center'>
            <div className='p-1 pb-[1rem]'>
                <img className='w-12' src={assets.support_img} alt="support-icon" />
            </div>
            <div className='font-semibold text-md'>Best customer support</div>
            <div className='text-gray-400 text-md'>We provide 24/7 customer support</div>
        </div>
    </div>
  )
}

export default OurPolicy