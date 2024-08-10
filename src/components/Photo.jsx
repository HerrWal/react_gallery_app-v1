import React from "react";

const Photo = ({ url, id }) => (
    <li>
        <img src={url} id={id} alt="" />
    </li>
);

export default Photo;