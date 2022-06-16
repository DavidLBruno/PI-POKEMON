import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { getDetail } from "../../redux/action";
import styles from "./Detail.module.css"

export default function Detail(){
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getDetail(params.id));
    }, [dispatch, params.id]);

    const pokemonDetail = useSelector((state) => state.pokemonDetail.length && state.pokemonDetail[0]);

    if(pokemonDetail){
    return (
        <div>
            <div>
                <h2>{pokemonDetail.name}</h2>
                <Link to='/home'>
                    <button>Back</button>
                </Link>
            </div>

            <div>
                <img src={pokemonDetail.image} alt="Pokemon Image"/>
            </div>

            <div>
                <h3>Stats</h3>
                <h4>ID: {pokemonDetail.id}</h4>
                <h4>Healt Points (HP): {pokemonDetail.hp}</h4>
                <h4>Attack: {pokemonDetail.attack}</h4>
                <h4>Defense: {pokemonDetail.defense}</h4>
                <h4>Speed: {pokemonDetail.speed}</h4>
            </div>

            <div>
                <h3>Size</h3>
                <h4>Height: {pokemonDetail.height}</h4>
                <h4>Weight: {pokemonDetail.weight}</h4>
            </div>

            <div>
                <h3>Types</h3>
                { pokemonDetail &&
                    pokemonDetail.types.map((e) => (
                    <h4 key={e.name}>
                    {e.name}
                    </h4>
                    ))}
            </div>
        </div>
        );
    }else{
        return '';
    };
};