import React from "react";
import ImageUploading from "react-images-uploading";
import Image from "../assets/imageUpload.png";


function ImageUpload({
  classNameForParent,
  placeholderClass,
  uploadImage,
  ImageKey,
}) {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;
  const onChange = (imageList) => {
    uploadImage(imageList[0].data_url, ImageKey);
    setImages(imageList);
  };

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            {imageList.length === 0 && (
              <div onClick={onImageUpload} className={classNameForParent}>
                <img src={Image} className={placeholderClass} />
              </div>
            )}
            {imageList.map((image, index) => (
              <div onClick={onImageUpload} className={classNameForParent}>
                <img
                  src={image.data_url}
                  className={
                    ImageKey === "personalImage"
                      ? "w-full h-full border-hidden rounded-3xl"
                      : "w-full h-full border-hidden rounded"
                  }
                />
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default ImageUpload;
