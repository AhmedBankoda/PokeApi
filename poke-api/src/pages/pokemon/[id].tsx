import React from "react";
import axios from "axios";
import type { GetStaticProps, GetStaticPaths } from "next";
import { useQuery, QueryClient, dehydrate } from "react-query";
import { useRouter } from "next/router";
import PokemonCard from "../../components/PokemonCard";

const fetchPokemon = (id: string) => //fetching data from the api
    axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(({ data }) => data);

export default function Pokemon() {
    const router = useRouter();
    const pokemonID = typeof router.query?.id === "string" ? router.query.id : "";

    const { isSuccess, data: pokemon, isLoading, isError } = useQuery( //query to fetch the data 
        ["getPokemon", pokemonID],
        () => fetchPokemon(pokemonID),
        {
            enabled: pokemonID.length > 0,
            staleTime: Infinity
        }
    );
    console.log("Stats:", pokemon.stats);
    console.log("Stats:", pokemon.stats[0].base_stat);


    if (isSuccess) { //mapping the data from pokemon to the relevant data in pokemon card
        return (
            <div className="container"> 
                <PokemonCard
                    name={pokemon.name}
                    image={pokemon.sprites?.other?.["official-artwork"]?.front_default}
                    weight={pokemon.weight}
                    xp={pokemon.base_experience}
                    abilities={pokemon.abilities?.map((item: { ability: { name: any; }; }) => item.ability.name)}
                    HP={pokemon.stats[0].base_stat}
                    Attack={pokemon.stats[1].base_stat}
                    Defense={pokemon.stats[2].base_stat}
                    SpAtk={pokemon.stats[3].base_stat}
                    SpDef={pokemon.stats[4].base_stat}
                    Speed={pokemon.stats[5].base_stat}
                />
            </div>
        );
    }

    if (isLoading) {
        return <div className="center">Loading...</div>;
    }

    if (isError) {
        return (
            <div className="center">
                We couldnt find your pokemon{" "}
            </div>
        );
    }

    return <></>;
}

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id as string;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["getPokemon", id], () => fetchPokemon(id));

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    };
};
