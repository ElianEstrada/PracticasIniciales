import React, { Fragment } from 'react'
import ListaMascota from './ListaMascota'
import { v4 as uuid } from 'uuid'

//Variable para actualizar
let actualizar = false

class FormRegistro extends React.Component {


    //Creando el State
    state = {
        //Objeto de Mascota para almancenar la información del formulario
        mascota: {
            id: '',
            nombre: '',
            edad: '',
            tipo: ''
        },
        //Objeto de Usuario para almancenar la información del formulario
        usuario: {
            nombre: '',
            email: '',
            password: ''
        },
        //arreglo de mascotas para mostrarlo mas adelante
        mascotas: [],
        //arreglo de usuarios para llenarlos con la API
        usuarios:[],
        //bandera para organizar el componente
        flag: false
    }


    //Cuando se monte el componente se ejecutara.
    componentDidMount(){
        this.getDatos();
    }

    //Obtenemos los datos de la API y los enviamos al state
    getDatos(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            return res.json()
        })
        .then(res2 =>{
            //Aqui se asignan los datos de la API al arreglo de usuarios en el state.
            this.setState({
                usuarios: res2
            })
        })
    }

    //Metodo para guardar la información escrita en los formularios a su respectivo objeto
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

    //Metodo de verificiación y envio de información
    setDatos = e => {
        e.preventDefault();

        if (!actualizar) {
            if (this.props.objeto === "Mascota") {
                if (this.state.mascota.tipo !== "") {
                    
                    //Asignamos un Id
                    this.state.mascota.id = uuid();

                    //Almacenamos la mascota en el arreglo de mascotas del state.
                    this.setState({
                        mascotas: [...this.state.mascotas, this.state.mascota]
                    })

                    //Limpiamos el formulario y cambiamos la vandera a true
                    this.setState({
                        flag: true,
                        mascota: {
                            "nombre": "",
                            "edad": "",
                            "tipo": ""
                        }
                    })

                } else {
                    alert("Debe Seleccionar el tipo de la mascota")
                }
            } else if (this.props.objeto === "Usuario") {
                
                //Filtramos a los usuarios por nombre.
                const usuarioActual = this.state.usuarios.filter(item => item.name == this.state.usuario.nombre)
                
                if(usuarioActual.length != 0){
                    //Guardamos el nombre en el localStorage para acceder a el luego.
                    localStorage.setItem("usuario", JSON.stringify({ nombre: this.state.usuario.nombre }))
                    alert("Bienvenido")
                    //Redirigimos a la pagina Mascota
                    window.location = "http://localhost:3000/Mascotas"
                }else{
                    alert("El usuario no existe")
                }

                
            }
        } else {
            //Si Actualizar es true

            //Obtenemos el index de la mascota que queremos actualizar
            const index = this.state.mascotas.findIndex(item => item.id === this.state.mascota.id)
        
            //Actualizamos los datos de la mascota
            this.state.mascotas[index].nombre = this.state.mascota.nombre
            this.state.mascotas[index].edad = this.state.mascota.edad
            this.state.mascotas[index].tipo = this.state.mascota.tipo
            
            //Devolvemos actulizar a su estado original.
            actualizar = false

            //Limpiamos el formulario.
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

    //Metodo para elminar Mascota
    eliminarMascota = id => {
        //Filtramos el arreglo excluyendo a la mascota que queremos eliminar
        const nuevoArreglos = this.state.mascotas.filter(item => item.id !== id)

        //enviamos el nuevo arreglo sin dicha mascota.
        this.setState({
            mascotas: [...nuevoArreglos]
        })
        console.log(this.state.mascotas);
        
    }

    //Metodo para llenar el formulario para modificar
    modificarMascota = id => {

        //Filtramos el arreglo por el id de la mascota que queremos modificar
        const mascota2 = this.state.mascotas.filter(item => item.id === id)

        //Cambiamos Actualizar a true
        actualizar = true;

        //Enviamos los datos la mascota a los atributos del objeto mascota para llenar los inputs
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
                {console.log(this.state.usuarios)}
                <div>
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content black-text">
                                {/*Utilizamos las props que se envian para saber que se registrara*/}
                                <span className="card-title"> Registrar {this.props.objeto} </span>
                                <form onSubmit={this.setDatos}>
                                    Nombre:
                                    {
                                        //vemos el contenido de las props para saber que inputs mostrar
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
                                        //vemos el valor de actualizar para saber si vamos a actualizar la mascota o crear
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
                        //si la vandera es verdadera mostramos la tabla de las mascotas
                        this.state.flag ?
                                <Fragment>
                                    <div className="col s12 m6">
                                        <ListaMascota
                                        //Enviamos las props al componente
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
