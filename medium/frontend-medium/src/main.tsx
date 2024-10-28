import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
      <ToastContainer autoClose={2000} pauseOnHover={false} hideProgressBar={true} theme='dark'/>
    </RecoilRoot>
  </BrowserRouter>
)
