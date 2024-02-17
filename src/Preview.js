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

const Preview = () => {
    const { sections: sections = [] } = useSelector((state) => state.heroReducer);
    const defaultSections = {
      about: <AboutMe preview={true}/>,
      skillSets: <SkillSets preview={true}/>,
      projects: <Projects preview={true}/>,
      experience: <Experience preview={true}/>,
      blogs: <Blogs preview={true}/>,
      cta: <Contact preview={true}/>,
    };
  return (
    < div>
    <Header/>
    <HeroSection preview={true}/>
    {sections.map((key) => defaultSections[key])}
    </div>
  );
};

export default Preview;
