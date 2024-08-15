import React from "react";

const Photo = ({ url, key }) => (
    <li>
        <img src={url} key={key} alt="" />
    </li>
);

export default Photo;