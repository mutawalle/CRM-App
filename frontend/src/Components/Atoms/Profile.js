import React from "react";

export default function Profile(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title />
      <g id="User">
        <path fill={props.color} d="M21,30H11a5,5,0,0,1-5-5V24a9,9,0,0,1,9-9h2a9,9,0,0,1,9,9v1A5,5,0,0,1,21,30ZM15,17a7,7,0,0,0-7,7v1a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V24a7,7,0,0,0-7-7Z" />
        <path fill={props.color} d="M16,14a6,6,0,1,1,6-6A6,6,0,0,1,16,14ZM16,4a4,4,0,1,0,4,4A4,4,0,0,0,16,4Z" />
      </g>
    </svg>
  );
}
