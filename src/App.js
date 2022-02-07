import './App.css';
import Registration from './Registration';
import Login from './Login';
import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom'
import Home from './Home';
import Admin from './Admin';

function App() {


  return (
    <div  className="App">
      
    
  
      <Router>
      <Routes>
        <Route exact path ="/" element={<Registration/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/home/:id" element={<Home/>}/>
        <Route path ="/admin" element={<Admin/>}/>
      </Routes>
    </Router>  
    </div>
  );
}

export default App;
