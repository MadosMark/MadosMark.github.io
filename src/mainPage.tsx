import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./mainPage.css";
import tilde from "./assets/tilde.jpg";
import studioImg from "./assets/tattoo1.jpg";
import studio2Img from "./assets/tattoo2.jpg";
import studio3Img from "./assets/tattoo3.jpg";

import studioMov from "./assets/studde.mov";

function MainPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState("home");

  const media = [
    {
      type: "video",
      src: studioMov,
    },
  ];

  const about = [
    {
      type: "image",
      src: tilde,
    },
  ];

  const portfolio = [
    {
      type: "image",
      src: studioImg,
    },
    {
      type: "image",
      src: studio3Img,
    },
    {
      type: "image",
      src: studio2Img,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const scrollPosition = scrollContainerRef.current.scrollTop;
      const aboutPosition = aboutRef.current?.offsetTop || 0;
      const portfolioPosition = portfolioRef.current?.offsetTop || 0;
      const contactPosition = contactRef.current?.offsetTop || 0;

      const halfWindowHeight = window.innerHeight / 2;

      if (scrollPosition >= contactPosition - halfWindowHeight) {
        setCurrentPage("contact");
      } else if (scrollPosition >= portfolioPosition - halfWindowHeight) {
        setCurrentPage("portfolio");
      } else if (scrollPosition >= aboutPosition - halfWindowHeight) {
        setCurrentPage("about");
      } else {
        setCurrentPage("home");
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    handleScroll();

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToSection = (ref: any) => {
    if (scrollContainerRef.current && ref.current) {
      scrollContainerRef.current.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (page: string) => {
    if (page === "home") {
      scrollToSection(imageContainerRef);
    } else if (page === "about") {
      scrollToSection(aboutRef);
    } else if (page === "portfolio") {
      scrollToSection(portfolioRef);
    } else if (page === "contact") {
      scrollToSection(contactRef);
    }
  };

  return (
    <AnimatePresence>
      <div className="scrollContainer" ref={scrollContainerRef}>
        <div className="imageContainer scrollSection" ref={imageContainerRef}>
          {media.map((item, index) => {
            if (item.type === "image") {
              return (
                <img className="image" key={index} alt="media" src={item.src} />
              );
            } else if (item.type === "video") {
              return (
                <video
                  className="image"
                  key={index}
                  width="100%"
                  height="100%"
                  autoPlay={true}
                  loop={true}
                  muted
                  playsInline
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              );
            } else {
              return null;
            }
          })}
          <div className="textContainer">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="textOne"
            >
              Aurora Ink
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 2 }}
              className="textThree"
            >
              Studio
            </motion.div>
          </div>
          <div className="listContainer">
            {["about", "portfolio", "contact"].map((section) => (
              <motion.button
                key={section}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1.5 }}
                className={`list ${
                  currentPage === section && currentPage !== "home"
                    ? "active"
                    : ""
                }`}
                onClick={() => handleClick(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
        <div ref={aboutRef} className="aboutSection scrollSection">
          {about.map((item, index) => {
            if (item.type === "image") {
              return (
                <img
                  className="aboutImage"
                  key={index}
                  alt="media"
                  src={item.src}
                />
              );
            } else {
              return null;
            }
          })}
          <div className="aboutText">
            <h2>Aurora Ink Studio</h2>
            <p>Hi, my name is Tilde and I am a tattoo artist.</p>
            <p>I have my own studio in Varberg, Sweden.</p>
          </div>
        </div>
        <div ref={portfolioRef} className="portfolioSection scrollSection">
          {portfolio.map((item, index) => {
            if (item.type === "image") {
              return (
                <img
                  className="portfolioImage"
                  key={index}
                  alt="media"
                  src={item.src}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        <div ref={contactRef} className="contactSection scrollSection">
          <div className="contactText">
            <h2>Contact Me</h2>
            <p>
              Get in touch with me through email for future business
              collaborations, such as renting a place in my studio.
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width={50}
              height={50}
            >
              <defs>
                <style>.cls-1</style>
              </defs>
              <g id="_9-Email_Support" data-name="9-Email Support">
                <path
                  className="cls-1"
                  d="M64 27a1 1 0 0 0-.35-.77L57 20.66V6a1 1 0 0 0-1-1H38.32L32.64.23a1 1 0 0 0-1.29 0L25.67 5H8a1 1 0 0 0-1 1v14.66L.36 26.23A1 1 0 0 0 0 27v36a1 1 0 0 0 1 1h62a1 1 0 0 0 1-1ZM2 61V28.41l9.5 8.56ZM32 42 8.6 21H55.4ZM54.5 21 32 42 9.5 21H6.41l25.29-22.4 25.3 22.4ZM59 61V36.97l9.5-8.56V61ZM9.5 43.03 54.5 43.03l2 1.76v15.21H7.5V44.79Z"
                />
              </g>
            </svg>
            <a href="mailto:aurorainkstudio@gmail.com">
              aurorainkstudio@gmail.com
            </a>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default MainPage;
