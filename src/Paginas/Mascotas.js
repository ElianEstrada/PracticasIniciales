import React from 'react'
import FormRegistro from '../Componentes/Form'

//Obtenemos el arreglo del localStorage
let nombre = JSON.parse(localStorage.getItem("usuario"))
console.log(nombre);

//Metodo para cerrar sesión
const cerrarSesion = () =>{
    localStorage.clear();
}

export class Mascotas extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    {/* Obtenemos el nombre del localStorage*/}
                    <h1> Bienvenido {nombre.nombre} </h1>
                    <h6><a href="/" onClick={cerrarSesion}> Cerrar sesion</a></h6>

                    {/*llamamos al componente y le damos las props correspondientes*/ }
                    <FormRegistro
                        objeto="Mascota"
                    />
                </div>
            </div>
        )
    }
}