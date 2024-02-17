import React from "react";
import Editor from "../common/Editor";
import ImageUpload from "../common/uploadImage";
import { setTitleText, setTitleImage, removeSections } from "../action";
import { useDispatch, useSelector } from "react-redux";

const Contact = ({ preview }) => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.heroReducer);
  const sections = data["sections"] || [];

  const index = sections.indexOf("cta");
  const hidebutton = preview ? false : !(sections.length - index >= 2);

  const UploadImage = (data, key) => {
    dispatch(setTitleImage({ data, key }));
  };

  const save = () => {
    const key1 = `contactTitle`;
    const key2 = `contactSubtext`;
    const skillsKey = document.getElementById(`${key1}`).innerHTML;
    const descriptionSkillsKey = document.getElementById(`${key2}`).innerHTML;
    dispatch(setTitleText({ data: skillsKey, key: key1 }));
    dispatch(setTitleText({ data: descriptionSkillsKey, key: key2 }));
  };

  const cancel = () => {
    dispatch(removeSections("cta"));
  };

  const aboutClass = `${
    hidebutton && "border border-slate-300 rounded-3xl"
  } min-h-4/5 w-full pl-5 pt-5 "`;
  return (
    <section className="flex flex-row justify-center items-center px-20 min-h-96">
      <div className="w-0 lg:w-1/3"></div>
      <div className="w-full lg:w-2/3 h-full justify-center items-center flex flex-col px-20">
        {hidebutton && <div className="flex self-end items-center pb-5">
          <p className="font-bold" onClick={() => cancel()}>
            Cancel
          </p>
          <p
            className="bg-sky-500 p-2 font-bold rounded-2xl ml-3 w-20 text-center"
            onClick={() => save()}
          >
            Save
          </p>
        </div>}
        <div className={aboutClass}>
          {!preview && (
            <Editor
              placeholder="Enter Title here"
              className="aboutTitle"
              id="contactTitle"
            />
          )}
          {preview && (
            <div
              className="p-2 aboutTitle"
              dangerouslySetInnerHTML={{
                __html: `${data["contactTitle"]}`,
              }}
            />
          )}
          {!preview && (
            <Editor placeholder="Add Subtext here" id="contactSubtext" />
          )}
          {preview && (
            <div
              className="p-2"
              dangerouslySetInnerHTML={{
                __html: `${data["contactSubtext"]}`,
              }}
            />
          )}
          <div className="flex flex-row py-10">
            {!preview && (
              <ImageUpload
                placeholderClass="h-4 w-4"
                classNameForParent="h-12 w-12 flex justify-center items-center bg-zinc-100 border border-dashed border-slate-300 rounded"
                uploadImage={UploadImage}
                ImageKey="contactImage"
              />
            )}
            {preview && (
              <div className="p-2">
                <img
                  src={data[`contactImage`]}
                  className="h-8 w-8 border-hidden rounded"
                />
              </div>
            )}
            <div className="mx-5 flex justify-center items-center">
              <p>Lets connect</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
