import { LoadMore } from "./components/LoadMore";

export function App(){
    return(
        <LoadMore initialSize={40} limit={100}/>
    )
}