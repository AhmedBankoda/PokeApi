import Link from "next/link";

const PokemonsSearchResult = ({ pokemons }: { pokemons: string[] }) => { //displaying the pokemon array 
    return pokemons.length > 0 ?                                         // in grid format with links to pokemon card page
        (
            <div className="search-grid">
                {pokemons.map((pokemon) => (
                    <Link href={`/pokemon/${pokemon}`} key={pokemon}>
                        <div className="pokemon-card">{pokemon}</div>
                    </Link>
                ))}
            </div>
        ) :
        (
            <div className="search-message">Search for Valid Pokemon</div>
        )
    ;
};

export default PokemonsSearchResult;