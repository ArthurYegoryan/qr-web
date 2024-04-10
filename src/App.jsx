import './App.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import { loginUser } from './redux/slices/authorization/auth';
import { Suspense } from 'react';

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const dispatch = useDispatch();

  useEffect(() => {
    const tokenData = localStorage.getItem("token");
    
    if (tokenData && tokenData !== "undefined") {
      console.log("User logged in");
      dispatch(loginUser());
    }

    return localStorage.clear();                   // Clear localstorage during refreshes for test
  }, []);

  return <AppRoutes />;
}

export default function WrappedApp() {
  return (
    <Suspense fallback="...loading">
      <App />
    </Suspense>
  )
}