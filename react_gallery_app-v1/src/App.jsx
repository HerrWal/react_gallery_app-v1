import { useState } from 'react'
import './App.css'
import apiKey from './config'

// Components
import PhotoList from './components/PhotoList';
import Photo from './components/Photo';
import Nav from './components/Nav';
import Search from './components/Search';

const apiKey = apiKey;

function App() {
  return (
    <div className='container'>
      <PhotoList />
      <Photo />
      <Nav />
      <Search />
    </div>
  );
}

export default App