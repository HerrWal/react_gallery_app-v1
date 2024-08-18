import React from "react";
import Photo from "./Photo";

const PhotoList = ({ photos }) => {
  const results = photos.map((photo) => {
    const serverId = photo.server;
    const id = photo.id;
    const secret = photo.secret;
    const photoUrl = `https://live.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
    return <Photo id={id} url={photoUrl} />;
  });

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        {results.length > 0 ? (
          results
        ) : (
          <p>No results found. Please try a different search.</p>
        )}
      </ul>
    </div>
  );
};

export default PhotoList;
