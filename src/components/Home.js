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
    InputLabel,
    Select,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';

import EventNoteIcon from '@mui/icons-material/EventNote';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from '../images/background.jpg';

const theme = createTheme();

export default function Home() {  
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [event, setEvent] = useState("");
    const [fullevents, setFullEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

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
            name: name,
            category: category,
            event: event
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post(process.env.REACT_APP_API_URL + '/', data, { headers: headers })
        .then((response) => {
            setMessage(response.data.message);
            setOpen(true);
        });
    }    

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
        }
        
        axios.post(process.env.REACT_APP_API_URL + '/classes', {}, {headers: headers})
            .then((response) => {
                setCategories(response.data.categories);
            });
    },[categories]);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
        }

        axios.post(process.env.REACT_APP_API_URL + '/events', {}, {headers: headers})
            .then((response) => {
                setEvents(response.data.events);
        });
    },[events]);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
        }

        axios.post(process.env.REACT_APP_API_URL + '/fullevents', {}, {headers: headers})
            .then((response) => {
                setFullEvents(response.data.fullevents);
        });
    },[fullevents]);

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
                                <EventNoteIcon />
                            </Avatar>
                            <Typography component="h1" variant="h4">
                                Hagyományörzőnapok
                            </Typography>
                            <Typography component="h2" variant="h5">
                                Salamon Ernő Gimnázium
                            </Typography>
                            <Typography component="h3" variant="h6">
                                Jelentkezési felület
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="text"
                                    id="name"
                                    label="Jelentkező neve (apa kezdőbetűjével)"
                                    name="name"
                                    autoComplete="text"
                                    onChange={e => setName(e.target.value)}
                                    autoFocus
                                />
                                <InputLabel htmlFor="category"> Osztály </InputLabel>
                                <Select 
                                    native 
                                    fullWidth
                                    required
                                    variant="outlined"
                                    name="category"
                                    id="category"
                                    onChange={ e => setCategory(e.target.value)}
                                >
                                    <option aria-label="None" value="" />
                                    { 
                                        categories.map((cat,i) => (
                                            <option key={i} value={cat}>{cat}</option>
                                    ))}
                                </Select>
                                <InputLabel htmlFor="event"> Esemény </InputLabel>
                                <Select 
                                    native 
                                    fullWidth
                                    required
                                    variant="outlined"
                                    name="event"
                                    id="event"
                                    onChange={ e => setEvent(e.target.value)}
                                >
                                    <option aria-label="None" value="" />
                                    { 
                                        events.map((ev,i) => (
                                            <option key={i} value={ev}>{ev}</option>
                                    ))}
                                </Select>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Jelentkezés
                                </Button>
                            </Box>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>
                                        Műhelylétszámok
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        {
                                            fullevents.map((fe,i) => (
                                                <li key={i}>{fe}</li>
                                            ))
                                        }
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
  }