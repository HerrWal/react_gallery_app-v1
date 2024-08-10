import React from "react";
import Photo from "./Photo";

const PhotoList = ({ fetchData, topic }) => {
  const photos = fetchData(topic);
  const results = photos.map(photo => {
    const serverId = photo.server; 
    const id = photo.id; 
    const secret = photo.secret;
    const photoUrl = `https://live.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
    return <Photo key={id} url={photoUrl} />
  });

  <div className="photo-container">
    <h2>Results</h2>
    <ul>{results}</ul>
  </div>;
};

export default PhotoList;
