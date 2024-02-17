import React, { useState } from "react";
import PlusSign from "../assets/plusSign.png";
import Link from "../assets/link.png";
import Button from "../common/Button";
import Editor from "../common/Editor";
import ImageUpload from "../common/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitleText,
  setCount,
  setTitleImage,
  removeSections,
} from "../action";

const blog = {
  expTitle: "",
  expDesignation: "",
  expDescription: "",
};

const Blogs = ({ preview }) => {
  const [blogs, setBlogs] = useState([{ ...blog }]);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.heroReducer);
  const sections = data["sections"] || [];

  const index = sections.indexOf("blogs");
  const hidebutton = preview ? false : !(sections.length - index >= 2);

  const array =
    data["blogsArray"] && preview
      ? Array(data["blogsArray"]).fill(data["blogsArray"])
      : [];

  const arrayToPopulate = preview ? array : blogs;

  const UploadImage = (data, key) => {
    dispatch(setTitleImage({ data, key }));
  };

  const addBlogs = () => {
    const bloga = [...blogs];
    bloga.push(blog);
    setBlogs(bloga);
  };

  const saveData = () => {
    dispatch(setCount({ key: "blogsArray", data: blogs.length }));
    const data = document.getElementById("blogSubtext").innerHTML;
    dispatch(setTitleText({ data: data, key: "blogSubtext" }));
    for (let i = 0; i < blogs.length; i++) {
      const key1 = `blogTitle${i}`;
      const key2 = `blogLinks${i}`;
      const skillsKey = document.getElementById(`${key1}`).innerHTML;
      const descriptionSkillsKey = document.getElementById(`${key2}`).innerHTML;
      dispatch(setTitleText({ data: skillsKey, key: key1 }));
      dispatch(setTitleText({ data: descriptionSkillsKey, key: key2 }));
    }
  };

  const cancel = () => {
    dispatch(removeSections("blogs"));
  };

  const classAboutContainer = `${
    hidebutton && "border border-slate-300 rounded-3xl"
  } w-full min-h-96 p-5 flex flex-col my-5"`;

  const innerClass = `${
    hidebutton && "border border-dashed border-slate-300  "
  } w-[48%] mb-2 h-64 mx-2 p-5 bg-white rounded-3xl "`;

  return (
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
          <h1 className="text-2xl mx-2">Blogs</h1>
          {!preview && (
            <Editor
              placeholder="Add Subtext here"
              id={`blogSubtext`}
              editorInnerClassName="px-2"
            />
          )}
          {preview && (
            <div className="p-2">
              <div
                className="p-2"
                dangerouslySetInnerHTML={{
                  __html: `${data[`blogSubtext`]}`,
                }}
              />
            </div>
          )}
          <div className="flex flex-wrap">
            {arrayToPopulate.map((val, index) => (
              <div className={innerClass}>
                {!preview && (
                  <ImageUpload
                    classNameForParent="h-8 w-8 flex justify-center items-center bg-zinc-100 border border-dashed border-slate-300 rounded"
                    placeholderClass="h-4 w-4"
                    uploadImage={UploadImage}
                    ImageKey={`blogsImage${index}`}
                    classNameImage="rounded h-4 w-full border-hidden"
                  />
                )}
                {preview && (
                  <div className="p-2">
                    <img
                      src={data[`blogsImage${index}`]}
                      className="h-8 w-8 border-hidden rounded"
                    />
                  </div>
                )}
                {!preview && (
                  <Editor
                    placeholder="Enter Title..."
                    id={`blogTitle${index}`}
                  />
                )}

                {preview && (
                  <div
                    className="p-2 aboutTitle"
                    dangerouslySetInnerHTML={{
                      __html: `${data[`blogTitle${index}`]}`,
                    }}
                  />
                )}

                <p className="flex items-center">
                  <img src={Link} className="h-2 w-2" />
                  {!preview && (
                    <Editor
                      className="min-h-8"
                      placeholder="Add Links"
                      onlyLinks={true}
                      id={`blogLinks${index}`}
                    />
                  )}
                  {preview && (
                    <div
                      className="p-2"
                      dangerouslySetInnerHTML={{
                        __html: `${data[`blogLinks${index}`]}`,
                      }}
                    />
                  )}
                </p>
              </div>
            ))}
            {hidebutton && (
              <div
                onClick={() => addBlogs()}
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

export default Blogs;
