import Cama from '../../../models/Cama.js';
import pubSub from '../pubSub.js';

const bedMutations = {

    actualizarCama: async (_, {id, input}) => {
        // revisar si el cama existe o no
        let cama = await Cama.findById(id);

        if(!cama) {
            throw new Error('Cama no encontrada');
        }
        //console.log("input recibido",input)

        // guardarlo en la base de datos
        cama = await Cama.findOneAndUpdate(
            { _id: id }, // Usar _id en lugar de id
            { $set: input }, // Usar $set para actualizar campos individuales
            { new: true } // Devolver el documento actualizado
        );
        
        pubSub.publish('ACTUALIZAR_CAMA', { actualizarCama: cama });
        return cama;
    }, 


    nuevaCama: async (_, { input }) => {
        //console.log("Se llama al resolver nuevaCama")
        console.log("input recibido",input)

        const { cama_numero } = input
        // Verificar si el paciente ya esta registrado
        const cama = await Cama.findOne({ cama_numero });
        if(cama) {
            throw new Error('Esta cama ya esta registrada');
        }
        try {

        // Crear una nueva instancia de Cama sin valores
        const cama = new Cama(input);
        //console.log("Cama vacia creada",cama)
    
        // Asignar los valores del input a la instancia
        //Object.assign(cama, input);
        //console.log("Cama llenada con input",cama)
    
        // Almacenar en la base de datos
        const resultado = await cama.save();
    
        return resultado;
        } catch (error) {
        console.log(error);
        }
    },
    actualizarCama: async (_, {id, input}) => {
        // revisar si el cama existe o no
        let cama = await Cama.findById(id);

        if(!cama) {
            throw new Error('Cama no encontrada');
        }
        //console.log("input recibido",input)

        // guardarlo en la base de datos
        cama = await Cama.findOneAndUpdate(
            { _id: id }, // Usar _id en lugar de id
            { $set: input }, // Usar $set para actualizar campos individuales
            { new: true } // Devolver el documento actualizado
        );

        return cama;
    }, 
    desocuparCama: async (_, { id }) => {
        //console.log(`Resolver desocuparCama recibió el ID: ${id}`);
        try {
            // Busca la cama por su ID
            const cama = await Cama.findById(id);

            // Si la cama no existe, lanza un error
            if (!cama) {
            throw new Error(`No se encontró una cama con ID ${id}`);
            }

            // Cambia el valor de cama_ocupada a false
            cama.cama_ocupada = false;

            // Guarda la cama actualizada en la base de datos
            await cama.save();

            // Retorna la cama actualizada
            return cama;

        } catch (error) {
            throw new Error("Error al desocupar la cama: " + error.message);
        }
    },
    eliminarCama: async(_, {id}) => {
        //console.log(`Resolver modificarEstadoCama recibió el ID: ${id}`);
        // Revisar si la cama existe o no
        let cama = await Cama.findById(id);

        if (!cama) {
            throw new Error('Cama no encontrada');
        }

        // Cambiar el valor de "cama_ocupada" a false
        //cama.cama_ocupada = false;
        cama.cama_ocupada = !cama.cama_ocupada;

        // Guardar los cambios en la base de datos
        await cama.save();

        return "Estado de cama modificado correctamente";
    },


};

export default bedMutations;
