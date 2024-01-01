import { RedisPubSub } from 'graphql-redis-subscriptions';

const pubSub = new RedisPubSub();

const patientSubscriptions = {
  nuevoPaciente: {
    subscribe: () => pubSub.asyncIterator('NUEVO_PACIENTE')
  },

  actualizarPaciente: { 
     subscribe: () => pubSub.asyncIterator('ACTUALIZAR_PACIENTE')
  }
}

export default patientSubscriptions;