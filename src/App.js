import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MiComponente from './vistas/formulario/MiComponente.jsx';
import OtroComponente from './vistas/OtroComponente.jsx';
import PersonaMaterial from './vistas/PersonaMaterial.jsx';


function App() {


  const Navbar = () => {
    return (
      <nav className="topnav">
        <Link to="/otro">Integrantes</Link>
        <Link to="/personas">Personas</Link>
        <Link to="/personas2">Persona 2</Link>
        
      </nav>
    )
  }

  return (
    <Router>
       <Navbar />
      <Switch>
        <Route  path="/otro" component={OtroComponente} />
        <Route path="/personas" component={MiComponente} />
        <Route path="/personas2" component={PersonaMaterial} />
      </Switch>
    </Router>
  );

}

export default App;