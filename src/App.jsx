import React, { useEffect, useState } from "react";
import apiKey from "./config";
import { Route, Routes, Navigate, useLocation } from "react-router";

// Components
import PhotoList from "./components/PhotoList";
import Nav from "./components/Nav";
import Search from "./components/Search";

const myApiKey = apiKey;
let userApiKey;

function App() {
  const [photos, setPhotos] = useState([]);
  const location = useLocation();

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

  useEffect(() => {
    const path = location.pathname.slice(1) || "cats";
    fetchData(path);
  }, [location]);

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
            element={<PhotoList photos={photos} />}
          />
        ))}
        <Route
          path="/search/:query"
          element={
            <PhotoListWithParams fetchData={fetchData} photos={photos} />
          }
        />
      </Routes>
    </div>
  );

  // New component to handle the URL parameter
  function PhotoListWithParams({ fetchData, photos }) {
    const { query } = useParams();

    useEffect(() => {
      fetchData(query);
    }, [query]);

    return <PhotoList photos={photos} />;
  }
}

export default App;
