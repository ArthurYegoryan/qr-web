import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginContainer from './pages/loginPage/LoginContainer';
import TerminalsPage from './pages/terminalsPage/TerminalsPage';

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [ token, setToken ] = useState("");

  useEffect(() => {
    const tokenData = localStorage.getItem("token");
    console.log(tokenData);
    setToken(tokenData);
  }, []);

  return (
    <>
      {
        token ?
          <TerminalsPage /> 
        :
          <Routes>
            <Route path='/' element={<LoginContainer />} /> 
            <Route path='/terminals' element={<TerminalsPage />} />                       
            <Route path='/*' element={<Navigate to="/" />} />
          </Routes>
      }
    </>      
  );
}

export default App;


// <Route path='/terminals' element={<TerminalsPage />} />            
// <Route path='/transactions' element={<TransactionsPage />} />