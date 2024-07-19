import { useLocalStorage } from "./useLocalStorage";
import './darkmode.css'

export function DarkMode(){
    const [mode,setModeOnClick] = useLocalStorage('theme', 'light');

    return(
        <div className="container" data-mode={mode}>
            <div className="child1">hello world</div>
            <div className="child2">
                <button className="button" onClick={setModeOnClick}> toggle {mode==='dark' ? 'light' : 'dark'} mode</button>
            </div>
        </div>
    )
}