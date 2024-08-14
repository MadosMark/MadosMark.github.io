import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./mainPage.css";
import tilde from "./assets/tilde.jpg";
import studioImg from "./assets/tattoo1.jpg";
import studio2Img from "./assets/tattoo2.jpg";
import studio3Img from "./assets/tattoo3.jpg";

import studioMov from "./assets/studde.mov";
import gsap from "gsap";

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

    setTimeout(() => {
      scrollContainer?.addEventListener("scroll", handleScroll);
    }, 100);

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
                  d="M64 27a1 1 0 0 0-.35-.77L57 20.66V6a1 1 0 0 0-1-1H38.32L32.64.23a1 1 0 0 0-1.29 0L25.67 5H8a1 1 0 0 0-1 1v14.66L.36 26.23A1 1 0 0 0 0 27v36a1 1 0 0 0 1 1h62a1 1 0 0 0 1-1V27zm-7-3.73 4.27 3.58L57 29.33zm-25-21L35.21 5h-6.42zM9 7h46v23.49L32 43.84 9 30.49zM7 23.27v6.05l-4.27-2.47zm-5 5.47 20.15 11.7L2 60.59zM3.41 62l20.53-20.52 7.56 4.39a1 1 0 0 0 1 0l7.56-4.39L60.59 62zM62 60.59 41.85 40.44 62 28.74z"
                />
                <path
                  className="cls-1"
                  d="M46 24a14 14 0 1 0-14 14 14 14 0 0 0 14-14zm-26 0a12 12 0 1 1 12 12 12 12 0 0 1-12-12zM11 10v4h2v-3h3V9h-4a1 1 0 0 0-1 1zM11 16h2v2h-2z"
                />
                <path
                  className="cls-1"
                  d="M36 21a4 4 0 0 1-4 4 2 2 0 0 0-2 2v2h2v-2a6 6 0 1 0-6-6h2a4 4 0 0 1 8 0zM30 31h2v2h-2z"
                />
              </g>
            </svg>
            <h2>Booking tattoo appointment</h2>
            <p>
              To book an appointment for a tattoo with me, please click forward
              to my instagram page and send me a message.
            </p>
            <a href="https://www.google.com/" className="instagramButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 50 50"
              >
                <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default MainPage;
