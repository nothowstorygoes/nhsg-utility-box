import React, { useState } from "react";
import { readAndCompressImage } from "browser-image-resizer";
import "../css/landing.css";
import "../css/pngtoico.css";
import Footer from "../footer";
import GitAbsolute from "../gitAbsolute";
import BackButton from "../backButton";

const config = {
  quality: 1,
  maxWidth: 256,
  maxHeight: 256,
  autoRotate: false,
  debug: true,
};

export default function PNGtoICO() {
  const [icoUrl, setIcoUrl] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/png") {
      try {
        const resizedImage = await readAndCompressImage(file, config);
        const blob = new Blob([resizedImage], { type: "image/x-icon" });
        const url = URL.createObjectURL(blob);
        setIcoUrl(url);
      } catch (error) {
        console.error("Error converting PNG to ICO:", error);
      }
    } else {
      alert("Please upload a valid PNG file.");
    }
  };

  return (
    <main className="mainContainer">
        <BackButton />
        <GitAbsolute />
      <h1 className="title">PNG to ICO Converter</h1>
        <p className="subTitle">Convert a PNG image to an ICO file for your favicons</p>
        <div className="parentContainer">
      <input type="file" accept="image/png" onChange={handleFileUpload} className="inputImg"/>
      {icoUrl && (
        <div className="containerICO">
          <a href={icoUrl} download="converted.ico" className="linkImg">
            Download ICO
          </a>
        </div>
      )}
      </div>
        <Footer />
    </main>
  );
}