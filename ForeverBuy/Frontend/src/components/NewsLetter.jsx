const NewsLetter = () => {

    function onSubmitHandler(event){
        event.preventDefault();
    }
    
  return (
    <div className='flex flex-col gap-2 text-center items-center w-full'>
        <div className={`text-xl font-semibold `}>Subscribe now & get 20% off</div>
        <form className={`w-[75%] sm:w-[50%] flex flex-col sm:flex-row sm:items-center`} onSubmit={onSubmitHandler}>
            <input required type="email" placeholder='Enter your e-mail' className={`border-[1px] border-gray-400 py-2 px-4 text-md w-full focus:outline-none`} />
            <div className="mt-[0.5rem] sm:mt-0"><button type="submit" className={`p-[0.7rem] px-8 text-sm bg-black text-white`}>SUBSCRIBE</button></div>
        </form>
    </div>
  )
}

export default NewsLetter