import {API_URL} from '../Constants/api'

// EVENTS

const fetchPokemonData = async (pokemon) => {
  let url = pokemon.url
  let response = await fetch(url)
  let data = await response.json();
  return data
  }

 export const getPokemonList = async () => {
 let response = await fetch(`${API_URL}/pokemon?limit=151`)
 let pokemons = await response.json();
  let list = await Promise.all(pokemons.results.map((pokemon) => fetchPokemonData(pokemon)))
  return list
}