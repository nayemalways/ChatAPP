import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './App.jsx'
import assets from './assets/assets.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div  style={{ backgroundImage: `url(${assets.bgImage})`, backgroundSize: 'cover' }}
  className="bg-no-repeat bg-center min-h-screen">
      <RouterProvider router={router}/>
    </div>
  </StrictMode>,
)
