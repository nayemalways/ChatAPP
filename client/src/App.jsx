import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home
  },
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/profile',
    Component: Profile
  }
])

export default router;