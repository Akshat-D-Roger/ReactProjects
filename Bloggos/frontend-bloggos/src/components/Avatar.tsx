export const Avatar = ({name, size}:{name:string, size:'small'|'big'})=>{
    const nameArr = name.split(' ').filter((item,index)=>{if(index < 2)return item});
    return(
        <div className={`flex items-center justify-center ${size === 'big' ? 'w-8 h-8' : 'w-5 h-5' } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-default`}>
        <span className="font-medium text-xs text-gray-600 dark:text-gray-300">{nameArr.map((item)=>{
            return item[0].toUpperCase();
        })}</span>
        </div>
    )
}