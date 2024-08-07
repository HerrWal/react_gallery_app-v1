import { useState } from 'react'
import './App.css'
import apiKey from './config'
import { Route, Routes, Navigate } from 'react-router';

// Components
import PhotoList from './components/PhotoList';
import Photo from './components/Photo';
import Nav from './components/Nav';
import Search from './components/Search';

const myApiKey = apiKey;
let userApiKey;

function App() {

  const fetchData = query => {
    return fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`);
  };
  
  console.log(fetchData(cats));

  const [data, setData] = useState(fetchData);

  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Navigate replace to="/cats" />}></Route>
        <Route path='/cats' element={<PhotoList photos={data} title={'title'} />}></Route>
        <Route path='/dogs' element={<PhotoList photos={data} title={'title'} />}></Route>
        <Route path='/computers' element={<PhotoList photos={data} title={'title'} />}></Route>
        <Route path='/search/:query' element={<PhotoList photos={data} title={'title'} />}></Route>
      </Routes>      
      <Photo />
      <Nav />
      <Search />
    </div>
  );
}

export default App