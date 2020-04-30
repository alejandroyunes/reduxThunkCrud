import React, { useState} from "react";
import { useDispatch, useSelector } from 'react-redux'

//actions de redux

import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions'

const NuevoProducto = ({history}) => {

  const [ nombre, guardarNombre] = useState('');
  const [ precio, guardarPrecio] = useState(0);

  //utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch();

  //Acceder al state del store

  const cargando = useSelector( state => state.productos.loading);
  const error = useSelector( state => state.productos.error);
  const alerta = useSelector( state => state.alerta.alerta)

//mandar llamar el action de producto action
  const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) )


const submitProductoNuevo = e => {
  e.preventDefault();
  //validar formulario
  if(nombre.trim() === '' || precio <= 0){

    const alerta = {
      msg: 'ambos campos son obligatorios',
      classes: 'alert alert-danger text-center text-uppercase p3'
    }
    dispatch( mostrarAlerta(alerta) )

    return
  }
  //si no hay errores

  dispatch( ocultarAlertaAction() );
  
  //crear nuevo producto
 agregarProducto({nombre,precio});

 //redireccionar al home

 history.push('/');

}

  return (
    <div className=" row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-b font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            { alerta ? <p className={alerta.classes}> {alerta.msg} </p>: null }
            <form
              onSubmit={submitProductoNuevo}
            >
              <div className="form-group">
                <label>Nombre del producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del producto"
                  name="nombre"
                  value={nombre}
                  onChange={ e => guardarNombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Precio del producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del producto"
                  name="precio"
                  value={precio}
                  onChange={ e => guardarPrecio( Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando ? <p>Cargando...</p>: null}
            {error ? <p className="alert alert-danger p2 mt-2 text-center">Hubo un error</p>: null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
