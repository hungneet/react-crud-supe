import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
//import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';


function App() {
  return (
    <div className="App container">
      <h1 className="d-flex justify-content-center m-3">
      Vought Supes Manager
      </h1>
     
      <Home/>
      
    </div>
  );
}

export default App;
