import React, { useState } from "react";
import PlusSign from "../assets/plusSign.png";
import Button from "../common/Button";
import Editor from "../common/Editor";
import { setTitleText, setCount, removeSections } from "../action";
import { useSelector, useDispatch } from "react-redux";

const skills = {
  titleskills: "",
  descriptionSkills: "",
  aboutSkills: "",
};

const SkillSets = ({ preview }) => {
  const [skillsArray, setSkillsArray] = useState([{ ...skills }]);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.heroReducer);
  const sections = data["sections"] || [];

  const index = sections.indexOf("skillSets");
  const hidebutton = preview ? false : !(sections.length - index >= 2);

  const array =
    data["skillSets"] && preview
      ? Array(data["skillSets"]).fill(data["skillSets"])
      : [];

  const arrayToPopulate = preview ? array : skillsArray;

  const addNewCard = () => {
    const skills = [...skillsArray];
    skills.push({ ...skills });
    setSkillsArray(skills);
  };

  const saveSkills = () => {
    dispatch(setCount({ key: "skillSets", data: skillsArray.length }));
    for (let i = 0; i < skillsArray.length; i++) {
      const key1 = `titleskills${i}`;
      const key2 = `descriptionSkills${i}`;
      const key3 = `aboutSkills${i}`;
      const skillsKey = document.getElementById(`${key1}`).innerHTML;
      const descriptionSkillsKey = document.getElementById(`${key2}`).innerHTML;
      const aboutSkillsKey = document.getElementById(`${key3}`).innerHTML;
      dispatch(setTitleText({ data: skillsKey, key: key1 }));
      dispatch(setTitleText({ data: descriptionSkillsKey, key: key2 }));
      dispatch(setTitleText({ data: aboutSkillsKey, key: key3 }));
    }
  };

  const cancel = () => {
    dispatch(removeSections("skillSets"));
  };

  const classAboutContainer = `${
    hidebutton && "min-h-128 border border-slate-300 rounded-3xl"
  }  w-full p-5 w-full p-5 flex flex-wrap my-5"`;

  const insideContainer = `${
    hidebutton &&
    "min-h-128 border border-dashed border-slate-300 rounded-3xl mx-2 p-5 bg-white"
  }  w-[48%] mb-2 mx-2 p-5 border border border-slate-300 bg-white rounded-3xl "`;
  return (
    <section className="flex flex-row justify-center items-center min-h-128 px-20 py-10">
      <div className="w-0 lg:w-1/3"></div>
      <div className="w-full lg:w-2/3 justify-center items-center flex flex-col px-20">
        {hidebutton && (
          <div className="font-bold flex self-end items-center pb-5">
            <p onClick={() => cancel()}>Cancel</p>
            <p
              className="bg-sky-500 p-2 rounded-2xl ml-3 w-20 text-center"
              onClick={() => saveSkills()}
            >
              Save
            </p>
          </div>
        )}
        <div className={classAboutContainer}>
          {arrayToPopulate.map((val, index) => (
            <div className={insideContainer}>
              {!preview && (
                <Editor
                  id={`titleskills${index}`}
                  placeholder="Untitled..."
                  showToolBar={false}
                  className="skillsTitle"
                />
              )}
              {preview && (
                <div
                  className="p-2 skillsTitle"
                  dangerouslySetInnerHTML={{
                    __html: `${data[`titleskills${index}`]}`,
                  }}
                />
              )}
              {!preview && (
                <Editor
                  id={`descriptionSkills${index}`}
                  placeholder="Write description here...."
                  showToolBar={false}
                />
              )}
              {preview && (
                <div
                  className="p-2"
                  dangerouslySetInnerHTML={{
                    __html: `${data[`descriptionSkills${index}`]}`,
                  }}
                />
              )}
              {!preview && (
                <Editor
                  id={`aboutSkills${index}`}
                  placeholder="Start writing..."
                  showToolBar={true}
                />
              )}
              {preview && (
                <div
                  className="p-2"
                  dangerouslySetInnerHTML={{
                    __html: `${data[`aboutSkills${index}`]}`,
                  }}
                />
              )}
            </div>
          ))}
          {hidebutton && (
            <div
              onClick={() => addNewCard()}
              className="w-[48%] border border-dashed border-slate-300 rounded-3xl mb-2 mx-2 flex justify-center items-center flex-col min-h-128"
            >
              <img src={PlusSign} className="w-4 h-4" />
              <p>Add New Card</p>
            </div>
          )}
        </div>
        {hidebutton && (
          <Button onClick={() => saveSkills()} saveAndExec={true} />
        )}
      </div>
    </section>
  );
};

export default SkillSets;
