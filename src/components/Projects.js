import React, { useState } from "react";
import PlusSign from "../assets/plusSign.png";
import Link from "../assets/link.png";
import Button from "../common/Button";
import Editor from "../common/Editor";
import ImageUpload from "../common/uploadImage";
import {
  setTitleText,
  setCount,
  setTitleImage,
  removeSections,
} from "../action";
import { useDispatch, useSelector } from "react-redux";

const proj = {
  projTitle: "",
  projLinks: "",
  projDescription: "",
};

const Projects = ({ preview }) => {
  const [projectsArray, setProjectsArray] = useState([{ ...proj }]);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.heroReducer);
  const sections = data["sections"] || [];

  const index = sections.indexOf("projects");
  const hidebutton = preview ? false : !(sections.length - index >= 2);

  const array =
    data["projArray"] && preview
      ? Array(data["projArray"]).fill(data["projArray"])
      : [];

  const arrayToPopulate = preview ? array : projectsArray;

  const addProjectsArray = () => {
    const projects = [...projectsArray];
    projects.push({ proj });
    setProjectsArray(projects);
  };

  const UploadImage = (data, key) => {
    dispatch(setTitleImage({ data, key }));
  };

  const saveData = () => {
    dispatch(setCount({ key: "projArray", data: projectsArray.length }));
    const data = document.getElementById("projectSubtext").innerHTML;
    dispatch(setTitleText({ data: data, key: "projectSubtext" }));
    for (let i = 0; i < projectsArray.length; i++) {
      const key1 = `projTitle${i}`;
      const key2 = `projLinks${i}`;
      const key3 = `projDescription${i}`;
      const skillsKey = document.getElementById(`${key1}`).innerHTML;
      const descriptionSkillsKey = document.getElementById(`${key2}`).innerHTML;
      const aboutSkillsKey = document.getElementById(`${key3}`).innerHTML;
      dispatch(setTitleText({ data: skillsKey, key: key1 }));
      dispatch(setTitleText({ data: descriptionSkillsKey, key: key2 }));
      dispatch(setTitleText({ data: aboutSkillsKey, key: key3 }));
    }
  };

  const cancel = () => {
    dispatch(removeSections("projects"));
  };

  const classAboutContainer = `${
    hidebutton && " border border-slate-300 rounded-3xl"
  }  w-full min-h-96 p-5 flex flex-col my-5"`;

  const innerClass = `${
    hidebutton && " border border-dashed border-slate-300 rounded-3xl"
  } w-[48%] min-h-64 mb-2 mx-2 p-5 bg-white rounded-3xl border"`;

  return (
    <section className="flex flex-row justify-center items-center px-20 min-h-128 py-10">
      <div className="w-0 lg:w-1/3"></div>
      <div className="w-full lg:w-2/3 h-full justify-center items-center flex flex-col px-20">
        {hidebutton && (
          <div className="font-bold flex self-end items-center pb-5">
            <p onClick={() => cancel()}>Cancel</p>
            <p
              className="bg-sky-500 p-2 rounded-2xl ml-3 w-20 text-center"
              onClick={() => saveData()}
            >
              Save
            </p>
          </div>
        )}
        <div className={classAboutContainer}>
          <h1 className="text-2xl mx-2 font-bold">Projects</h1>
          {!preview && (
            <Editor
              className="min-h-8 mx-2"
              placeholder="Add Subtext here"
              showToolBar={false}
              id="projectSubtext"
              editorInnerClassName="px-2"
            />
          )}

          {preview && (
            <div
              className="p-2"
              dangerouslySetInnerHTML={{
                __html: `${data["projectSubtext"]}`,
              }}
            />
          )}
          <div className="flex flex-wrap">
            {arrayToPopulate.map((val, index) => (
              <div className={innerClass}>
                {preview && (
                  <div className="h-8 w-8 flex justify-center items-center bg-zinc-100 mr-2">
                    <img
                      src={data[`projImage${index}`]}
                      className="h-8 w-8 border-hidden rounded"
                    />
                  </div>
                )}
                {!preview && (
                  <ImageUpload
                    classNameForParent="h-8 w-8 flex justify-center items-center bg-zinc-100 border border-dashed border-slate-300 rounded"
                    placeholderClass="h-4 w-4"
                    uploadImage={UploadImage}
                    classNameImage="rounded h-4 w-full border-hidden"
                    ImageKey={`projImage${index}`}
                  />
                )}
                {!preview && (
                  <Editor
                    id={`projTitle${index}`}
                    className="min-h-8 projectsTitle"
                    placeholder="Enter Project title..."
                  />
                )}
                {preview && (
                  <div
                    className="p-2 projectsTitle"
                    dangerouslySetInnerHTML={{
                      __html: `${data[`projTitle${index}`]}`,
                    }}
                  />
                )}
                <p className="flex items-center">
                  <img src={Link} className="h-2 w-2" />
                  {!preview && (
                    <Editor
                      id={`projLinks${index}`}
                      className="min-h-8"
                      placeholder="Add Links"
                      onlyLinks={true}
                    />
                  )}
                  {preview && (
                    <div
                      className="p-2"
                      dangerouslySetInnerHTML={{
                        __html: `${data[`projLinks${index}`]}`,
                      }}
                    />
                  )}
                </p>
                {!preview && (
                  <Editor
                    className="min-h-8"
                    placeholder="Enter Description"
                    id={`projDescription${index}`}
                  />
                )}
                {preview && (
                  <div
                    className="p-2"
                    dangerouslySetInnerHTML={{
                      __html: `${data[`projDescription${index}`]}`,
                    }}
                  />
                )}
              </div>
            ))}
            {hidebutton && (
              <div
                onClick={() => addProjectsArray()}
                className="w-[48%] border border-dashed border-slate-300 rounded-3xl mb-2 h-64 mx-2 flex justify-center items-center flex-col"
              >
                <img src={PlusSign} className="w-4 h-4" />
                <p>Add New Card</p>
              </div>
            )}
          </div>
        </div>
        {hidebutton && <Button onClick={() => saveData()} saveAndExec={true} />}
      </div>
    </section>
  );
};

export default Projects;
