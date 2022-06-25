import React from 'react';
import Layout from './pages/Layout';
import MovieList from './pages/movie/MovieList';
import AddMovie from './pages/movie/AddMovie';
import EditMovie from './pages/movie/EditMovie';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Layout/> }>
          <Route index element={<Home/>}></Route>
          <Route path='/movie' element={<MovieList/>}></Route>
          <Route path='/movie/add' element={<AddMovie/>}></Route>
          <Route path='/movie/edit/:id' element={<EditMovie/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
