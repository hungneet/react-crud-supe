//import logo from './logo.svg';
import './App.css';
import {Home} from './Home';

//import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';


function App() {
  
  return (
    
    <div className="App-header">
      
      <h1 className="title" style={{textAlign: 'center'}}>
      Vought Supes Manager
      </h1>
     
      <Home/>
      
    </div>
  );
}

export default App;
