import React from "react";

export default function Footer() {
  return (
    <footer style={style}>
      Be kind. Love yourself. <br />
      Made with &#x2764; by nothowstorygoes.
    </footer>
  );
}

const style={
        position: "absolute",
        bottom: "0",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Inter",
        color: "#fff",
        fontSize: "1em",
        fontWeight: "200",
        marginTop: "20vh",
        textAlign: "center",
        marginBottom: "1em"
    }
