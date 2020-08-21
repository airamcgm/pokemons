import React, { useEffect } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        textTransform:'capitalize'
    }
}));
export default function Details(props) {
    const classes = useStyles();

    const { pokemonId } = props;
    const [result, setResult] = React.useState([]);
    const [move, setMove] = React.useState([]);
    const [detail, setDetail] = React.useState([]);
    const [load, setLoad] = React.useState('true');
    const arr = [];
    const arr1 = [];

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then((response) => response.json())
            .then((data) => setResult(
                data.moves.map((item) => {
                    arr.push(item)
                    setMove(arr);
                }),
            ))
    }, []);
    setTimeout(() => {
        setLoad(false);
    }, 1000);

    return (
        <DialogContent dividers className={classes.root} style={{width:"350px"}}>
        {load ? (
            <CircularProgress/>
        ) : (move.map((move, index) => (
            <Accordion key={index}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>{move.move.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    {move.version_group_details.map((detail, j) =>
                        <li key={j}>{detail.move_learn_method.name}</li>
                    )}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            )))}
        </DialogContent>
    );
}