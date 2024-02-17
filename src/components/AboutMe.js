import React, { useEffect } from "react";
import Button from "../common/Button";
import Editor from "../common/Editor";
import { useDispatch, useSelector } from "react-redux";
import { removeSections, setTitleText } from "../action";

const AboutMe = ({ preview }) => {
  const dispatch = useDispatch();

  const { aboutDescription, sections: sections = [] } = useSelector(
    (state) => state.heroReducer
  );

  const index = sections.indexOf("about");
  const hidebutton = preview ? false : !(sections.length - index >= 2);

  const saveString = () => {
    const siteTitle = document.getElementById("aboutDescription").innerHTML;
    dispatch(setTitleText({ data: siteTitle, key: "aboutDescription" }));
  };

  const cancel = () => {
    dispatch(removeSections("about"));
  };

  const classAboutContainer = `${
    hidebutton && "border border-slate-300 rounded-3xl min-h-80"
  } w-full p-5 my-5 border"`;
  return (
    <div>
      <section className="min-h-96 flex flex-row justify-center items-center px-20">
        <div className="w-0 lg:w-1/3"></div>
        <div className="w-full lg:w-2/3 h-full justify-center items-center flex flex-col px-20">
          {!!hidebutton && (
            <div className="flex self-end items-center pb-5">
              <p className="font-bold" onClick={() => cancel()}>
                Cancel
              </p>
              <p
                className="font-bold bg-sky-500 p-2 rounded-2xl ml-3 w-20 text-center"
                onClick={() => saveString("aboutDescription")}
              >
                Save
              </p>
            </div>
          )}
          <div className={classAboutContainer}>
            <p className="font-bold">About Me</p>
            {!preview && (
              <Editor
                className="min-h-80"
                placeholder="Start writing..."
                id="aboutDescription"
                textType="bold"
                type="large"
              />
            )}
            {preview && (
              <div
                className="p-2"
                dangerouslySetInnerHTML={{ __html: aboutDescription }}
              />
            )}
          </div>
          {!!hidebutton && (
            <Button onClick={() => saveString()} saveAndExec={true} />
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
