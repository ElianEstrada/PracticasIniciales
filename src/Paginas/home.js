import React from 'react'
import FormRegistro from '../Componentes/Form'


export class home extends React.Component {
    render() {
        return (
            <div className="container">
                <h1> Bienvenido </h1>

                {/*llamamos al componente y le pasamos las Props correspondientes*/}
                <FormRegistro
                    objeto="Usuario"
                />
            </div>
        )
    }
}