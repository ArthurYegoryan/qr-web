import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginContainer from './pages/loginPage/LoginContainer';
import TerminalsPage from './pages/terminalsPage/TerminalsPage';
import Layout from './pages/layout/Layout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Routes>
      {
        isLoggedIn ?
          <Route path='/' element={<Layout />}>
            <Route index element={<TerminalsPage />} />
          </Route> :
          <Route path='/' element={<LoginContainer
                          setIsLoggedIn={setIsLoggedIn} />}
          >
            <Route path='*' element={<LoginContainer />} />
          </Route>
      }
      </Routes>
    </>    
  );
}

export default App;