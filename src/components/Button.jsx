import React from "react";


function Button({ handleCharacters, handleLocation }) {
  return (
    <div className="buttons">
      <button className="buttonsCha" onClick={() => handleCharacters()}>
       
        Characters
      </button>
      <button className="buttonsLoc" onClick={() => handleLocation()}>
        {" "}
        Locations{" "}
      </button>
    </div>
  );
}

export default Button;
