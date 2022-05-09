import { makeStyles } from  '@mui/styles';
import Image from '../images/background.jpg';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {

  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {

  },
  text: {

  },
}));