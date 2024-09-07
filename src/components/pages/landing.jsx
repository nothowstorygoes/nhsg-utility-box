import React from "react";
import UtilityButton from "../utilitybutton";
import "../css/landing.css";
import Animated3DModel from "../animated3DModel";
import GitAbsolute from "../gitAbsolute";
import Footer from "../footer";
export default function LandingPage() {
  return (
    <main className="mainContainer">
      <div className="bg">
        <Animated3DModel path="/scene.glb" scale="25" />
      </div>
      <div className="bg2">
        <Animated3DModel path="/abstract.glb" scale="0.07" />
      </div>
      <h1 className="title">nhsg's utility box</h1>
      <p className="subTitle">A collection of the most used tools</p>
        <GitAbsolute />
      <div className="utilityContainer">
        <UtilityButton
          utility="JSON Visualizer"
          descr="Tool to view the hierarchy of your JSON"
          link="JSON"
        />
        <UtilityButton
          utility="Manifest Generator"
          descr="Generate automatically a manifest.json for your app"
          link="Manifest"
        />
        <UtilityButton
          utility="PNG to ICO"
          descr="Convert your logo from .png to .ico seamlessly"
          link="PNGtoICO"
        />
      </div>
      <Footer />
    </main>
  );
}
