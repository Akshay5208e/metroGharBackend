// temp file delete it after uoploading all the amenities images


import React,{useState} from 'react'
import {storage} from '../../../backend/firebase/utils'

function AddingAmenities() {

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const handleChange = e => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };

      const handleUpload = () => {
        const uploadTask = storage.ref(`images/features/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref("images/features")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                setUrl(url);
              });
          }
        );
      };

  return (
    <div>
         <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {url}
      <br />
    </div>
  )
}

export default AddingAmenities