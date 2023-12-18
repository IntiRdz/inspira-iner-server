import Cama from '../../../models/Cama.js';

const bedQueries = {

    obtenerCama: async (_, { id }) => {
        //console.log("Se llama al resolver obtenerCama")
        //console.log("Se obtiene el ID de la cama: ",id)
        // revisar si el cama existe o no
        const cama = await Cama.findById(id);

        if(!cama) {
            throw new Error('Cana no encontrada');
        }

        //console.log("Cama encotrada",cama)
        return cama;
    },
    obtenerCamas: async () => {
        console.log("Se llama al resolver obtenerCamas")
        try {
            const camas = await Cama.find({});
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    }, 
    obtenerCamasUrgencias: async () => {
        console.log("Se llama al resolver obtenerCamasUrgencias")
        try {
            const camas = await Cama.find({
                cama_ubicacion: "Urgencias"
            });
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    }, 
    obtenerCamas1: async () => {
        console.log("Se llama al resolver obtenerCamas1")
        try {
            const camas = await Cama.find({
                cama_ubicacion: "Clinico1"
            });
            console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    }, 
    obtenerCamasOcupadas: async () => {
        //console.log("Se llama al resolver 'obtenerCamasOcupadas")
        try {
          const camas = await Cama.find({ 
            cama_ocupada: true 
        });
  
          // Retorna las camas encontradas
          return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas ocupadas: " + error.message);
        }
      },
    obtenerCamasDisponibles: async () => {
        //console.log("Se llama al resolver 'obtenerCamasDisponibles")
        try {
            const camas = await Cama.find({ 
                cama_ocupada: false, 
                cama_disponible:true 
            });

            // Retorna las camas encontradas
            //console.log("y retorna esto: ",camasDisponibles)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas disponible: " + error.message);
        }
    },
    obtenerCamasDisponiblesMujer: async () => {
        //console.log("Se llama al resolver 'obtenerCamasDisponibles")
        try {
            const camas = await Cama.find({ 
                cama_ocupada: false, 
                cama_disponible:true,
                cama_genero: { $in: ['Mujer', 'Indeterminado'] }
            });

            // Retorna las camas encontradas
            //console.log("y retorna esto: ",camasDisponibles)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener camas disponibles para mujer: " + error.message);
        }
    },
    obtenerCamasDisponiblesHombre: async () => {
        //console.log("Se llama al resolver 'obtenerCamasDisponibles")
        try {
            const camas = await Cama.find({ 
                cama_ocupada: false, 
                cama_disponible:true,
                cama_genero: { $in: ['Hombre', 'Indeterminado'] }
            });

            // Retorna las camas encontradas
            //console.log("y retorna esto: ",camasDisponibles)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener camas disponibles para hombre: " + error.message);
        }
    },
    buscarCama: async(_, { texto }) => {
        const camas = await Cama.find({ $text: { $search: texto } }).limit(10)

        return camas;
    }
};
    
export default bedQueries;