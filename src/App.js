import React from 'react';
import AllPokemons from './components/allPokemons';
import AppBar from './components/nav-bar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import './App.css';

function App() {
  const [value, setValue] = React.useState(10);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const ShowPokemons = ((props) => {
      return (
        <AllPokemons limit={value}/>
      );
    });

  return (
    <div className="App">
    <CssBaseline />
    <AppBar/>
    <Container>
    <Typography id="continuous-slider" gutterBottom style={{marginTop: '1rem'}}>
        Selecciona el número de pokemones que deseas visualizar
    </Typography>
    <Slider
      value={value} onChange={handleChange} aria-labelledby="discrete-slider" step={10} min={10}
        max={100}
      valueLabelDisplay="on"
    />
    <ShowPokemons/>
    </Container>
    
    </div>
  );
}
export default App;