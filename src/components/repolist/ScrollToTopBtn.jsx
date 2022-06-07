const ScrollToTopBtn = ({ showScrollTopBtn, handleScrollToTop }) => {
  return (
    <button
      className={`scroll-to-top-btn ${
        showScrollTopBtn ? 'visible' : 'invisible'
      }`}
      onClick={handleScrollToTop}
    >
      Top
    </button>
  );
};

export default ScrollToTopBtn;
