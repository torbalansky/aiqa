import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../data/Button.jsx";
import * as React from "react";
import lottie from "lottie-web";
import animationData from "../../public/images/animation.json";

const Home = () => {
  const lottieContainer = React.useRef(null);

  React.useEffect(() => {
    const lottieInstance = lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      lottieInstance.destroy();
    };
  }, []);

  return (
    <section className="relative pt-56 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="home">
        <div className="container grid grid-cols-1 md:grid-cols-5 items-center gap-10">
          <div className="text-section col-span-2 text-start">
            <h1 className="body-5 font-bold mb-4 text-p3">AI for Quality Assurance</h1>
            <p className="body-6 mb-22">Discover powerful AI tools designed to enhance testing efficiency and accuracy.</p>
            <LinkScroll to="aitools" offset={-100} spy smooth>
              <Button>Explore AI Tools</Button>
            </LinkScroll>
          </div>

          <div className="animation-section col-span-3 flex justify-center items-center">
            <div
              ref={lottieContainer}
              className="relative animation-container" 
            ></div>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Home;
