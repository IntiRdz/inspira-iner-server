import Microorganismo from '../../../models/Microorganismo.js';
import CamaHistorial from '../../../models/CamaHistorial.js';

const microorganismMutations = {

    nuevoMicroorganismo: async (_, { input }) => {
        try {
            console.log("Se va a crear un microorganismo");
            console.log("input: ", input);
    
            // Crear una instancia de Microorganismo a partir del input
            const microorganismo = new Microorganismo(input);
    
            // Guardar el Microorganismo en la base de datos
            const microorganismoGuardado = await microorganismo.save();
    
            // Obtener el ID de camahistorial del input
            const { camahistorial } = input;
    
            // Buscar el objeto camahistorial y actualizarlo con el ID del microorganismo
            await CamaHistorial.findByIdAndUpdate(camahistorial, { 
                $push: { microorganismo_relacionado: microorganismoGuardado._id } 
            });
    
            return microorganismoGuardado;
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear el microorganismo y actualizar camahistorial');
        }
    },
    actualizarMicroorganismo: async (_, { id, input }) => {
        console.log("ID recibido", id);
        console.log("input recibido", input);
    
        let microorganismo = await Microorganismo.findById(id);
    
        if(!microorganismo) {
            throw new Error('Producto no encontrado');
        }
        console.log("Microorganismo encontrado", microorganismo);
    
        try {
            microorganismo = await Microorganismo.findOneAndUpdate(
                { _id: id }, 
                input, 
                { new: true, upsert: false } 
            );
            console.log("Microorganismo actualizado", microorganismo);
        } catch (error) {
            console.error("Error al actualizar el microorganismo", error);
            throw error;
        }
    
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