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
        throw new Error('Error al agregar el diagnóstico');
    }
},
    actualizarDiagnostico: async (_, {id, input}) => {
        try {
            console.log("ID recibido", id);
            console.log("input recibido", input);

            let diagnostico = await Diagnostico.findById(id);

            if(!diagnostico) {
                throw new Error('Cama no encontrada');
            }
            console.log("Diagnostico encontrado", diagnostico);
            // guardarlo en la base de datos
            diagnostico = await Diagnostico.findOneAndUpdate(
                { _id: id }, 
                input, 
                { new: true, upsert: false } 
            );

            console.log("Diagnostico actualizado", diagnostico);
            return diagnostico;
        } catch (error) {
            console.error("Error al actualizar el diagnostico", error);
            throw error;
        }
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
    eliminarDiagnostico: async(_, {id}) => {
        // revisar si el producto existe o no
        let diagnostico = await Diagnostico.findById(id);

        if(!diagnostico) {
            throw new Error('Diagnostico no encontrado');
        }

        await Diagnostico.findOneAndDelete({ _id : id });

        return "Diagnostico eliminado";
    },


};

export default diagnosticMutations;