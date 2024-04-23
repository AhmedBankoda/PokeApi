import { useQuery } from "react-query";
import React, { useState } from 'react';
import useDebounce from "../utils/useDebounce";
import searchPokemons from "../utils/searchPokemons";
import PokemonsSearchResult from "../components/PokemonsSearchResult";
import PokemonsByType from "../components/PokemonsByType";

export default function IndexPage() {
    const [searchValue, setSearchValue] = React.useState(" "); //assigning values to when certain input is being changed
    const debouncedSearchValue = useDebounce(searchValue, 300); //buffering the input so every keystroke doesnt lead to a search
    const [clickedType, setClickedType] = React.useState<number>(0);


    const { isLoading, isError, isSuccess, data } = useQuery( //querying when there has been a change after certain time
        ["searchPokemons", debouncedSearchValue],
        () => searchPokemons(debouncedSearchValue),
        {
            enabled: debouncedSearchValue.length > 0
        }
    );

    const renderResult = () => {  //calling the relevant functions to display the pokemon
        if (isLoading) {
            return <div className="search-message"> Loading... </div>;
        }

        if (isError) {
            return <div className="search-message"> Something went wrong </div>;
        }


        if (isSuccess) {  
            if (clickedType !== 0) {
                return <PokemonsByType id={clickedType} />;
            } else {
                return <PokemonsSearchResult pokemons={data} />;
            }
        }
            
        return <></>;
    };

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => { 
        // changing values so that there is no overlap of searched pokemon and the categories clicked

        setClickedType(0);
        setSearchValue(event.target.value);
    };


    return (
        <div className="home">
            <h1>Search Your Pokemon</h1>
            <input
                type="text"
                onChange={handleChange}
                onClick={() => setClickedType(0)}
                value={searchValue}
            />
            <div className="categories">
                <button className="category" data-type="normal" onClick={() => setClickedType(1)}>Normal</button>
                <button className="category" data-type="Fighting" onClick={() => setClickedType(2)}>Fighting</button>
                <button className="category" data-type="Flying" onClick={() => setClickedType(3)}>Flying</button>
                <button className="category" data-type="Poison" onClick={() => setClickedType(4)}>Poison</button>
                <button className="category" data-type="Ground" onClick={() => setClickedType(5)}>Ground</button>
                <button className="category" data-type="Rock" onClick={() => setClickedType(6)}>Rock</button>
                <button className="category" data-type="Bug" onClick={() => setClickedType(7)}>Bug</button>
                <button className="category" data-type="Ghost" onClick={() => setClickedType(8)}>Ghost</button>
                <button className="category" data-type="Steel" onClick={() => setClickedType(9)}>Steel</button>
                <button className="category" data-type="Fire" onClick={() => setClickedType(10)}>Fire</button>
                <button className="category" data-type="Water" onClick={() => setClickedType(11)}>Water</button>
                <button className="category" data-type="Grass" onClick={() => setClickedType(12)}>Grass</button>
                <button className="category" data-type="Electric" onClick={() => setClickedType(13)}>Electric</button>
                <button className="category" data-type="Psychic" onClick={() => setClickedType(14)}>Psychic</button>
                <button className="category" data-type="Ice" onClick={() => setClickedType(15)}>Ice</button>
                <button className="category" data-type="Dragon" onClick={() => setClickedType(16)}>Dragon</button>
                <button className="category" data-type="Dark" onClick={() => setClickedType(17)}>Dark</button>
                <button className="category" data-type="Fairy" onClick={() => setClickedType(18)}>Fairy</button>
                <button className="category" data-type="Unknown" onClick={() => setClickedType(10001)}>Unknown</button>
                <button className="category" data-type="Shadow" onClick={() => setClickedType(10002)}>Shadow</button>
            </div>
            {renderResult()}
        </div>
    );
}
