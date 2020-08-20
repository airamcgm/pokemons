import React, { useEffect } from 'react';
import PokemonCard from './components/pokemon-card';
import AppBar from './components/nav-bar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './App.css';

function App() {
  const [result, setResult] = React.useState([]);
  const [poke, setPoke] = React.useState([]);
  const [load, setLoad] = React.useState('true');
  const arr = [];

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
  });
  const classes = useStyles();
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=50')
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
    <div className="App">
    <CssBaseline />
    <AppBar/>
    <Container>
    <Grid container spacing={3} style={{marginTop: '1rem'}}>
        {load ? (
          <p>Loading...</p>
        ) : (
            poke.map((pokemon) => (
              <Grid key={pokemon.id} item s={12} sm={3}>
                <PokemonCard item  pokemon={pokemon} id={pokemon.id} classes={classes}/>
              </Grid>
            ))
          )}
      </Grid>
    </Container>
    
    </div>
  );
}
export default App;