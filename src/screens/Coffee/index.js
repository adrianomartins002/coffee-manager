import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CoffeeService } from '../../services/coffee';
import { useCoffeeList } from '../../context/coffees';
import { FaArrowLeft } from 'react-icons/fa';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function Coffee() {
    const [value, setValue] = useState(0);
    const [titleCoffee, setTitleCoffe] = useState("");
    const [idCoffee, setIdCoffee] = useState("");
    const [messageError, setMessageError] = useState("");
    const { state } = useLocation();
    const [typeOfCoffee, setTypeOfCoffee] = useState(state?.type? state.type : "hot");
    const { coffeeList, setCoffeeList } = useCoffeeList();
    const navigate = useNavigate();


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function onClickDelete() {
        setCoffeeList(CoffeeService.deleteCoffeeOfTheList(idCoffee, state?.type, coffeeList));
        navigate('/')

    }

    function onClickSaveCoffee() {
        if (titleCoffee === "") {
            setMessageError("Nome do café é inválido.");
            return;
        }
        
        if(state?.id)
            setCoffeeList(CoffeeService.updateCoffee(state.id, titleCoffee, typeOfCoffee, coffeeList));
        else
            setCoffeeList(CoffeeService.createCoffee(titleCoffee, typeOfCoffee, coffeeList));

        navigate('/')
    }

    function handleBackClick() {
        navigate('/', {
            state: {
                dontSearchList: true
            }
        })
    }

    useEffect(() => {
        if (state?.id && state?.title && state?.type) {
            setTitleCoffe(state.title);
            setIdCoffee(state.id);
            setTypeOfCoffee(state.type)
        }
        // eslint-disable-next-line
    }, [])



    return (
        <Box sx={useStyles.container}>
            <Box sx={useStyles.containerHeader}>
                <Box sx={useStyles.containerTitle}>
                    <FaArrowLeft onClick={handleBackClick} size={25} style={{ cursor: "pointer" }} />
                    <Typography variant='h4' component="span">Novo café</Typography>
                </Box>
                <Box sx={useStyles.containerButtonsHeader}>
                    {idCoffee ?
                        <Button variant='contained' color="error" onClick={onClickDelete}>Excluir</Button>
                        :
                        null
                    }
                    <Button variant='contained' onClick={onClickSaveCoffee} color="warning">Salvar</Button>
                </Box>
            </Box>
            <Box>
                <Box sx={useStyles.containerBody}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Dados gerais" {...a11yProps(0)} />
                    </Tabs>
                </Box>
                <TabPanel  value={value} index={0}>
                    <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
                        <TextField  component="div" sx={useStyles.textField} id="outlined-basic" label="Nome" variant="outlined" value={titleCoffee} onChange={event => {
                            setTitleCoffe(event.target.value)
                            setMessageError("");
                        }} />
                        <FormControl component="div" fullWidth sx={useStyles.form}>
                            <InputLabel component="div" id="select-coffee">Tipo</InputLabel>
                            <Select
                            component="div"
                                labelId="select-coffee"
                                id="select-coffee"
                                value={typeOfCoffee}
                                label="Age"
                                onChange={event => setTypeOfCoffee(event.target.value)}

                            >
                                <MenuItem component="div" value={"hot"}>hot</MenuItem>
                                <MenuItem value={"iced"}>iced</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </TabPanel>
                {messageError ?
                    <Typography component="span" variant='h5' color={"error"}>{messageError}</Typography>
                    :
                    null
                }
            </Box>
        </Box>
    );
}


const useStyles = {
    container: { maxHeight: 800, padding: "80px" },
    containerHeader: {display: "flex", flexDirection: "row", justifyContent: "space-between" },
    containerTitle: { width: "200px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    containerButtonsHeader: { display: "flex", flexDirection: "row", justifyContent: "space-between", minWidth: 200 },
    containerBody: { borderBottom: 1, borderColor: 'divider' },
    textField: { marginTop: 4, maxWidth: 400 },
    form: { marginTop: 4, maxWidth: 400 },
}