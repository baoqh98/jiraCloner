import { Box } from '@mui/system';
import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginHandler } from './Modules/Auth/slice/authSlice';
import './App.css';
import Board from './Modules/Board/Pages/Board';
import Project from './Modules/Project/Pages/Project';
import Loader from './UI/Display/Loader/Loader';
// import MainLayout from './UI/Layout/MainLayout';

const MainLayout = React.lazy(() => import('./UI/Layout/MainLayout/Pages'));

const fakeAuth = {
  email: 'fakeauth@mail.com',
  passWord: 'fakeauth',
  name: 'fakeauth',
  phoneNumber: '010101',
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      loginHandler({ email: fakeAuth.email, passWord: fakeAuth.passWord })
    );
  }, []);

  return (
    <div className='App'>
      <Suspense
        fallback={
          <>
            <Box height={160} />
            <Loader />
          </>
        }
      >
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='/project' element={<Project />} />
            <Route path='/project'>
              <Route path='board' element={<Board />} />
              <Route path='create-task' />
              <Route path='setting' />
            </Route>
          </Route>

          <Route path='/'>
            <Route path='/login'></Route>
            <Route path='/register'></Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
