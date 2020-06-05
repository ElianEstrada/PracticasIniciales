import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Componentes/App';

//Recuperamos el div donde renderizaremos nuestras páginsa
let contenedor = document.getElementById('root')

//Enviamos el componente que renderizara, y a donde lo renderizara.
ReactDOM.render(<App />, contenedor);

//Fin del documento

