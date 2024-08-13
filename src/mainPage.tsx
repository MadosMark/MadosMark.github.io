import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import "./mainPage.css";
import tilde from "./assets/tilde.jpg";
import studioImg from "./assets/studio.jpg";
import studio2Img from "./assets/studio2.jpg";
import studio3Img from "./assets/studio3.jpg";

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
      type: "",
      src: "",
    },
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
    {
      type: "",
      src: "",
    },
  ];
  const portfolio = [
    {
      type: "image",
      src: studio2Img,
    },
    {
      type: "image",
      src: studioImg,
    },
    {
      type: "image",
      src: studio3Img,
    },
  ];

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const startyX = -screenWidth / 4;

    gsap.fromTo(
      ".textOne",
      { x: startyX },
      { duration: 2, x: 0, ease: "slow" }
    );
    gsap.fromTo(
      ".textTwo",
      { x: startyX },
      { duration: 2, x: 0, ease: "slow" }
    );

    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const scrollPosition = scrollContainerRef.current.scrollTop;
      const aboutPosition = aboutRef.current?.offsetTop || 0;
      const portfolioPosition = portfolioRef.current?.offsetTop || 0;
      const contactPosition = contactRef.current?.offsetTop || 0;

      if (scrollPosition >= contactPosition - window.innerHeight / 2) {
        setCurrentPage("contact");
      } else if (scrollPosition >= portfolioPosition - window.innerHeight / 2) {
        setCurrentPage("portfolio");
      } else if (scrollPosition >= aboutPosition - window.innerHeight / 2) {
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="textTwo"
            ></motion.div>
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
            } else if (item.type === "video") {
              return (
                <video
                  className="aboutImage"
                  key={index}
                  width="100%"
                  height="50%"
                  autoPlay
                  loop
                  muted
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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
            } else if (item.type === "video") {
              return (
                <video
                  className="portfolioImage"
                  key={index}
                  width="100%"
                  height="50%"
                  autoPlay
                  loop
                  muted
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div ref={contactRef} className="contactSection scrollSection">
          <h2>Contact Us</h2>
          <p>This is the Contact section content.</p>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default MainPage;
