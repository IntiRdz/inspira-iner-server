import ProgramaIntegral from '../../../models/ProgramaIntegral.js';
import Admision from '../../../models/Admision.js';
import pubSub from '../pubSub.js';

const programMutations = {

    nuevoProgramaIntegral: async (_, { input }) => {
        try {
        console.log("Se llama al resolver nuevoProgramaIntegral")
        console.log("input recibido",input)

        const programaintegral = new ProgramaIntegral(input);

        const programaintegralGuardado = await programaintegral.save();
        const { admision_relacionada } = input;
        console.log("admision", admision_relacionada)
        console.log("nuevo programa integral",programaintegralGuardado)

        await Admision.findByIdAndUpdate(admision_relacionada, { 
            programaintegral: programaintegralGuardado._id 
        });

        return programaintegralGuardado;
    } catch (error) {
        console.error(error);
        throw new Error('Error al agregar el programa integral');
    }
},
    actualizarProgramaIntegral: async (_, {id, input}) => {
        try {
            console.log("ID recibido", id);
            console.log("input recibido", input);

            let programaintegral = await ProgramaIntegral.findById(id);

            if(!programaintegral) {
                throw new Error('Programa no encontrada');
            }
            console.log("Programa encontrado", programaintegral);
            // guardarlo en la base de datos
            programaintegral = await ProgramaIntegral.findOneAndUpdate(
                { _id: id }, 
                input, 
                { new: true, upsert: false } 
            );

            console.log("Programa actualizado", programaintegral);
            return programaintegral;
        } catch (error) {
            console.error("Error al actualizar el programa integral", error);
            throw error;
        }
    },
};

export default programMutations;