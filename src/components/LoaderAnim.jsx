const LoaderAnim = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-lg z-[50000] flex items-center justify-center">
      <div className="loaderSpinner inline-block relative w-[80px] h-[80px] after:content-[''] after:block after:rounded-[50%] after:w-0 after:h-0 after:m-2 after:border-box after:border-[32px] after:border-white after:border-t-primary_clr after:border-r-transparent after:border-b-primary_clr after:border-l-transparent"></div>
      <style>{`
      .loaderSpinner {
        animation: loaderSpin 1.2s linear infinite;
      }
      @keyframes loaderSpin {
        0% {
          transform: rotate(0deg);
        }
        0% {
          transform: rotate(360deg);
        }
      }
      `}</style>
    </div>
  );
};

export default LoaderAnim;
