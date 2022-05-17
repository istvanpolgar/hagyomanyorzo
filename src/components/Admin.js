import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Copyright from './Copyright';
import Alert from './Alert';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { 
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Paper,
    Box,
    Grid,
    Typography,
    Container,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Image from '../images/background.jpg';

const theme = createTheme();

export default function Home() {  
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [events, setEvents] = useState([]);
    const [allevents, setAllEvents] = useState([]);
    const [headcounts, setHeadcounts] = useState([]);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [loggedin, setLoggedin] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        window.location.reload(false);
    };

    const handleSubmit = async (e) => {  
        e.preventDefault();
        const data = {
            user: user,
            password: password
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post(process.env.REACT_APP_API_URL + '/admin', data, { headers: headers })
        .then((response) => {
            if(response.data.ok)
                setLoggedin(true);
            else
            {
                setMessage(response.data.message);
                setOpen(true);
            }
        });
    } 

    const handleSend = async (e) => {  
        e.preventDefault();
        const data = {
            headcounts: headcounts
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post(process.env.REACT_APP_API_URL + '/saveheadcount', data, { headers: headers })
        .then((response) => {
            setMessage(response.data.message);
            setOpen(true);
        });
    } 

    const handleClick = async (e) => {  
        e.preventDefault(); 
        const data = {
            events: events
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post(process.env.REACT_APP_API_URL + '/download', data, { headers: headers })
        .then((response) => {
            setMessage(response.data.message);
            setOpen(true);
        });
    }

    const handleChange = (id, value) => {
        console.log(headcounts);
        let new_headcounts = [];
        headcounts.forEach( (hc,i) => { 
          if( i === id ) {
            new_headcounts.push(value);
          } else
            new_headcounts.push(hc);
        })
        setHeadcounts(new_headcounts);
    }

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
        }

        axios.post(process.env.REACT_APP_API_URL + '/allevents', {}, {headers: headers})
            .then((response) => {
                setEvents(response.data.events);
        });
    },[events]);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
        }

        axios.post(process.env.REACT_APP_API_URL + '/headcounts', {}, {headers: headers})
            .then((response) => {
                setHeadcounts(response.data.headcounts);
        });
    },[]);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
        }

        axios.post(process.env.REACT_APP_API_URL + '/events', {}, {headers: headers})
            .then((response) => {
                setAllEvents(response.data.events);
        });
    },[]);

    if(loggedin)
    {
        return (
            <div>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                    }}
                >
                    <Alert 
                        open={open}
                        handleClose={handleClose}
                        handleClickOpen={handleOpen}
                        text={message}
                    />
                    <CssBaseline />
                    <Container component="main" 
                        sx={{ 
                            mt: 8, 
                            mb: 2, 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center', 
                        }} 
                        maxWidth="sm"
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <ListAltIcon />
                        </Avatar>
                        <Box component="form" noValidate onSubmit={handleSend} sx={{ mt: 1 }}>
                                {
                                    headcounts.map((hc,i) => (
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="number"
                                            key={i}
                                            label={allevents[i]}
                                            name="headcount"
                                            value={hc}
                                            onChange={(e) => handleChange(i, e.target.value)}
                                            autoFocus
                                        />
                                    ))
                                }                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Létszámokat ment
                                </Button>
                            </Box>
                        <Typography component="h1" variant="h5">
                            Az események résztvevői
                        </Typography>
                    </Container>
                    <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm" >
                        { 
                            events.map((ev,i) => { return (
                                <Accordion key={i}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>
                                            {ev.title}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ol>
                                            {
                                                ev.students.map((st,i) => (
                                                    <li key={i}>{st}</li>
                                                ))
                                            }
                                        </ol>
                                    </AccordionDetails>
                                </Accordion>
                        )})}
                    </Container>
                    <Button
                        type="submit"
                        fullWidth
                        onClick={handleClick}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Lista letöltése
                    </Button>
                    <Box
                        component="footer"
                        sx={{
                        py: 3,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                        }}
                    >
                        <Container maxWidth="sm">
                            <Copyright />
                        </Container>
                    </Box>
                </Box>    
            </div>
        );
    }
    else
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Alert 
                        open={open}
                        handleClose={handleClose}
                        handleClickOpen={handleOpen}
                        text={message}
                    />
                    <Grid container component="main" sx={{ height: '100vh' }}>
                        <CssBaseline />
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            sx={{
                                backgroundImage: `url(${Image})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <SupervisorAccountIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Adminisztrációs felület
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        type="text"
                                        id="user"
                                        label="Felhasználó"
                                        name="user"
                                        autoComplete="text"
                                        onChange={e => setUser(e.target.value)}
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        type="password"
                                        id="password"
                                        label="Jelszó"
                                        name="password"
                                        autoComplete="password"
                                        onChange={e => setPassword(e.target.value)}
                                        autoFocus
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Belépés
                                    </Button>
                                    <Copyright sx={{ mt: 5 }} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </div>
        );
  }