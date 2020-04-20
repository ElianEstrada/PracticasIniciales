import React from 'react'

class ListaMascota extends React.Component {



    render() {
        const { funcionEliminar, funcionModificar } = this.props
        return (
            <div className="card">
                <table className='stripped' border="1">
                    <tr>
                        <th> Nombre </th>
                        <th> Edad</th>
                        <th>Tipo</th>
                        <th className="center">Acciones</th>
                    </tr>
                    {
                        this.props.mascota !== null ?
                            this.props.mascota.map((mascota) => {
                                return (
                                    <tr>
                                        <td>{mascota.nombre}</td>
                                        <td>{mascota.edad}</td>
                                        <td>{mascota.tipo}</td>
                                        <td className="center">
                                            <a className='red btn space' onClick={() => funcionEliminar(mascota.id)} type="submit">Eliminar</a>
                                            <a className='green btn' onClick={() => funcionModificar(mascota.id)}> Actualizar </a>
                                        </td>
                                    </tr>
                                )
                            })
                            : <p></p>
                    }
                </table>
            </div>
        )
    }
}

export default ListaMascota