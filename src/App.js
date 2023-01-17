import './App.css';
import Header from './header/Header';
import { Routes,Route } from 'react-router-dom';
import Login from './componentes/Login';
import Home from './componentes/Home';
import About from './componentes/About';
import Project from './componentes/Project';
import Service from './componentes/Service';
import Contact from './componentes/Contact';
import { BrowserRouter } from 'react-router-dom';
import {useReducer } from 'react';
import { initialState,updateState } from './reducer/Reducer';
import { globalContext } from './context/Context';

function App() {

  const [state,dispatch] = useReducer(updateState,initialState)
  return (
    <div className="App">
      <globalContext.Provider value={{state,dispatch}}>
          <BrowserRouter>
            <Header/>
            <Routes>
              <Route path='/' element={<Login/>}></Route>
              <Route path='/home' element={<Home/>}></Route>
              <Route path='/about' element={<About/>}></Route>
              <Route path='/project' element={<Project/>}></Route>
              <Route path='/service' element={<Service/>}></Route>
              <Route path='/contact' element={<Contact/>}></Route>
              <Route path='*' element={<h2>oops page is not found !!!</h2>}></Route>
            </Routes>
          </BrowserRouter>
      </globalContext.Provider>
    </div>
  );
}

export default App;
