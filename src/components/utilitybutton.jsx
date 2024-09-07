import React from "react";
import { Link } from "react-router-dom";
import "./utilitybutton.css";

export default function UtilityButton(name){
  return (
    <Link to={name.link} className="link">
    <button
      className="utility-button"
    >
      <p className="titleButton">{name.utility}</p>
      <br />
      <br />
      <p className="descr">{name.descr}</p>
    </button>
    </Link>
  );
}