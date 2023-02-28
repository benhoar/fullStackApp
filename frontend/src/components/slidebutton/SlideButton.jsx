import React, { useState } from "react";
import "./slidebutton.css";

function SlideButton({ details }) {
  const [isHovering, setIsHovering] = useState(false);
  const { image, text, alt, onClick } = details

  const handleHover = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className="hover-button" onMouseOver={handleHover} onMouseOut={handleMouseOut}>
      <div className="button-img-container">
        <img
          src={image}
          alt={alt}
          className={`button-image ${isHovering ? "slide-out" : ""}`}
        />
      </div>
      <div className="button-container">
        <button onClick={onClick} className={`slide-button ${isHovering ? "slide-in" : ""}`}>
          {text}
        </button>
      </div>
    </div>
  );
}

export default SlideButton;
