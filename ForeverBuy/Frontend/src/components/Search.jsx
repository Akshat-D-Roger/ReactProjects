import { useSetRecoilState } from "recoil";
import { searchAtom } from "../store/atoms/search.js";
import { useRef } from "react";

const Search = () => {
    const setSearch = useSetRecoilState(searchAtom);
    const timer = useRef(null);

    function onChangeHandler(e){
      const value = e.target.value;
        if(timer.current){
          clearTimeout(timer.current);
        }
        timer.current = setTimeout(()=>{
          setSearch(value)
        }, 1000)
    }

  return (
    <div className='w-full flex justify-center mb-[1.5rem]'>
        <input type="text" placeholder='search products...' className={`rounded-md px-[2rem] py-2 border w-full sm:w-1/2 md:1/3 lg:1/4 outline-black `} onChange={(e)=>onChangeHandler(e)}/>
    </div>
  )
}

export default Search