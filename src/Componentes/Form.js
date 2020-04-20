import React, { Fragment } from 'react'
import ListaMascota from './ListaMascota'
import { v4 as uuid } from 'uuid'
//import axios from 'axios'


let actualizar = false

class FormRegistro extends React.Component {

    state = {
        mascota: {
            id: '',
            nombre: '',
            edad: '',
            tipo: ''
        },
        usuario: {
            nombre: '',
            email: '',
            password: ''
        },
        mascotas: [],
        usuarios:[],
        flag: false
    }


    componentDidMount(){
        this.getDatos()
    }

    getDatos(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            return res.json()
        })
        .then(res2 =>{
            this.setState({
                usuarios: res2
            })
        })
    }

    guardarDatos = e => {
        if (this.props.objeto === "Usuario") {
            this.setState({
                usuario: {
                    ...this.state.usuario,
                    [e.target.name]: e.target.value
                }
            })

            console.log(e.target.value);
        } else if (this.props.objeto === "Mascota") {
            this.setState({
                mascota: {
                    ...this.state.mascota,
                    [e.target.name]: e.target.value
                }
            })
            console.log(e.target.value);
        }

    }

    setDatos = e => {
        e.preventDefault();

        if (!actualizar) {
            if (this.props.objeto === "Mascota") {
                if (this.state.mascota.tipo !== "") {
                    this.state.mascota.id = uuid();
                    this.setState({
                        mascotas: [...this.state.mascotas, this.state.mascota]
                    })
                    this.setState({
                        flag: true,
                        mascota: {
                            "nombre": "",
                            "edad": "",
                            "tipo": ""
                        }
                    })
                    console.log(this.state.mascotas);

                } else {
                    alert("Debe Seleccionar el tipo de la mascota")
                }
            } else if (this.props.objeto === "Usuario") {
                console.log(this.state.usuarios);
                
                const usuario = this.state.usuarios.filter(item => item.name == this.state.usuarios.nombre)
                console.log(usuario);
                
                localStorage.setItem("usuario", JSON.stringify({ nombre: usuario.name }))
                window.location = "http://localhost:3000/Mascotas"
            }
        } else {

            const index = this.state.mascotas.findIndex(item => item.id === this.state.mascota.id)
            console.log(index);
            
            this.state.mascotas[index].nombre = this.state.mascota.nombre
            this.state.mascotas[index].edad = this.state.mascota.edad
            this.state.mascotas[index].tipo = this.state.mascota.tipo
            
            actualizar = false
            this.setState({
                mascota: {
                    "nombre": "",
                    "edad": "",
                    "tipo": ""
                }
            })
            alert("Mascota Modificada")
            
        }

    }

    eliminarMascota = id => {
        const nuevoArreglos = this.state.mascotas.filter(item => item.id !== id)
        this.setState({
            mascotas: [...nuevoArreglos]
        })
        console.log(this.state.mascotas);
        
    }

    modificarMascota = id => {
        const mascota2 = this.state.mascotas.filter(item => item.id === id)
        console.log(mascota2);
        actualizar = true;
        this.setState({
            mascota: {
                id: mascota2[0].id,
                nombre: mascota2[0].nombre,
                edad: mascota2[0].edad,
                tipo: mascota2[0].tipo
            }
        })
    }

    render() {
        return (
            <div>
                <div>
                    {console.log(this.state.usuarios)
                    }
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content black-text">
                                <span className="card-title"> Registrar {this.props.objeto} </span>
                                <form onSubmit={this.setDatos}>
                                    Nombre:
                                    
                                    {
                                        this.props.objeto === 'Mascota' ?
                                            <Fragment>
                                                <input onChange={this.guardarDatos} value={this.state.mascota.nombre} name="nombre" type="text" placeholder="Nombre" />
                                                Edad:
                                                <input onChange={this.guardarDatos} value={this.state.mascota.edad} name="edad" type="text" placeholder="Edad" />
                                                Tipo
                                                <div >
                                                    <select onChange={this.guardarDatos} value={this.state.mascota.tipo} name="tipo">
                                                        <option value={""} disabled selected> Elije tu Opción </option>
                                                        <option value={"Perro"}> Perro </option>
                                                        <option value={"Gato"}> Gato </option>
                                                        <option value={"Loro"}> Loro </option>
                                                    </select>
                                                </div>
                                            </Fragment>
                                            : <Fragment>
                                                <input onChange={this.guardarDatos} name="nombre" type="text" placeholder="Nombre" />
                                                Email:
                                                <input onChange={this.guardarDatos} name="email" type="email" placeholder="Email" />
                                                Contraseña
                                                <input onChange={this.guardarDatos} name="password" type="password" placeholder="Contraseña" />
                                            </Fragment>
                                    }
                                    <button className="btn waves-effect waves-light" type="submit">
                                        {this.props.objeto === "Usuario" ?
                                            <Fragment>
                                                Entrar
                                        </Fragment>
                                            : actualizar ?
                                                <Fragment>
                                                    Actualizar
                                                </Fragment>
                                                : <Fragment>
                                                    Crear
                                            </Fragment>}
                                        <i className="material-icons right"> send </i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.flag ?
                                <Fragment>
                                    <div className="col s12 m6">
                                        <ListaMascota
                                            mascota={this.state.mascotas}
                                            funcionEliminar={this.eliminarMascota}
                                            funcionModificar={this.modificarMascota}
                                        />
                                    </div>
                                </Fragment>
                            : <p></p>
                    }
                </div>
            </div>
        )
    }
}

export default FormRegistro