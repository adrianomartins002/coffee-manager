import { createContext, useContext, useState} from "react";


const CoffeeContext = createContext();

export function CoffeeProvider({children}){
    const [coffeeList, setCoffeeList] = useState(null);

    const [typeFilterSelected, setTypeFilterSelected] = useState("hot");


    return(
        <CoffeeContext.Provider value={{
            typeFilterSelected,
            setTypeFilterSelected,
            coffeeList,
            setCoffeeList
        }}>
            {children}
        </CoffeeContext.Provider>
    )
}


export function useCoffeeList(){
    const {coffeeList, setCoffeeList, typeFilterSelected, setTypeFilterSelected} = useContext(CoffeeContext);
    
    return {
        coffeeList,
        setCoffeeList,
        typeFilterSelected,
        setTypeFilterSelected
    };
}
