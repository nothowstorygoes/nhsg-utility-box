import React from "react";
import { Link } from "react-router-dom";

export default function BackButton() {
    return (
        <div style={styles.homeLink}>
            <Link to="/" style={styles.link}>
                <p style={styles.homeText}>Home</p>
            </Link>
        </div>
    );
}

const styles = {
    homeLink: {
        position: "absolute",
        top: "0",
        left: "0",
        margin: "10px",
        width: "7vw",
        height: "5vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    homeText: {
       fontFamily: "Inter",
         fontSize: "20px",
            color: "#fff",
        
    },
    link: {
        textDecoration: "none",
    },
};