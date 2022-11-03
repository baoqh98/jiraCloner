import { Box } from '@mui/system';
import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginHandler,
  signUpHandler,
  testThunkLogin,
} from './Modules/Auth/slice/authSlice';
import './App.css';
import Board from './Modules/Board/Pages/Board';
import Loader from './UI/Display/Loader/Loader';
import { authSelector } from './app/store';
import SettingProject from './Modules/Project/Pages/SettingProject';
// import CreateProject from './Modules/Project/Pages/CreateProject';
// import Project from './Modules/Project/Pages/Project';
// import MainLayout from './UI/Layout/MainLayout';

const MainLayout = React.lazy(() => import('./UI/Layout/MainLayout/Pages'));
const Project = React.lazy(() => import('./Modules/Project/Pages/Project'));
const CreateProject = React.lazy(() =>
  import('./Modules/Project/Pages/CreateProject')
);

function App() {
  // const { data, isLoading, error } = useSelector(authSelector);
  const dispatch = useDispatch();

  const fakeAuth = {
    email: 'fakeauth@gmail.com',
    passWord: 'fakeauth',
    name: 'fakeauth',
    phoneNumber: 'fakeauth',
  };

  dispatch(
    loginHandler({ email: fakeAuth.email, passWord: fakeAuth.passWord })
  );

  useEffect(() => {
    dispatch(
      loginHandler({ email: fakeAuth.email, passWord: fakeAuth.passWord })
    ).unwrap();
    // .then((data) => console.log(data))
    // .catch((error) => {
    //   if (!error) return;
    //   if (error) {
    //     dispatch(signUpHandler(fakeAuth))
    //       .unwrap()
    //       .then((data) => console.log(data))
    //       .catch((err) => console.log(err));
    //   }
    // });
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
              <Route path='create-project' element={<CreateProject />} />
              <Route path='board/:projectId' element={<Board />} />
              <Route path='create-task' />
              <Route path='setting' element={<SettingProject />} />
              <Route path='setting/:projectName' element={<SettingProject />} />
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
