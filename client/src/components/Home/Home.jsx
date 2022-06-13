import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, orderByName } from "../../redux/action";
import Card from "../Card/Card";
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Home.module.css";

export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemon);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPerPage] = useState(12);
    const indexOfLast = currentPage * pokemonPerPage;
    const indexOfFirst = indexOfLast - pokemonPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirst, indexOfLast);
    const [order, setOrder] = useState('');

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    useEffect(() => {
        dispatch(getPokemons());
        dispatch(orderByName(order))
        setCurrentPage(1);
    }, [allPokemons]);

    const handleSort = (e) =>{
        setCurrentPage(1);
        setOrder(e.target.value);
    };

    return (
        <div>
            <h1>POKEDEX</h1>
            <select onChange={ handleSort }>
                    <option value= 'none'>Filter</option>
                    <option value= 'stronger'>Stronger</option>
                    <option value= 'weakness'>Weakness</option>
                    <option value = 'asc'>A-Z</option>
                    <option value = 'des'>Z-A</option>
            </select>

            <SearchBar />


        <Paginated
            pokemonPerPage={pokemonPerPage}
            allPokemons={allPokemons.length}
            paginated={paginated}
        />

            {   currentPokemons?.map((e) => {
                return (
                    <Card name={e.name} type={e.Type} image={e.image} id={e.id}/>
                )
            })
            }

        {
            allPokemons.length === 0 && (
                <div>Loading...</div>
            )
        }

        </div>
    );
};