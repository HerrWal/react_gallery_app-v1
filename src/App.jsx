import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";

// Components
import PhotoList from "./components/PhotoList";
import Nav from "./components/Nav";
import Search from "./components/Search";
import apiKey from "./config";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const location = useLocation();

  const fetchData = async (query) => {
    try {
      const response = await fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      );
      const data = await response.json();
      setPhotos(data.photos?.photo || []);
    } catch (error) {
      console.log("Error fetching and parsing data", error);
    }
  };

  useEffect(() => {
    fetchData(location.pathname.slice(1) || "cats");
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
};

const PhotoListWithParams = ({ fetchData, photos }) => {
  const { query } = useParams();

  useEffect(() => {
    fetchData(query);
  }, [query, fetchData]);

  return <PhotoList photos={photos} />;
};

export default App;
