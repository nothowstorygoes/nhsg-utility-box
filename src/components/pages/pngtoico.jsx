import React, { useState } from "react";
import "../css/landing.css";
import "../css/pngtoico.css";
import Footer from "../footer";
import GitAbsolute from "../gitAbsolute";
import BackButton from "../backButton";

export default function PNGtoICO() {
  const [icoUrl, setIcoUrl] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 256;
          canvas.height = 256;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, 256, 256);
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            setIcoUrl(url);
          }, "image/x-icon");
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
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
        <input type="file" accept="image/png" onChange={handleFileUpload} className="inputImg" />
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