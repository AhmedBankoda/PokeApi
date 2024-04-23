import { ALL_POKEMON_SPECIES } from '../constants/pokemonSpecies';

// searchign the pokemon in constants because there is a cloud protection on direct search queries
const searchPokemons = (query: string): Promise<string[]> => {
    return new Promise((resolve) => {
        const matchingPokemons = ALL_POKEMON_SPECIES.filter(({ name }) =>
            name.includes(query.toLowerCase())
        ).map(({ name }) => name);
        // Artificial timeout for demonstration purposes
        setTimeout(() => {
            resolve(matchingPokemons);
        }, 500);
    });
};

export default searchPokemons;
