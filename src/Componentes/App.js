import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import { home } from '../Paginas/home';
import { Mascotas } from '../Paginas/Mascotas';

const App = () =>{
    return (
        <BrowserRouter>
            <Switch>
                {/*Creamos las rutas a las que podremos acceder*/}
                <Route exact path="/" component={home}/>
                <Route exact path="/Mascotas" component ={Mascotas}/>
            </Switch>
        </BrowserRouter>
    );
}


export default App