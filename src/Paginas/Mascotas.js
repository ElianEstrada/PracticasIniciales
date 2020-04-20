import React from 'react'
import FormRegistro from '../Componentes/Form'

let nombre = JSON.parse(localStorage.getItem("usuario"))
console.log(nombre);


export class Mascotas extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1> Bienvenido {nombre.nombre} </h1>
                    <FormRegistro
                        objeto="Mascota"
                    />
                </div>
            </div>
        )
    }
}