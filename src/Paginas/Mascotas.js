import React from 'react'
import FormRegistro from '../Componentes/Form'

let nombre = JSON.parse(localStorage.getItem("usuario"))
console.log(nombre);


const cerrarSesion = () =>{
    localStorage.clear();
}

export class Mascotas extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1> Bienvenido {nombre.nombre} </h1>
                    <h6><a href="/" onClick={cerrarSesion}> Cerrar sesion</a></h6>
                    <FormRegistro
                        objeto="Mascota"
                    />
                </div>
            </div>
        )
    }
}