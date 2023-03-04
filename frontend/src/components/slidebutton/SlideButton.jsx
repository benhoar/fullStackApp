import { useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import "./slidebutton.css";

function SlideButton({ details }) {
  const [isHovering, setIsHovering] = useState(false);
  const { image, text, alt, onClick } = details
  const { innerWidth } = useWindowSize()

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
        {innerWidth <= 960 && image !== null && 
          <img src={image} alt={alt} className="miniIcon"/>
        }
        <button onClick={onClick} className={`slide-button ${isHovering ? "slide-in" : ""}`}>
          {text}
        </button>
      </div>
    </div>
  );
}

export default SlideButton;
