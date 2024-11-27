const OurPolicy = () => {
  return (
    <div className={`flex flex-col sm:flex-row w-full gap-[1rem] sm:gap-0 items-center sm:items-start sm:justify-around text-center mt-[2rem]`}>
        <div className='flex flex-col items-center'>
            <div className='p-1 pb-[1rem]'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke='currentColor' className="size-10"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
            </div>
            <div className={`font-semibold text-md`}>Easy Exchange Policy</div>
            <div className={`text-gray-400 text-md`}>We offer hassle free exchange policy</div>
        </div>
        <div className='flex flex-col items-center'>
            <div className='p-1 pb-[1rem]'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke='currentColor' className="size-10"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
            </div>
            <div className={`font-semibold text-md`}> 7 Days Return Policy</div>
            <div className={`text-gray-400 text-md`}>We provide 7 day free return policy</div>
        </div>
        <div className='flex flex-col items-center'>
            <div className='p-1 pb-[1rem]'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke='currentColor' className="size-10"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
            </div>
            <div className={`font-semibold text-md`}>Best customer support</div>
            <div className={`text-gray-400 text-md`}>We provide 24/7 customer support</div>
        </div>
    </div>
  )
}

export default OurPolicy