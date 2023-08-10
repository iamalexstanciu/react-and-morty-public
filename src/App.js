import React, { useState, useRef } from "react";
import "./App.css";
import { useCharacters, useLocations } from "./api/useData";
import HomePage from "./components/HomePage";
import Card from "./components/Card";
import CardLoc from "./components/CardLoc";
import CharacterInfo from "./components/CharacterInfo";
import LocationInfo from "./components/LocationInfo";
import ScrollToTop from "./components/ScrollToTop";

const getParent = (element, className) => {
  if (element.className.includes(className)) return element;
  return getParent(element.parentElement, className);
};

function App() {
  const [isShown, setIsShown] = useState(false);
  const [isLocShown, setIsLocShown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [info, setInfo] = useState(false);
  const [infoLoc, setInfoLoc] = useState(false);
  const ref = useRef(null);
  const appref = useRef(null);

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  const handleInfo = (e) => {
    const parent = getParent(e.target, "card");
    setInfo((current) => parseInt(parent.dataset.id, 10));
    console.log(parent);
  };

  const handleInfoLoc = (e) => {
    const parent = getParent(e.target, "cardLoc");
    setInfoLoc((current) => parseInt(parent.dataset.id, 10));
    console.log(parent);
  };

  const handlePageNum = (pageNum) => {
    setCurrentPage(pageNum);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePrev = (pageNum) => {
    setCurrentPage(pageNum - 1);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNext = (pageNum) => {
    setCurrentPage(pageNum + 1);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  let page1 = 1;
  let page2 = 2;
  let page3 = 3;

  const handleCharacters = () => {
    setIsShown((current) => !current);
    setIsLocShown(false);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleLocation = () => {
    setIsLocShown((current) => !current);
    setIsShown(false);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };
  const characters = useCharacters(currentPage);
  const locations = useLocations(currentPage);

  document.body.addEventListener("keyup", (e) => {
    if (e.code === "Escape") setInfo(null);
  });

  document.body.addEventListener("keyup", (e) => {
    if (e.code === "Escape") setInfoLoc(null);
  });

  return (
    <div className="App" ref={appref}>
      <HomePage
        handleCharacters={handleCharacters}
        handleLocation={handleLocation}
      />
      <ScrollToTop scrollToTop={scrollToTop} visible={visible} />
      {isShown && (
        <>
          <div className="cardContainer" ref={ref}>
            {characters.results?.map((character) => {
              return (
                <>
                  {info === character.id && (
                    <CharacterInfo
                      key={character.id + 387876876876}
                      character={character}
                    />
                  )}
                  <Card
                    handleInfo={handleInfo}
                    key={character.id}
                    character={character}
                  />
                </>
              );
            })}
          </div>
          <div className="pages">
            {currentPage > 1 ? (
              <button
                className="pageNumTest"
                onClick={() => handlePrev(currentPage)}>
                Prev
              </button>
            ) : null}
            <button
              className="pageNumTest"
              onClick={() => handlePageNum(page1)}>
              {page1}
            </button>
            <button
              className="pageNumTest"
              onClick={() => handlePageNum(page2)}>
              {page2}
            </button>
            <button
              className="pageNumTest"
              onClick={() => handlePageNum(page3)}>
              {page3}
            </button>
            {currentPage > 4 ? (
              <button className="pageNumTest">...</button>
            ) : null}
            {currentPage > 3 ? (
              <button className="pageNumTest">{currentPage}</button>
            ) : null}
            {currentPage < 41 ? (
              <button className="pageNumTest">...</button>
            ) : null}
            {currentPage < 42 ? (
              <button className="pageNumTest" onClick={() => handlePageNum(42)}>
                42
              </button>
            ) : null}
            {currentPage < 42 ? (
              <button
                className="pageNumTest"
                onClick={() => {
                  handleNext(currentPage);
                  console.log(currentPage + 1);
                }}>
                Next
              </button>
            ) : null}
          </div>
        </>
      )}
      {isLocShown && (
        <>
          <div className="location" ref={ref}>
            {locations.results?.map((location) => {
              return (
                <div key={location.id}>
                  {infoLoc === location.id && (
                    <LocationInfo location={location} />
                  )}
                  <CardLoc location={location} handleInfoLoc={handleInfoLoc} />
                </div>
              );
            })}
          </div>
          <div className="pages">
            {currentPage > 1 ? (
              <button
                className="pageNumTest"
                onClick={() => handlePrev(currentPage)}>
                Prev
              </button>
            ) : null}
            <button
              className="pageNumTest"
              onClick={() => handlePageNum(page1)}>
              {page1}
            </button>
            <button
              className="pageNumTest"
              onClick={() => handlePageNum(page2)}>
              {page2}
            </button>
            <button
              className="pageNumTest"
              onClick={() => handlePageNum(page3)}>
              {page3}
            </button>
            {currentPage > 4 ? (
              <button className="pageNumTest">...</button>
            ) : null}
            {currentPage > 3 ? (
              <button className="pageNumTest">{currentPage}</button>
            ) : null}
            {currentPage < 6 ? (
              <button className="pageNumTest">...</button>
            ) : null}
            {currentPage < 7 ? (
              <button className="pageNumTest" onClick={() => handlePageNum(7)}>
                7
              </button>
            ) : null}
            {currentPage < 7 ? (
              <button
                className="pageNumTest"
                onClick={() => {
                  handleNext(currentPage);
                  console.log(currentPage + 1);
                }}>
                Next
              </button>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
