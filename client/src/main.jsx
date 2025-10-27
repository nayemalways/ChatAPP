import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './App.jsx'
import assets from './assets/assets.js'
import { AuthProvider } from '../context/AuthContext.jsx'
import {Toaster} from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <div style={{ backgroundImage: `url(${assets.bgImage})`, backgroundSize: 'cover' }} className="bg-no-repeat bg-center min-h-screen">
            <Toaster position='top right'/>
            <RouterProvider router={router}/>
          </div>
    </AuthProvider>
    
  </StrictMode>,
)
