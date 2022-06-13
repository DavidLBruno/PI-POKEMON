import React from "react";
import styles from "./Paginated.module.css";

export default function Paginated({ pokemonPerPage, allPokemons, paginated }){
    const pageNumbers = [];
    for(let i = 0; i < Math.ceil(allPokemons / pokemonPerPage); i++){
        pageNumbers.push(i + 1);
    };
    return (
        <div>
            {
                pageNumbers &&
                pageNumbers.map(e => (
                    <div>
                        <button onClick={() => paginated(e)}>{e}</button>
                    </div>
                ))
            }
        </div>
    )
};