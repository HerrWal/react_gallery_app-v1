import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

// Components
import PhotoList from "./components/PhotoList";
import Nav from "./components/Nav";
import Search from "./components/Search";
import apiKey from "./config";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      );
      const data = await response.json();
      setPhotos(data.photos?.photo || []);
    } catch (error) {
      console.log("Error fetching and parsing data", error);
    } finally {
      setLoading(false);
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
              loading ? (
                <p>Loading, please wait...</p>
              ) : (
                <PhotoList
                  photos={photos}
                  changeQuery={changeQuery}
                  pageTitle={searchQuery}
                />
              )
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>      
    </div>
  );
};

export default App;
