import Main from './pages/Main';
import UserPage from './pages/UserPage';
import PokemonPage from './pages/pokemonPage/PokemonPage';
import { Footer2 } from './components/Footer';
import FormPage from './pages/formPage/FormPage';
import Dz6 from './pages/dz6/Dz6';
import Fetch from './pages/fetch/Fetch';
import TodoPage from './pages/TodoPage';


function App() {
  return (
    <div className="App">
        <Main/>
        <UserPage/>
        {/*<PokemonPage/>*/}
        {/*<FormPage/>*/}
        {/*<Dz6/>*/}
        {/*<Fetch/>*/}
        <TodoPage/>
    </div>
  );
}

export default App;
