import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import MainLayout from './UI/Layout/MainLayout';

const MainLayout = React.lazy(() => import('./UI/Layout/MainLayout'));

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<h1>loading...</h1>}>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='/project' />
            <Route path='/project/:projectId'>
              <Route path='board' />
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
