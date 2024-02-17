import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutMe from "./components/AboutMe";
import SkillSets from "./components/SkillSets";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import { useSelector } from "react-redux";

const App = () => {
  const { sections: sections = [] } = useSelector((state) => state.heroReducer);
  const defaultSections = {
    about: <AboutMe />,
    skillSets: <SkillSets />,
    projects: <Projects />,
    experience: <Experience />,
    blogs: <Blogs />,
    cta: <Contact />,
  };
  console.log;
  return (
    <div>
      <Header />
      <HeroSection />
      {sections.map((key) => defaultSections[key])}
      {sections.length === 6 && <div className="m-5 text-bold float-right w-1/2">All sections added! Looks good</div>}
    </div>
  );
};

export default App;
