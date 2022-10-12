import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound({ msg = "No VideoGames!" }) {
    const history = useHistory();
    return (
        <div className={styles.notFound}>
            <div className={styles.card}>
                <div className={styles.img}></div>
                <div className={styles.text}>{msg}</div>
                {msg !== "Ups no hay juegos!" && (
                    <div className={styles.bottom}>
                        <button
                            className={styles.btn}
                            onClick={() => history.push("/home")}
                        >
                            Back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
