import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import "./mainPage.css";

// const media = [
//   {
//     type: "",
//     src: "",
//   },
//   {
//     type: "image",
//     src: "https://cdn.mos.cms.futurecdn.net/oLMgm6qmfPahnSjaSdn9Da.jpg",
//   },
// ];

function MainPage() {
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const socialMediaRef = useRef(null);
  const imageContainerRef = useRef(null);

  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const startX = screenWidth / 4;
    const startyX = -screenWidth / 4;

    gsap.fromTo(
      ".textOne",
      { x: startyX },
      { duration: 1.5, x: 0, ease: "slow" }
    );
    gsap.fromTo(
      ".textTwo",
      { x: startyX },
      { duration: 1.5, x: 0, ease: "slow" }
    );

    gsap.fromTo(
      ".textThree",
      { x: startX },
      { duration: 1.5, x: 0, ease: "slow" }
    );
  }, []);

  const scrollToSection = (ref: any, page: React.SetStateAction<string>) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
    setCurrentPage(page);
  };

  const handleUpClick = () => {
    if (currentPage === "about") {
      scrollToSection(imageContainerRef, "home");
    } else if (currentPage === "contact") {
      scrollToSection(aboutRef, "about");
    } else if (currentPage === "socialMedia") {
      scrollToSection(imageContainerRef, "home");
    }
  };

  const handleDownClick = () => {
    if (currentPage === "home") {
      scrollToSection(aboutRef, "about");
    } else if (currentPage === "about") {
      scrollToSection(contactRef, "contact");
    } else if (currentPage === "contact") {
      scrollToSection(socialMediaRef, "socialMedia");
    }
  };

  return (
    <AnimatePresence>
      <div className="imageContainer" ref={imageContainerRef}>
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
            transition={{ duration: 1.5 }}
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
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="list"
            onClick={() => scrollToSection(aboutRef, "about")}
          >
            About
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.5 }}
            className="list"
            onClick={() => scrollToSection(contactRef, "contact")}
          >
            Contact
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="list"
            onClick={() => scrollToSection(socialMediaRef, "socialMedia")}
          >
            Portfolio
          </motion.button>
        </div>
      </div>
      <div ref={aboutRef} className="section aboutSection">
        <h2>About Us</h2>
        <p>This is the About section content.</p>
        <div className="navigationButtons">
          <button onClick={handleUpClick}>Up</button>
          <button onClick={handleDownClick}>Down</button>
        </div>
      </div>
      <div ref={contactRef} className="section contactSection">
        <h2>Contact Us</h2>
        <p>This is the Contact section content.</p>
        <div className="navigationButtons">
          <button onClick={handleUpClick}>Up</button>
          <button onClick={handleDownClick}>Down</button>
        </div>
      </div>
      <div ref={socialMediaRef} className="section socialMediaSection">
        <h2>Follow Us on Social Media</h2>
        <p>This is the Social Media section content.</p>
        <div className="navigationButtons">
          <button onClick={handleUpClick}>Up</button>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default MainPage;
