import React, { useState, useEffect } from "react";
import homeImage from "../assets/rick-and-morty-31013 (1).png";
import Button from "./Button";

function HomePage({ handleCharacters, handleLocation }) {
  return (
    <div className="homePage">
      <div>
        <div className="home">
          <img src={homeImage} alt="character" className="homeImage" />
          <Button
            handleCharacters={handleCharacters}
            handleLocation={handleLocation}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
