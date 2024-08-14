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
  const [photos, setPhotos] = useState([]);

  const fetchData = (query) => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
    )
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.photos && responseData.photos.photo) {
          setPhotos(responseData.photos.photo); 
        } else {
          setPhotos([]);
        }
      })
      .catch((error) => console.log("Error fetching and parsing data", error));
  };

  return (
    <div className="container">
      <Search fetchData={fetchData} />
      <Nav />
      <Routes>
      <Route path="/" element={<Navigate replace to="/cats" />} />
        {["cats", "dogs", "computers"].map((topic) => (
          <Route
            key={topic}
            path={`/${topic}`}            
            element={<PhotoList fetchData={() => fetchData(topic)} photos={photos} />}
          />
        ))}
        <Route
          path="/search/:query"
          element={<PhotoList fetchData={(query) => fetchData(query)} photos={photos} />}
        />
      </Routes>
    </div>
  );
}

export default App;
