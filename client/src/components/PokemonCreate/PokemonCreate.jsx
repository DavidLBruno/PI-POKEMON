import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { validate } from "./validator.js";
import { createPokemon } from "../../redux/action";
import styles from "./PokemonCreate.module.css"

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const typesData = useSelector((state) => state.types);

    const [error, setError] = useState([]);
    const [input, setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
    });
    const [types, setTypes] = useState([]);

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        )
    };

    const handleTypesChange = (e) => {
        if (e.target.checked) {
            setTypes([...types, e.target.value]);
        } else {
            let pos = types.indexOf(e.target.id);
            types.splice(pos, 1);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!error[0] && types.length) {
            alert("Pokemon created!");
            dispatch(createPokemon({ ...input, type: types }));
            setInput({
                name: "",
                hp: "",
                attack: "",
                defense: "",
                speed: "",
                height: "",
                weight: "",
                image: "",
            });
            setTypes([]);
            e.target.reset();
            }else if(error[0] === undefined){
                alert('Select a Type');
            }else{
                alert(error[0]);
            }
    };

    return (
        <div>
            <div className={styles.nav}>
                <h1>Create Pokemon</h1>
                <Link to='/home'>
                    <button className={styles.button}>Back</button>
                </Link>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>

                <div className={styles.stats}>
                    <div>
                        <label>Name: </label>
                        <input
                            name="name"
                            type="text"
                            value={input.name}
                            placeholder="Name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                    <label>Healt Points (HP): </label>
                        <input
                            name="hp"
                            type="number"
                            value={input.hp}
                            placeholder="HP"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label>Attack: </label>
                        <input
                            name="attack"
                            type="number"
                            value={input.attack}
                            placeholder="Attack"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label>Defense: </label>
                        <input
                            name="defense"
                            type="number"
                            value={input.defense}
                            placeholder="Defense"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label>Speed: </label>
                        <input
                            name="speed"
                            type="number"
                            value={input.speed}
                            placeholder="Speed"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label>Height: </label>
                        <input
                            name="height"
                            type="number"
                            value={input.height}
                            placeholder="Height"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label>Weight: </label>
                        <input
                            name="weight"
                            type="number"
                            value={input.weight}
                            placeholder="Weight"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label>Image Link: </label>
                        <input
                            name="image"
                            type="text"
                            value={input.image}
                            placeholder="Image"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                    <div>
                        <h3>Types</h3>
                        {
                            typesData.map((e) => (
                                <div key={e.id}>
                                <label>{e.name}</label>
                                    <input
                                    key={e.id}
                                    type='checkbox'
                                    value={e.name}
                                    id={e.id}
                                    onChange={(e) => handleTypesChange(e)}
                                    />
                                </div>
                            ))
                        }
                    </div>

                <button>Create</button>
            </form>

        </div>
    );
};
