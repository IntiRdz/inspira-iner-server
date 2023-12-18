//import Usuario from '../../models/Usuario.js';

const userQueries = {

    obtenerUsuario: async (_, {}, contextValue) => {
        //console.log("Se llama al resolver obtenerUsuario")
        if(!contextValue){
            throw new GraphQLError('No se recibió Contex por lo que no se puede obtener Usuario');
        }
        return contextValue.usuario;
    }, 

};

export default userQueries;