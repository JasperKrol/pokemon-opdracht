import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";

function PokemonCard ({nameOfPokemon, click}) {



    const [pokemon, setPokemon] = useState(null)
    console.log("what is the state", pokemon)

    // conditional rendering

    useEffect(() => {
        console.log("ON MOUNT:");
        async function fetchData() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameOfPokemon}`);
                // zet de data in pokemon, rerender
                setPokemon(result.data);
                // console.log(result.data)
            } catch (e) {
                console.error(e);
            }
        }

        fetchData()

    }, [click]);


    console.log("what is the state", pokemon)

    return (
        <div className="poke-card">

            { pokemon && <>

                <h3 className="name">{pokemon.name}</h3>
                <img className="image" src={pokemon.sprites.front_shiny} alt=""/>
                <h3>Moves: {pokemon.moves.length}</h3>
                <div className="abilities">
                    {pokemon.abilities.map((ability) => {
                     return <p>{ability.ability.name}</p>;
                    })}
                </div>
                <h3>Weight: {pokemon.weight}</h3>

            </>}
        </div>
    )
}

export default PokemonCard