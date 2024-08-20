import React from "react";
import Photo from "./Photo";

const PhotoList = ({ photos }) => (
  <div className="photo-container">
  <h2>Results</h2>
  <ul>
    {photos.length > 0 ? (
      photos.map(({ id, server, secret }) => (
        <Photo
          key={id}
          url={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
        />
      ))
    ) : (
      <p>No results found. Please try a different search.</p>
    )}
  </ul>
</div>
);

export default PhotoList;
