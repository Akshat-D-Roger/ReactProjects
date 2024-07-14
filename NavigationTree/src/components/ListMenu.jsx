import { ListItem } from "./ListItem"

export function ListMenu({data=[]}){
    return(
        <ul>
            {data.length > 0 ?
            data.map((item, index)=>{
                return <ListItem key={index} item={item}></ListItem>
            })
            : null}
        </ul>
    )
}