import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface PokemonsByTypeProps {
    id: number; // Pass the type ID as a prop
}
const PokemonsByType: React.FC<PokemonsByTypeProps> = ({ id }) => {
    const [pokemonNames, setPokemonNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            
            const response = await axios.get(`https://pokeapi.co/api/v2/type/${id}/`); //call to the api that stores the values in repsonse
            console.log('API Response:', response.data);
           
            if (response.data.pokemon && Array.isArray(response.data.pokemon)) {
                const pokemons = response.data.pokemon;
                const names = pokemons.map((pokemon: { pokemon: { name: any; }; }) => pokemon.pokemon.name); // mapping the data properly
                setPokemonNames(names);
            } else {
                console.error('Unexpected response structure:', response.data);
                setPokemonNames([]); // Set an empty array to avoid breaking the component
            }
            
        };

        fetchPokemons();
    }, [id]); // Trigger the effect whenever the ID changes

    return ( // simple showing of the pokemon names with links to their pokemon cards
        <div className="search-grid">
            {pokemonNames.map((name) => (
                <Link href={`/pokemon/${name}`} key={name}>
                    <div className="pokemon-card">{name}</div>
                </Link>
            ))}
        </div>
    );
};

export default PokemonsByType;
