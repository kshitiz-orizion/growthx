import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PlusSign from "../assets/plusSign.png";
import { useDispatch, useSelector } from "react-redux";
import { setSections } from "../action";

const Button = ({ disableDrop, onClick, saveAndExec }) => {
  const [drop, showDrop] = useState(false);
  const [portalTop, setPortalTop] = useState("");
  const [portalLeft, setPortalLeft] = useState("");
  const [translate, setTranslate] = useState(false);

  const dispatch = useDispatch();

  const { sections: sections = [] } = useSelector((state) => state.heroReducer);

  const toggleDrop = (e, label) => {
    if (saveAndExec) {
      onClick();
    }
    if (disableDrop) {
      onClick();
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    document.body.classList.toggle("overflow-hidden");
    showDrop(!drop);
    if (portalTop) {
      setPortalTop("");
      return;
    }
    if (window.screen.height - e.clientY < 200) {
      setTranslate(true);
    }
    setPortalTop(e.clientY);
    setPortalLeft(e.clientX);
  };

  const addSection = (type) => {
    dispatch(setSections(type));
  };

  return (
    <section className="w-full mx-2 p-5">
      <button
        className="w-full flex justify-center items-center border border-slate-300 rounded-xl h-10 bg-[#eeeeee]"
        onClick={(e) => toggleDrop(e)}
      >
        <img src={PlusSign} className="h-2 w-2 mr-2" />
        <p>Add Next</p>
      </button>
      {drop &&
        createPortal(
          <div
            className="min-h-full min-w-full top-0 fixed"
            onClick={(e) => toggleDrop(e)}
          >
            <p
              onClick={(e) => toggleDrop(e, "something")}
              className="w-1/4 fixed justify-center items-center flex bg-white flex-col rounded-lg p-5"
              style={{
                top: portalTop + 20,
                left: portalLeft - 200,
                transform: translate ? "translateY(-120%)" : "",
              }}
            >
              {!sections.includes("about") && (
                <span
                  className="group w-full p-2 flex items-center hover:bg-plus-grey rounded"
                  onClick={() => addSection("about")}
                >
                  <p className="group-hover:bg-white w-6 h-6 flex justify-center items-center bg-plus-grey rounded-full mr-4">
                    <img src={PlusSign} className="w-2 h-2" />
                  </p>
                  📌 Add About you
                </span>
              )}
              {!sections.includes("skillSets") && (
                <span
                  className="group w-full p-2 flex items-center hover:bg-plus-grey rounded"
                  onClick={() => addSection("skillSets")}
                >
                  <p className="group-hover:bg-white w-6 h-6 flex justify-center items-center bg-plus-grey rounded-full mr-4">
                    <img src={PlusSign} className="w-2 h-2" />
                  </p>
                  💡 Add Skillsets
                </span>
              )}
              {!sections.includes("projects") && (
                <span
                  className="group w-full p-2 flex items-center hover:bg-plus-grey rounded"
                  onClick={() => addSection("projects")}
                >
                  <p className="group-hover:bg-white w-6 h-6 flex justify-center items-center bg-plus-grey rounded-full mr-4">
                    <img src={PlusSign} className="w-2 h-2" />
                  </p>
                  🛠️ Add Projects
                </span>
              )}
              {!sections.includes("experience") && (
                <span
                  className="group w-full p-2 flex items-center hover:bg-plus-grey rounded"
                  onClick={() => addSection("experience")}
                >
                  <p className="group-hover:bg-white w-6 h-6 flex justify-center items-center bg-plus-grey rounded-full mr-4">
                    <img src={PlusSign} className="w-2 h-2" />
                  </p>
                  🌐 Add Experience
                </span>
              )}
              {!sections.includes("blogs") && (
                <span
                  className="group w-full p-2 flex items-center hover:bg-plus-grey rounded"
                  onClick={() => addSection("blogs")}
                >
                  <p className="group-hover:bg-white w-6 h-6 flex justify-center items-center bg-plus-grey rounded-full mr-4">
                    <img src={PlusSign} className="w-2 h-2" />
                  </p>
                  📝 Add Blogs
                </span>
              )}
              {!sections.includes("cta") && (
                <span
                  className="group w-full p-2 flex items-center hover:bg-plus-grey rounded"
                  onClick={() => addSection("cta")}
                >
                  <p className="group-hover:bg-white w-6 h-6 flex justify-center items-center bg-plus-grey rounded-full mr-4">
                    <img src={PlusSign} className="w-2 h-2" />
                  </p>
                  🔗 Add CTA
                </span>
              )}
            </p>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Button;
