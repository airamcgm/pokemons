import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Details from './details';
import { makeStyles } from '@material-ui/core/styles';


export default function PokemonCard(props) {

  const [open, setOpen] = React.useState(false);
  const { pokemon } = props;

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
  });
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  return (
    <div>
        <Card className={classes.root} onClick={handleClickOpen}>
            <CardActionArea>
                <Typography variant="h5" component="h2" style={{marginTop:'1rem', textTransform:'capitalize'}}>
                    {pokemon.name}
                </Typography>
                <img src={pokemon.sprites.front_default} alt='pokemon' />
            </CardActionArea>
        </Card>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <img src={pokemon.sprites.front_default} alt='pokemon' style={{verticalAlign: "middle"}}/> 
            <span style={{textTransform: 'capitalize'}}>{pokemon.name}</span>
            </DialogTitle>
            <Details pokemonId={pokemon.id}></Details>
      </Dialog>
    </div>
  );
}