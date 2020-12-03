import React, { useState, useEffect } from "react"
import ImageUploading from "react-images-uploading"
import axios from 'axios'

const Upload = ({userId, addChange}) => {

  const [images, setImages] = useState([])
  const maxNumber = 69

  useEffect(() => {
        if (images[0]) {
          addChange(images[0].url_base)
          var bodyFormData = new FormData();
          bodyFormData.append('avatar', images[0].file);
          axios({
            method: 'post',
            url: `http://localhost:1337/api/user/avatar/${userId}`,
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            })
        }
      return () => {
          // cleanup
     }
  }, [images])

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex)
    // Function which adds the image to the database goes here.
    setImages(imageList)
  }

  return (
    <div className="Upload">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
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
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

export default Upload
