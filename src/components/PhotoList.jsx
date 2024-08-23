import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Photo from "./Photo";
import NotFound from "./NotFound";

const PhotoList = ({ photos, changeQuery, pageTitle }) => {

  const location = useLocation();
  const { query } = useParams();

  const currentPathQuery = location.pathname.slice(1);

  useEffect(() => {
    if (query && query !== pageTitle) {
      changeQuery(query);
    } else if (currentPathQuery !== pageTitle) {
      changeQuery(currentPathQuery);
    }
  }, [location.pathname]);

  return (
    <div className="photo-container">
      <h2>Results for {pageTitle}</h2>
      <ul>
        {photos.length > 0 ? (
          photos.map(({ id, server, secret }) => (
            <Photo
              key={id}
              url={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
            />
          ))
        ) : (
          <NotFound />
        )}
      </ul>
    </div>
  );
};
export default PhotoList;
