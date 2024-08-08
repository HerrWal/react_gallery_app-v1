import React, { useEffect, useState } from 'react'
import apiKey from './config'
import { Route, Routes, Navigate } from 'react-router';

// Components
import PhotoList from './components/PhotoList';
import Photo from './components/Photo';
import Nav from './components/Nav';
import Search from './components/Search'

const myApiKey = apiKey;
let userApiKey;

function App() {

  const [photos, setPhoto] = useState({});

  const summitHandler = () => {
    
  }

  useEffect(() => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => setPhoto(responseData))
      .catch(error => console.log("Error fetching and parsing data", error));
  }, []);

  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Navigate replace to="/cats" />}></Route>
        <Route path='/cats' element={<PhotoList photos={photos} title={'Cats Photos'} />}></Route>
        <Route path='/dogs' element={<PhotoList photos={photos} title={'Dogs Photos'} />}></Route>
        <Route path='/computers' element={<PhotoList photos={photos} title={'Computers Photos'} />}></Route>
        <Route path='/search/:query' element={<PhotoList photos={photos} title={query} />}></Route>
      </Routes>      
      <Photo />
      <Nav />
      <Search />
    </div>
  );
}

export default App