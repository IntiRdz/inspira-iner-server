import Cama from '../../../models/Cama.js';
import Diagnostico from '../../../models/Diagnostico.js';
import Admision from '../../../models/Admision.js';
import pubSub from '../pubSub.js';

const diagnosticMutations = {




    nuevoDiagnostico: async (_, { input }) => {
        try {
        console.log("Se llama al resolver nuevoDiagnostico")
        console.log("input recibido",input)

        const diagnostico = new Diagnostico(input);

        const diagnosticoGuardado = await diagnostico.save();
        const { admision_relacionada } = input;
        console.log("admision", admision_relacionada)
        console.log("nuevo diagnostico",diagnosticoGuardado)

        await Admision.findByIdAndUpdate(admision_relacionada, { 
            $push: { diagnostico: diagnosticoGuardado._id } 
        });

        return diagnosticoGuardado;
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear el microorganismo y actualizar camahistorial');
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

export default diagnosticMutations;