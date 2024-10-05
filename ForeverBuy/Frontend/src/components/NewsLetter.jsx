const NewsLetter = () => {

    function onSubmitHandler(event){
        event.preventDefault();
    }
    
  return (
    <div className='flex flex-col gap-2 text-center items-center w-full'>
        <div className='text-xl font-semibold'>Subscribe now & get 20% off</div>
        <div className='text-gray-400'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
        <form onSubmit={onSubmitHandler} className='w-[50%] border-[1px] border-gray-400 flex flex-row items-center'>
            <input required type="email" placeholder='Enter your e-mail' className='px-4 text-md w-full focus:outline-none' />
            <button type="submit" className='bg-black text-white p-[0.7rem] px-8 text-sm'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetter