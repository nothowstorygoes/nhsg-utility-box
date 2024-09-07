import React from "react";

export default function GitAbsolute() {
    return (
        <div className="gitLink" style={styles.gitLink}>
            <a href="https://www.github.com/nothowstorygoes">
                <img src="/git.png" alt="" className="gitImage" style={styles.gitImage} />
            </a>
        </div>
    );
}

const styles = {
    gitLink: {
        position: "absolute",
        top: "0",
        right: "0",
        margin: "10px",
    },
    gitImage: {
        width: "40px",
        height: "40px",
    },
};