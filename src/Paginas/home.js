import React from 'react'
import FormRegistro from '../Componentes/Form'


export class home extends React.Component {
    render() {
        return (
            <div className="container">
                <h1> Bienvenido </h1>
                <FormRegistro
                    objeto="Usuario"
                />
            </div>
        )
    }
}