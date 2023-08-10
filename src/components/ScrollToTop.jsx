const ScrollToTop = ({scrollToTop, visible}) => {



    return (
        <button className="scrollToTop" onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }}></button>
    )
}

export default ScrollToTop;