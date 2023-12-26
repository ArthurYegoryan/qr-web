import './App.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import { loginUser } from './redux/slices/auth';

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const dispatch = useDispatch();

  useEffect(() => {
    const tokenData = localStorage.getItem("token");
    
    if (tokenData) {
      dispatch(loginUser());
    }
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;