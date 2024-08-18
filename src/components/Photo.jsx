import React from "react";

const Photo = ({ url, id }) => (
    <li>
        <img src={url} key={id} alt="" />
    </li>
);

export default Photo;