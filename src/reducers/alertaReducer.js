import {
  MOSTRAR_ALERTA,
  OCULATAR_ALERTA

} from '../types'

const initialState = {
  alerta: null
}

export default function ( state = initialState, action ){
  switch(action.type){
    case MOSTRAR_ALERTA:
        return {
        ...state,
        alerta: action.payload
      }
    case OCULATAR_ALERTA:
      return {
        ...state,
        alerta: null
      }

    default: 
    return state;
  }
}