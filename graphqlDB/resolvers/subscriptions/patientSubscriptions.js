import pubSub  from '../pubSub.js';

const patientSubscriptions = {
  nuevoPaciente: {
    subscribe: () => pubSub.asyncIterator(['NUEVO_PACIENTE'])  
  },
  
  actualizarPaciente: {
    subscribe: () => pubSub.asyncIterator(['ACTUALIZAR_PACIENTE'])
  }
}

export default patientSubscriptions;