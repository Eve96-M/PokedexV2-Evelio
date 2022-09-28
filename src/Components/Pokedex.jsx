import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PokemonCards from './PokemonCards';
import { useSelector } from 'react-redux';
import '../Pokedex.css'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
const Pokedex = () => {

    /*States*/
    const [pokemonList, setPokemonList] = useState([]) //List of pokemons
    const [search, setSearch] = useState("") //search by name input
    const [pokeType, setPokeType] = useState([]) //search by type select


    /*Axios api calls*/

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0/')
            .then(res => setPokemonList(res.data.results))
    }, []) //Generates pokemon list

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/type/`)
            .then(res => setPokeType(res.data.results))
    }, []) //Generates pokemn types for the select


    const name = useSelector((state) => state.userName) //Brings userName from slice
    const navigate = useNavigate() //nagivate declaration

    /*functions*/

    const searchName = () => {
        navigate(`/PokeDetails/${search}`)
    } //find pokemons by name function

    const searchByType = (typesUrl) => {
        axios.get(typesUrl)
            .then(res => setPokemonList(res.data.pokemon))
    } //find pokemons by type function

    /*pagination*/
    /*next,previous and indexes*/
    const [page, setPage] = useState(1) //current page
    const pokemonPerPage = 20 //number of pokemons per page
    const lastPokemonIndex = page * pokemonPerPage //Last character of page for the slice
    const firstPokemonIndex = lastPokemonIndex - pokemonPerPage //First character of page for the slice
    const pokemonsPaginated = pokemonList.slice(firstPokemonIndex, lastPokemonIndex)
    const totalPages = Math.ceil(pokemonList.length / pokemonPerPage)
    /*Add pages*/
    const pagesNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pagesNumbers.push(i)
    }
    /*pages shown*/
    let pageLastIndex = page + 3
    let pageFirstIndex = page - 1
    const pagesShown = pagesNumbers.slice(pageFirstIndex, pageLastIndex)

    return (
        <div>
            <NavBar />
            <h2 className='pokeWelcome'><span>Welcome {name} </span>here you can find your favourite pokemon</h2>
            <div className='searchContainer'>
                <input type="text" placeholder='search by name' value={search}
                    onChange={e => setSearch(e.target.value)}
                    className='pokeBar' />
                <button onClick={searchName} className='pokeButton'>search</button>
            </div>
            <div className='typeContainer'>
                <select onChange={e => searchByType(e.target.value)} className='selectType' >
                    <option value="">select one type</option>
                    {
                        pokeType.map(pokeTypes => (
                            <option value={pokeTypes.url} key={pokeTypes.url} onClick={() => setPage(1)}>{pokeTypes.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className='pageContainer'>
                <button type='button' onClick={() => setPage(page - 1)} disabled={page === 1} className='btn-page'>&#60;</button>
                {
                    pagesShown.map(pNumber => (
                        <button key={pNumber} onClick={() => setPage(pNumber)} className={pNumber == page ? 'btn-page btn-focus' : 'btn-page'} >{pNumber}</button>
                    ))
                }
                <button type='button' onClick={() => setPage(page + 1)} disabled={page === totalPages} className='btn-page'>&#62;</button>
            </div>
            <ul className='pokeList' >
                {
                    //changed pokemonlist with pokemonsPaginated
                    pokemonsPaginated.map((pokemonLists) => (
                        <PokemonCards url={pokemonLists.url ? pokemonLists.url : pokemonLists.pokemon.url} key={pokemonLists.url ? pokemonLists.url : pokemonLists.pokemon.url} />
                    )) //Pokemon filter fix

                }
            </ul>
        </div>
    );
};

export default Pokedex;