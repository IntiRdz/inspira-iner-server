import pubSub  from '../pubSub.js';

const bedSubscriptions = {
/*     nuevaCama: {
        subscribe: () => pubSub.asyncIterator('NUEVA_CAMA')
    }, */
    actualizarCama: {
        subscribe: () => pubSub.asyncIterator('ACTUALIZAR_CAMA')
    },
};
 
export default bedSubscriptions;