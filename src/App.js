import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import { Home } from './screens/Home';
import { Coffee } from './screens/Coffee';
import { CoffeeProvider } from './context/coffees';

/**
 * Classe para criação das rotas da aplicação * 
 */

function App() {
  return (
    <div className="App">
      <CoffeeProvider>
     <Routes>
        <Route path="/" element={<Home />}/>  
        <Route path="/coffee" element={<Coffee />}/>
      </Routes>
      </CoffeeProvider>
    </div>
  );
}

export default App;
