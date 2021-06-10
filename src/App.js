import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import PokemonCard from "./PokemonCard";



function App() {

    const [pokenames, setPokenames] = useState(null);
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        setPokenames(null)
        console.log("fetch name here")

        async function fetchnames() {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
            console.log(response.data.results);
            setPokenames(response.data);
        }

        fetchnames();
    }, [offset]);

    console.log(pokenames);
    if (!pokenames) {
        return <h3>LOADING</h3>
    }

    // useEffect -> api pokemon -> [{ name: "bulbasaur"}, { name: "ivysaur"}]
    return (
        <>

            <div className="img-div">
                <h2>Pokemon</h2>
            </div>

            <div className="container-button">
                <button type="button"
                        disabled={!pokenames.previous}
                        onClick={() => setOffset(offset => offset - 20)}
                > Previous
                </button>

                <button type="button"
                        disabled={!pokenames.next}
                        onClick={() => setOffset(offset => offset + 20)}
                > Next
                </button>
            </div>
            <div className="card-wrapper">
                {pokenames.results.map((pokemon, i) => {
                    return <PokemonCard key={i} nameOfPokemon={pokemon.name}/>;
                })}
            </div>
        </>

    );
}

export default App;