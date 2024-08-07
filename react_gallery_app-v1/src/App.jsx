import { useState } from 'react'
import './App.css'
import apiKey from './config'
import { Route, Routes, Navigate } from 'react-router';

// Components
import PhotoList from './components/PhotoList';
import Photo from './components/Photo';
import Nav from './components/Nav';
import Search from './components/Search';

const apiKey = apiKey;

function App() {
  const fetchData = query => {
    const jsonData = fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`);
  };
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Navigate replace to="/cats" />}></Route>
        <Route path='/cats' element={<PhotoList />}></Route>
        <Route path='/dogs' element={<PhotoList />}></Route>
        <Route path='/computers' element={<PhotoList />}></Route>
        <Route path='/search/:query' element={<PhotoList />}></Route>
      </Routes>      
      <Photo />
      <Nav />
      <Search />
    </div>
  );
}

export default App