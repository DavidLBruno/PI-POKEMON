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
        if(name){
            dispatch(getNamePokemon(name));
        }else{
            alert('Enter a valid name');
        };
    };

    return (
<div className={styles.box}>
	<div class={styles.inputContainer}>
		<input type="text" required=""/>
		<label>Full Name</label>
	</div>
</div>
    )
};