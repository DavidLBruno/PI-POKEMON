import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ name, image, type, id }){
    return(
        <Link to={`/home/${id}`} className={styles.Card}>
            <div>
                <h3>{name}</h3>
                {   type &&
                    type.map(e => (
                        <h5 key={e.name}>{e.name}</h5>
                    ))
                }
                <img src={image} alt="Image not found"/>
            </div>
        </Link>
    );
};