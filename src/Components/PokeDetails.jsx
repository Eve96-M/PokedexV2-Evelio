import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../PokeDetails.css'
import NavBar from './NavBar';
const PokeDetails = () => {

    const [pokemonDetails, setPokemonDetails] = useState({})
    const { id } = useParams()
    const [cardColors, setCardColors] = useState({
        normal: "linear-gradient(180deg, rgba(80,45,57,1) 4%, rgba(143,79,101,1) 54%, rgba(148,104,119,1) 86%)",
        fighting: "linear-gradient(180deg, rgba(103,14,1,1) 0%, rgba(107,35,0,1) 28%, rgba(201,61,0,1) 86%)",
        flying: "linear-gradient(180deg, rgba(205,196,61,1) 4%, rgba(240,245,118,1) 54%, rgba(244,255,183,1) 100%)",
        poison: "linear-gradient(180deg, rgba(77,45,80,1) 4%, rgba(137,79,143,1) 54%, rgba(143,104,148,1) 86%)",
        ground: "linear-gradient(180deg, rgba(128,81,0,1) 4%, rgba(159,101,0,1) 54%, rgba(162,129,73,1) 100%)",
        rock: "linear-gradient(180deg, rgba(116,116,116,1) 4%, rgba(163,163,163,1) 54%, rgba(218,216,216,1) 100%)",
        bug: "linear-gradient(180deg, rgba(32,156,0,1) 4%, rgba(63,190,40,1) 54%, rgba(138,193,123,1) 86%)",
        ghost: "linear-gradient(180deg, rgba(45,54,80,1) 4%, rgba(79,94,143,1) 54%, rgba(78,81,152,1) 86%)",
        steel: "linear-gradient(180deg, rgba(83,113,97,1) 4%, rgba(106,145,124,1) 54%, rgba(142,196,167,1) 100%)",
        fire: "linear-gradient(0deg, #FAD961 0%, #F76B1C 100%)",
        water: "linear-gradient(180deg, rgba(1,51,103,1) 0%, rgba(0,36,107,1) 16%, rgba(0,51,201,1) 86%)",
        grass: "linear-gradient(180deg, rgba(126,185,178,1) 4%, rgba(236,242,182,1) 54%, rgba(208,255,195,1) 86%)",
        electric: "linear-gradient(180deg, rgba(0,10,84,1) 4%, rgba(0,1,218,1) 54%, rgba(65,65,255,1) 100%)",
        psychic: "linear-gradient(180deg, rgba(255,37,37,1) 4%, rgba(254,66,66,1) 54%, rgba(255,109,109,1) 100%)",
        ice: "linear-gradient(0deg, #0093E9 0%, #80D0C7 100%)",
        dragon: "linear-gradient(180deg, rgba(73,119,120,1) 4%, rgba(94,157,149,1) 54%, rgba(119,195,185,1) 100%)",
        dark: "black",
        fairy: "linear-gradient(180deg, rgba(255,37,74,1) 4%, rgba(254,66,92,1) 54%, rgba(255,109,127,1) 100%)",
        unkown: "",
        shadow: "linear-gradient(180deg, rgba(52,52,52,1) 4%, rgba(92,92,92,1) 54%, rgba(126,125,125,1) 100%)",
    })

    const [Colors, setColors] = useState({
        normal: "#8f4f65",
        fighting: "#6b2300",
        flying: "#f0f576",
        poison: "#4d2d50",
        ground: "#9f6500",
        rock: "#a3a3a3",
        bug: "#3fbe28",
        ghost: "#4f5e8f",
        steel: "#6a917c",
        fire: "#F76B1C",
        water: "#00246b",
        grass: "#7eb9b2",
        electric: "#0001da",
        psychic: "#fe4242",
        ice: "#80D0C7",
        dragon: "#5e9d95",
        dark: "black",
        fairy: "#fe425c",
        unkown: "",
        shadow: "#5c5c5c",
    })


    useEffect(() => {
        axios.get(` https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => setPokemonDetails(res.data))
    }, [])

    return (
        <div>
            <NavBar />
            <div className='pokemonWrapper'>
                <div className='pInfo' style={{ background: `${cardColors[pokemonDetails.types?.[0].type.name]}` }}>
                    <img src={pokemonDetails.sprites?.other.home.front_default} alt="" />
                    <div className='pType'>
                        <h3 className='id' style={{ color: `${Colors[pokemonDetails.types?.[0].type.name]}` }}>#{pokemonDetails.id}</h3>
                        <h2 style={{ color: `${Colors[pokemonDetails.types?.[0].type.name]}` }}>{pokemonDetails.name}</h2>
                        <div className='pData'>
                            <h3>Weight<br /><span>{pokemonDetails.weight}</span></h3>
                            <h3>Height<br /><span>{pokemonDetails.height}</span></h3>
                        </div>
                        <div className='pDetails'>
                            <h3>Type</h3>
                            <h3>Ablities</h3>
                            <ul className='Types'>
                                {
                                    pokemonDetails.types?.length === 2 ? pokemonDetails.types.map(Ptype => (
                                        <li key={Ptype.type.name} style={{ background: `${Colors[Ptype.type.name]}` }}>{Ptype.type.name}</li>
                                    )) : <li style={{ background: `${Colors[pokemonDetails.types?.[0].type.name]}` }}>{pokemonDetails.types?.[0].type.name}</li>
                                }
                            </ul>
                            <ul className='Abilities'>{
                                pokemonDetails.abilities?.map(Pabilities => (
                                    <li key={Pabilities.ability.name}>{Pabilities.ability.name}</li>
                                ))
                            }
                            </ul>
                        </div>
                    </div>
                    <div className='pStats'>
                        <h2>Stats</h2>
                        <ul className='Bars'>
                            <li>HP:<span>{pokemonDetails.stats?.[0].base_stat}/150</span></li>
                            <div className='statBar'><div className="progress" style={{ width: `${(pokemonDetails.stats?.[0].base_stat / 150) * 100}%` }}></div></div>
                            <li>ATK:<span>{pokemonDetails.stats?.[1].base_stat}/150</span></li>
                            <div className='statBar'><div className="progress" style={{ width: `${(pokemonDetails.stats?.[1].base_stat / 150) * 100}%` }}></div></div>
                            <li>DEF:<span>{pokemonDetails.stats?.[2].base_stat}/150</span></li>
                            <div className='statBar'><div className="progress" style={{ width: `${(pokemonDetails.stats?.[2].base_stat / 150) * 100}%` }}></div></div>
                            <li>SPD:<span>{pokemonDetails.stats?.[5].base_stat}/150</span></li>
                            <div className='statBar'><div className="progress" style={{ width: `${(pokemonDetails.stats?.[5].base_stat / 150) * 100}%` }}></div></div>
                        </ul>
                    </div>
                </div>
                <div className='pMovements'>
                    <ul className='moveList'>
                        {pokemonDetails.moves?.map(pMovements => (
                            <li key={pMovements.move.url}>{pMovements.move.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PokeDetails;