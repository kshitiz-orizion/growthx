import React, { useState } from "react";
import PlusSign from "../assets/plusSign.png";
import Button from "../common/Button";
import Editor from "../common/Editor";
import ImageUpload from "../common/uploadImage";
import DatePicker from "../common/DatePicker";
import {
  setTitleText,
  setCount,
  setTitleImage,
  removeSections,
} from "../action";

import Dropdown from "react-dropdown";

import data from "../JSON/state";
import { useDispatch, useSelector } from "react-redux";

const options = [...data];
const exp = {
  expTitle: "",
  expDesignation: "",
  expDescription: "",
};

const Experience = ({ preview }) => {
  const [experience, setExprience] = useState([{ ...exp }]);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.heroReducer);

  const sections = data["sections"] || [];

  const index = sections.indexOf("experience");
  const hidebutton = preview ? false : !(sections.length - index >= 2);

  const array =
    data["expArray"] && preview
      ? Array(data["expArray"]).fill(data["projArray"])
      : [];

  const arrayToPopulate = preview ? array : experience;

  const addExperience = () => {
    const exp1 = [...experience];
    exp1.push(exp);
    setExprience(exp1);
  };

  const UploadImage = (data, key) => {
    dispatch(setTitleImage({ data, key }));
  };

  const onSelect = (e, key) => {
    dispatch(setTitleText({ data: e.value, key }));
  };

  const setTo = (value, index) => {
    console.log(value, index);
    dispatch(setTitleText({ data: value, key: `to${index}` }));
  };

  const setFrom = (value, index) => {
    dispatch(setTitleText({ data: value, key: `from${index}` }));
  };

  const saveData = () => {
    dispatch(setCount({ key: "expArray", data: experience.length }));
    const data = document.getElementById("expSubtext").innerHTML;
    dispatch(setTitleText({ data: data, key: "expSubtext" }));
    for (let i = 0; i < experience.length; i++) {
      const key1 = `expTitle${i}`;
      const key2 = `expDesignation${i}`;
      const key3 = `expDescription${i}`;
      const skillsKey = document.getElementById(`${key1}`).innerHTML;
      const descriptionSkillsKey = document.getElementById(`${key2}`).innerHTML;
      const aboutSkillsKey = document.getElementById(`${key3}`).innerHTML;
      dispatch(setTitleText({ data: skillsKey, key: key1 }));
      dispatch(setTitleText({ data: descriptionSkillsKey, key: key2 }));
      dispatch(setTitleText({ data: aboutSkillsKey, key: key3 }));
    }
  };

  const cancel = () => {
    dispatch(removeSections("experience"));
  };

  const classAboutContainer = `${
    hidebutton && "border-slate-300  border rounded-3xl"
  } w-full min-h-96 p-5 flex flex-col my-5"`;

  const innerClass = `${
    hidebutton && "border border-dashed border-slate-300 rounded-3xl"
  } w-full rounded-3xl mb-2 mx-2 p-5 bg-white flex flex-col min-h-96"`;

  return (
    <div>
      <section className="flex flex-row justify-center items-center px-20 min-h-128 py-10">
        <div className="w-0 lg:w-1/3"></div>
        <div className="w-full lg:w-2/3 h-full justify-center items-center flex flex-col px-20">
          {hidebutton && (
            <div className="flex self-end items-center pb-5">
              <p className="font-bold" onClick={() => cancel()}>
                Cancel
              </p>
              <p
                className="bg-sky-500 p-2 rounded-2xl ml-3 w-20 text-center font-bold"
                onClick={() => saveData()}
              >
                Save
              </p>
            </div>
          )}
          <div className={classAboutContainer}>
            <h1 className="text-2xl mx-2 font-bold">Experience</h1>
            {!preview && (
              <Editor
                editorInnerClassName="px-2"
                className="!px-2"
                placeholder="Add Subtext here"
                id="expSubtext"
              />
            )}
            {preview && (
              <div
                className="p-2"
                dangerouslySetInnerHTML={{
                  __html: `${data["expSubtext"]}`,
                }}
              />
            )}
            {arrayToPopulate.map((val, index) => (
              <div className="flex flex-wrap">
                <div className={innerClass}>
                  <div className="flex flex-row">
                    {!preview && (
                      <ImageUpload
                        classNameForParent="h-12 w-12 flex justify-center items-center bg-zinc-100 border border-dashed border-slate-300 rounded"
                        placeholderClass="h-4 w-4"
                        uploadImage={UploadImage}
                        ImageKey={`expImage${index}`}
                        classNameImage="rounded h-4 w-full border-hidden"
                      />
                    )}
                    {preview && (
                      <div className="p-2">
                        <img
                          src={data[`expImage${index}`]}
                          className="h-8 w-8 border-hidden rounded"
                        />
                      </div>
                    )}
                    {preview && (
                      <div
                        className="p-2"
                        dangerouslySetInnerHTML={{
                          __html: `${data[`expTitle${index}`]}`,
                        }}
                      />
                    )}
                    {preview && (
                      <div
                        className="p-2"
                        dangerouslySetInnerHTML={{
                          __html: `${data[`expDesignation${index}`]}`,
                        }}
                      />
                    )}
                    {preview && <p className="p-2">{data[`dropDown${index}`]}</p>}
                    {preview &&
                      <p className="p-2">`${data[`to${index}`]} - ${data[`from${index}`]}`</p>}
                    {!preview && (
                      <div className="mx-5 w-full">
                        <Editor
                          placeholder="Enter Company Title"
                          id={`expTitle${index}`}
                          className="projectsTitle"
                        />

                        <Editor
                          placeholder="Add Designation"
                          id={`expDesignation${index}`}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex mt-5">
                    <div className="flex justify-center items-center mr-10">
                      {!preview && (
                        <>
                          <img src={PlusSign} className="w-2 h-2 mr-2" />
                          <Dropdown
                            placeholderClassName="text-gray-400 text-sm"
                            arrowClassName="hidden"
                            className="border-none"
                            controlClassName="border-none"
                            placeholder="Add Location"
                            onChange={(e) => onSelect(e, `dropDown${index}`)}
                            options={options}
                            value={null}
                          />
                        </>
                      )}
                    </div>
                    <div className="flex justify-center items-center">
                      {!preview && (
                        <>
                          <img src={PlusSign} className="w-2 h-2 mr-2" />

                          <DatePicker
                            setToDateExp={(value) => setTo(value, index)}
                            setFromDateExp={(value) => setFrom(value, index)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-5">
                    {!preview && (
                      <Editor
                        placeholder="Add Description"
                        id={`expDescription${index}`}
                      />
                    )}
                    {preview && (
                      <div
                        className="p-2"
                        dangerouslySetInnerHTML={{
                          __html: `${data[`expDescription${index}`]}`,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {hidebutton && (
              <div className="flex flex-wrap w-full">
                <Button disableDrop onClick={() => addExperience()} />
              </div>
            )}
          </div>
          {hidebutton && (
            <Button onClick={() => saveData()} saveAndExec={true} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Experience;
