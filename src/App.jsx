import React, { useEffect, useState } from "react";
import apiKey from "./config";
import { Route, Routes, Navigate } from "react-router";

// Components
import PhotoList from "./components/PhotoList";
import Nav from "./components/Nav";
import Search from "./components/Search";

const myApiKey = apiKey;
let userApiKey;

function App() {

  const fetchData = (query) => {
    const [photos, setPhotos] = useState([]);   
    console.log(typeof(photos));
    useEffect(() => {
      fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
        
      )
        .then((response) => response.json())
        .then((responseData) => setPhotos(responseData))
        .catch((error) =>
          console.log("Error fetching and parsing data", error)
        );
    }, [query]);
    return photos
  };

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Navigate replace to="/cats" />}></Route>
        <Route
          path="/cats"
          element={<PhotoList fetchData={fetchData} topic={'cats'} />}
        ></Route>
        <Route
          path="/dogs"
          element={<PhotoList fetchData={fetchData} topic={'dogs'} />}
        ></Route>
        <Route
          path="/computers"
          element={<PhotoList fetchData={fetchData} topic={'computers'} />}
        ></Route>
        <Route
          path="/search/:query"
          element={<PhotoList fetchData={fetchData} />}
        ></Route>
      </Routes>

    <Search fetchData={fetchData} />
      <Nav />
    </div>
  );
}

export default App;
