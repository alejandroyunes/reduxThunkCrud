import React from "react";
import {  useHistory } from "react-router-dom";

//redux
import { borrarProductoAction, obtenerProductoEditar } from "../actions/productoActions";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;

  const dispatch = useDispatch();
  const history = useHistory(); //ahbilitar history para redireccion

  //confirmar si el usuario quiere eliminarlo
  const confirmarEliminarProducto = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        dispatch(borrarProductoAction(id));
      }
    });

    //preguntar al usuario
  };

  //function que redirige de forma progarmada
  const redireccionarEdicion = (producto) => {
    dispatch( obtenerProductoEditar(producto) )
    history.push(`/productos/editar/${producto.id}`);
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold"> $ {precio}</span>
      </td>
      <td className="acciones">
        <button 
          type="button"
          onClick={ () => redireccionarEdicion(producto)}
          className={"btn btn-primary mr-2"}>
            editar
        </button>
        <button
          onClick={() => confirmarEliminarProducto(id)}
          type="button"
          className="btn btn-danger"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
