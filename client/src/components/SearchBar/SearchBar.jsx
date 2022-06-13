import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../../redux/action/index";
import styles from "./SearchBar.module.css";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [ name, setName ] = useState('');

    const hanldeInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getNamePokemon(name));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => {hanldeInputChange(e)}}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
};