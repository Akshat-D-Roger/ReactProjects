const Title = ({firstName, secondName}) => {

    //second name is empty string
    if(!secondName){
        return(
            <div className='flex gap-2 items-center'>
                <div className={`text-3xl`}>{firstName}</div>
                <div className='w-11 border-0 bg-slate-600 h-[2px]'></div>
            </div>
        )
    }

  return (
    <div className="flex gap-2 items-center">
        <div className="flex flex-wrap gap-x-2">
            <div className={`text-3xl text-gray-500`}>{firstName}</div>
            <div className={`text-3xl`}>{secondName}</div>
        </div>
        <div>
            <div className='w-11 border-0 bg-slate-600 h-[2px]'></div>
        </div>
    </div>
  )
}

export default Title