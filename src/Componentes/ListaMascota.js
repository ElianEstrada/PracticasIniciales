import React from 'react'

class ListaMascota extends React.Component {



    render() {
        //llammos al construcutor que va recibir las props que pasemos.
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
                        //verificamos que el arreglo de mascotas no sea nulo
                        this.props.mascota !== null ?

                        //recorremos el arreglo de mascotas
                            this.props.mascota.map((mascota) => {
                                return (
                                    <tr>
                                        {/*asignamos a cada td un atributo del arreglo*/}
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