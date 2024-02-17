import React from "react";
import Button from "../common/Button";
import Editor from "../common/Editor";
import ImageUpload from "../common/uploadImage";
import { useSelector, useDispatch } from "react-redux";
import { setTitleImage, setTitleText } from "../action";

const HeroSection = ({ preview }) => {
  const {
    siteTitleImage: titleImage,
    personalImage,
    siteTitle,
    heroName,
    heroEmail,
    heroTitle,
    heroSubtext,
    sections: sections = [],
  } = useSelector((state) => state?.heroReducer);

  const dispatch = useDispatch();
  const uploadImage = (data, key) => {
    dispatch(setTitleImage({ data, key }));
  };

  const saveData = () => {
    const siteTitle = document.getElementById("siteTitle").innerHTML;
    const heroName = document.getElementById("heroName").innerHTML;
    const heroEmail = document.getElementById("heroEmail").innerHTML;
    const heroTitle = document.getElementById("heroTitle").innerHTML;
    const heroSubtext = document.getElementById("heroSubtext").innerHTML;
    dispatch(setTitleText({ data: siteTitle, key: "siteTitle" }));
    dispatch(setTitleText({ data: heroName, key: "heroName" }));
    dispatch(setTitleText({ data: heroEmail, key: "heroEmail" }));
    dispatch(setTitleText({ data: heroTitle, key: "heroTitle" }));
    dispatch(setTitleText({ data: heroSubtext, key: "heroSubtext" }));
  };

  return (
    <section className="px-40 lg:px-20 mt-5 pb-20">
      <div className="flex flex-row items-center">
        {preview && (
          <div className="h-8 w-8 flex justify-center items-center bg-zinc-100 mr-2">
            <img src={titleImage} className="h-8 w-8 border-hidden rounded" />
          </div>
        )}
        {!preview && (
          <ImageUpload
            classNameForParent="h-8 w-8 flex justify-center items-center bg-zinc-100 border border-dashed border-slate-300 rounded mr-2"
            placeholderClass="h-4 w-4"
            classNameImage="rounded h-8 w-full border-hidden"
            uploadImage={uploadImage}
            ImageKey="siteTitleImage"
          />
        )}
        {!preview && <Editor placeholder="Enter site title" id="siteTitle" />}
        {preview && (
          <div
            className="p-2"
            dangerouslySetInnerHTML={{ __html: siteTitle }}
          />
        )}
      </div>
      <></>

      {!preview && (
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col lg:flex-row min-h-80 justify-center items-center">
            <div className="w-1/3 h-52">
              <ImageUpload
                classNameForParent="justify-center items-center flex border border-dashed border-slate-300 rounded-3xl h-52"
                classNameImage="rounded-3xl h-52 w-full border-hidden"
                uploadImage={uploadImage}
                ImageKey="personalImage"
              />
            </div>
            <div className="w-2/3 min-h-80 flex justify-center items-center flex-col">
              <Editor
                placeholder="Click to Add Title"
                placeholderClass="text-left text-3xl"
                editorInnerClassName="flex justify-left pl-10"
                editorContainerClassName=""
                id="heroTitle"
                className="aboutTitle"
              />
              <Editor
                placeholder="Click to Add Subtitle"
                placeholderClass="justify-center items-center flex"
                editorInnerClassName="flex justify-left pl-10"
                id="heroSubtext"
              />
            </div>
          </div>
        </div>
      )}
      {preview && (
        <div className="w-full flex flex-col lg:flex-row lg:py-20">
          <div className="w-full lg:w-1/3 justify-center items-center flex border rounded-3xl h-96 lg:h-52 py-5 lg:py-10">
            <img
              src={personalImage}
              className="rounded-3xl h-96 lg:h-52 w-full border-hidden"
            />
          </div>
          <div className="w-full lg:w-2/3 justify-center items-center flex flex-col font-bold">
            <div className="w-full">
              {preview && (
                <div
                  className="aboutTitle flex lg:justify-center lg:items-center flex flex-col font-bold"
                  dangerouslySetInnerHTML={{ __html: heroTitle }}
                />
              )}
              {preview && (
                <div
                  className="flex lg:justify-center items-center"
                  dangerouslySetInnerHTML={{ __html: heroSubtext }}
                />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="w-2/3 flex flex-col">
        {preview ? (
          <div className="p-2" dangerouslySetInnerHTML={{ __html: heroName }} />
        ) : (
          <Editor placeholder="Your Name here" id="heroName" />
        )}
        {preview ? (
          <div
            className="p-2"
            dangerouslySetInnerHTML={{ __html: heroEmail }}
          />
        ) : (
          <Editor placeholder="Enter Email" id="heroEmail" />
        )}
      </div>
      {!sections.length && !preview && (
        <Button onClick={() => saveData()} saveAndExec={true} />
      )}
    </section>
  );
};

export default HeroSection;
