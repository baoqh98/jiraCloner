import { Box } from '@mui/system';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Board from './Modules/Board/Pages/Board';
import Loader from './UI/Display/Loader/Loader';
// import MainLayout from './UI/Layout/MainLayout';

const MainLayout = React.lazy(() => import('./UI/Layout/MainLayout/Pages'));

function App() {
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
            {/* <Route path='/project' /> */}
            <Route path='/project'>
              <Route path='board' element={<Board />} />
              <Route path='create-task' />
              <Route path='setting'></Route>
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
