import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "../css/landing.css";
import BackButton from "../backButton";
import GitAbsolute from "../gitAbsolute";
import Footer from "../footer";
import "../css/manifest.css";

export default function Manifest() {
  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    start_url: "",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
  });
  const [image, setImage] = useState(null);
  const [manifest, setManifest] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const resizeImage = (file, sizes) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const resizedImages = sizes.map((size) => {
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, size, size);
          return {
            src: `icon-${size}x${size}.png`,
            sizes: `${size}x${size}`,
            type: file.type,
          };
        });
        resolve(resizedImages);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sizes = [512, 128, 256, 384];
    const resizedImages = image ? await resizeImage(image, sizes) : [];
    const manifestData = {
      ...formData,
      icons: resizedImages,
    };
    setManifest(manifestData);

    // Create a zip file
    const zip = new JSZip();
    resizedImages.forEach((img, index) => {
      const base64Data = img.src.split(",")[1];
      zip.file(`icon-${sizes[index]}x${sizes[index]}.png`, base64Data, { base64: true });
    });
    console.log("ok");
    zip.file("manifest.json", JSON.stringify(manifestData, null, 2));
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "manifest.zip");
  };

  return (
    <main className="mainContainer">
        <BackButton />
        <GitAbsolute />
      <h1 className="title">Generate manifest.json</h1>
      <p className="subTitle">Fill out the form, upload your logo and hit "Generate Manifest".</p>
      <div className="manifestInfo">
      <form onSubmit={handleSubmit} className="formManifest">
        <div className="formColumn">
        <div className="formDiv">
          <label className="formLabel">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="formInput"/>
        </div>
        <div className="formDiv">
          <label className="formLabel">Short Name:</label>
          <input type="text" name="short_name" value={formData.short_name} onChange={handleChange} required className="formInput"/>
        </div>
        <div className="formDiv"> 
          <label className="formLabel">Start URL:</label>
          <input type="text" name="start_url" value={formData.start_url} onChange={handleChange} required className="formInput"/>
        </div>
        <div className="formDiv">
          <label className="formLabel">Display:</label>
          <select name="display" value={formData.display} onChange={handleChange} className="formSelect">
            <option value="standalone">Standalone</option>
            <option value="fullscreen">Fullscreen</option>
            <option value="minimal-ui">Minimal UI</option>
            <option value="browser">Browser</option>
          </select>
        </div>
        </div>
        <div className="formColumn">
        <div className="formDiv2">
          <label className="formLabel">Background Color: &nbsp;</label>
          <input type="color" name="background_color" value={formData.background_color} onChange={handleChange}/>
        </div>
        <div className="formDiv2">
          <label className="formLabel">Theme Color:&nbsp;</label>
          <input type="color" name="theme_color" value={formData.theme_color} onChange={handleChange}/>
        </div>
        <div className="formDiv3"> 
          <label className="formLabel">Upload Icon: &nbsp;</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="formInputImg"/>
        </div>
        <button type="submit" className="submitButton">Generate manifest.json</button>

        </div>

      </form>
      
        </div>
       <Footer />
    </main>
  );
}