import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from '../protectedRoute/protectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home/>
       </ProtectedRoute>
    )
  },
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile/>
      </ProtectedRoute>
    )
  }
])

export default router;