import Microorganismo from '../../../models/Microorganismo.js';

const microorganismMutations = {

    nuevoMicroorganismo: async (_, { input }) => {
        try {
            // Crear una instancia de Microorganismo a partir del input
            const microorganismo = new Microorganismo(input);
    
            // Guardar el Microorganismo en la base de datos
            const microorganismoGuardado = await microorganismo.save();
    
            // Si hay una admisión relacionada especificada, actualizar esa admisión
            if (input.admision_relacionada) {
                // Buscar y actualizar las admisiones relacionadas
                await Admision.updateMany(
                    { _id: { $in: input.admision_relacionada } },
                    { $push: { microorganismo_relacionado: microorganismoGuardado._id } }
                );
            }
    
            return microorganismoGuardado;
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear el microorganismo');
        }
    },
        
    actualizarMicroorganismo: async (_, {id, input}) => {
        // revisar si el producto existe o no
        let microorganismo = await Microorganismo.findById(id);

        if(!microorganismo) {
            throw new Error('Producto no encontrado');
        }

        // guardarlo en la base de datos
        microorganismo = await Microorganismo.findOneAndUpdate(
            { id }, 
            input, 
            { new: true } 
        );

        return microorganismo;
    }, 
    eliminarMicroorganismo: async(_, {id}) => {
        // revisar si el producto existe o no
        let microorganismo = await Microorganismo.findById(id);

        if(!microorganismo) {
            throw new Error('Microorganismo no encontrado');
        }

        // Eliminar
        await Microorganismo.findOneAndDelete({id :  id});

        return "Microorganismo Eliminado";
    },
    

};

export default microorganismMutations;