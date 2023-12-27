import './App.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import { loginUser } from './redux/slices/authorization/auth';

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const dispatch = useDispatch();

  useEffect(() => {
    const tokenData = localStorage.getItem("token");
    
    dispatch(loginUser());
    
    if (tokenData) {
      dispatch(loginUser());
    }
  }, []);

  return <AppRoutes />;
}

export default App;