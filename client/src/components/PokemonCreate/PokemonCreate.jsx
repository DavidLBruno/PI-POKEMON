import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPokemon } from "../../redux/action";

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const typesData = useSelector((state) => state.types);

    const [error, setError] = useState({});
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
    };

    const handleChange = (e) => {
        setTypes([ ...types, e.target.value ]);
        console.log(types)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
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
        setTypes([])
    };

    return (
        <div>
            <div>
                <h1>Create Pokemon</h1>
                <Link to='/home'>
                    <button>Back</button>
                </Link>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>

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

                    <div>
                        <h3>Types</h3>
                        {
                            typesData.map((e) => (
                                <div key={e.id}>
                                    <input
                                    key={e.id}
                                    type='button'
                                    value={e.name}
                                    id={e.id}
                                    onClick={(e) => handleChange(e)}
                                    />
                                </div>
                            ))
                        }
                    </div>

                </div>
                <button>Create</button>
            </form>

        </div>
    );
};
