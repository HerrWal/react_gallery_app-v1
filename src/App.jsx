import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Components
import PhotoList from "./components/PhotoList";
import Nav from "./components/Nav";
import Search from "./components/Search";
import apiKey from "./config";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("cats");

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

  const changeQuery = (newQuery) => {
    setSearchQuery(newQuery);
  };

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

  return (
    <div className="container">
      <Search />
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate replace to="/cats" />} />
        {["cats", "dogs", "computers"].map((topic) => (
          <Route
            key={topic}
            path={`/${topic}`}
            element={
              <PhotoList
                photos={photos}
                changeQuery={changeQuery}
                pageTitle={searchQuery}
              />
            }
          />
        ))}
        <Route
          path="/search/:query"
          element={
            <PhotoList
              photos={photos}
              changeQuery={changeQuery}
              pageTitle={searchQuery}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
