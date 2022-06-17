import { FormControl, InputLabel, MenuItem, Select, Box, Typography, Button, CircularProgress } from "@mui/material";
import { ListOfCoffees } from "../../components/ListOfCoffees";
import { useCallback, useEffect, useState } from 'react';
import { CoffeeService } from "../../services/coffee";
import { useNavigate } from "react-router-dom";
import { useCoffeeList } from "../../context/coffees";


export function Home() {
    const { coffeeList, setCoffeeList, typeFilterSelected, setTypeFilterSelected } = useCoffeeList();
    const [isLoading, setIsLoading] = useState(true);
    

    const navigate = useNavigate();


    const searchCoffees = useCallback(async ()=> {
        setIsLoading(true);
        let coffeeResponse = await CoffeeService.getCoffees(typeFilterSelected);

        if (coffeeResponse.status) {
            setCoffeeList({
                [typeFilterSelected]: coffeeResponse.data
            });
            setIsLoading(false);
        }
    }, [typeFilterSelected, setCoffeeList])

    function handleClickNewCoffee() {
        navigate('/coffee', {
            state: {
                type: typeFilterSelected
            }
        })
    }

    function onClickItem(val) {
        navigate('/coffee', {
            state: {
                ...val
            }
        })
    }

    useEffect(() => {
        
        if (coffeeList == null)
            searchCoffees();

    }, [typeFilterSelected, searchCoffees, coffeeList]);


    return (

        <Box className="header" sx={useStyle.container}>
            <Box sx={useStyle.containerHeader}>
                <Typography variant="h4" component="span">
                    Cafés
                </Typography>
                <Button variant="contained" onClick={handleClickNewCoffee} color="warning">Novo Café</Button>
            </Box>
            <Box sx={useStyle.containerBody}>
                <FormControl fullWidth>
                    <InputLabel id="select-coffee">Tipo</InputLabel>
                    <Select
                        labelId="select-coffee"
                        id="select-coffee"
                        value={typeFilterSelected}
                        label="Age"
                        onChange={event => {
                            
                            setCoffeeList(null)
                            setTypeFilterSelected(event.target.value)

                        }}
                    >
                        <MenuItem value={"hot"}>hot</MenuItem>
                        <MenuItem value={"iced"}>iced</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {coffeeList === null || coffeeList[typeFilterSelected].length <= 0 ?
            <Box sx={{display:"flex", flexDirection: "row", justifyContent: "center"}}>
                {isLoading?
                <CircularProgress />
                :

                <Typography variant="h4" color={"red"} component="span">
                    Lista de itens vazia
                </Typography>
                }
            </Box>
                :
                <ListOfCoffees coffeeList={coffeeList[typeFilterSelected]} typeOfCoffee={typeFilterSelected} onClickItem={onClickItem} />
            }
        </Box>

    )
}

const useStyle = {
    container: { maxHeight: 800, padding: "80px" },
    containerHeader: { paddingLeft: 4, paddingRight: 4, display: "flex", flexDirection: "row", justifyContent: "space-between" },
    containerBody: { padding: 4, maxHeight: 800, },
}