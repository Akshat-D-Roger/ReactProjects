import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
      <ToastContainer theme='dark' autoClose={1600} closeOnClick={true} pauseOnHover={false}/>
    </BrowserRouter>
  </RecoilRoot>
)
