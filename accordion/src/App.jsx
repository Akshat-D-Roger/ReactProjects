import {useState} from 'react';
import {Multi} from './components/Multi'
import {Single}  from './components/Single'
import './components/comp.css'


function App() {
  const[multiSelection, setMultiSelection] = useState(true);
  return(
    <div className="App">
      <button onClick = {()=>{setMultiSelection(curr => !curr)}}>Enable {multiSelection?"Single":"Multiple"} selection</button>
      {multiSelection ? <Multi></Multi> : <Single></Single>}
    </div>
  )
}

export default App
