import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ name, image, type, id }){
    return(
        <Link to={`/home/${id}`}>
            <div>
                <h3>{name}</h3>
                {
                    type.map(e => (
                        <h5>{e.name}</h5>
                    ))
                }
                <img src={image} alt="Image not found"/>
            </div>
        </Link>
    );
};