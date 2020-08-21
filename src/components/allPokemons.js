import React, { useEffect } from 'react';
import PokemonCard from './pokemon-card';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function AllPokemons(props) {
  const [result, setResult] = React.useState([]);
  const [poke, setPoke] = React.useState([]);
  const [load, setLoad] = React.useState('true');
  const arr = [];


  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${props.limit}`)
    .then((response) => response.json())
    .then((data) => setResult(
      data.results.map((item) => {
        fetch(item.url)
          .then((response) => response.json())
          .then((allpokemon) => arr.push(allpokemon));
        setPoke(arr);
      }),
    ));
  }, []);
  setTimeout(() => {
    setLoad(false);
  }, 1000);
  return (
    <Grid container spacing={3} style={{marginTop: '1rem'}} >
        {load ? (
            <CircularProgress/>
        ) : (
            poke.sort((a, b) => a.id > b.id ? 1 : -1).map((pokemon) => (
              <Grid key={pokemon.id} item xs={12} sm={12} md={6} lg={3}>
                <PokemonCard item load={load} pokemon={pokemon} id={pokemon.id}/>
              </Grid>
            ))
          )}
    </Grid>
  );
}