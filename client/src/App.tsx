import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';

const Home = React.lazy(() => import('./pages/Home'))
// const Layout = React.lazy(() => import('./pages/Layout'))
const MovieList = React.lazy(() => import('./pages/movie/MovieList'))
const AddMovie = React.lazy(() => import('./pages/movie/AddMovie'))
const EditMovie = React.lazy(() => import('./pages/movie/EditMovie'))

const App: React.FC = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path='/movie' element={<MovieList />}></Route>
            <Route path='/movie/add' element={<AddMovie />}></Route>
            <Route path='/movie/edit/:id' element={<EditMovie />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
