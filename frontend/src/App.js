import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      {/* <AppStyled bg={bg} className='App'> */}
      {/* {orbMemo} */}
      {/* <MainLayout> */}
      {/* <Navigation active={active} setActive={setActive} /> */}
      <main>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </main>
      {/* </MainLayout> */}
      {/* </AppStyled> */}
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
