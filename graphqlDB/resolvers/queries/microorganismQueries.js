import Microorganismo from '../../../models/Microorganismo.js';
import CamaHistorial from '../../../models/CamaHistorial.js';

const microorganismQueries = {

    obtenerMicroorganismo: async (_, { id }) => {
        // revisar si el microorganismo existe o no
        const microorganismo = await Microorganismo.findById(id);

        if(!microorganismo) {
            throw new Error('Microorganismo no encontrado');
        }

        return microorganismo;
    },
    obtenerMicroorganismos: async () => {
        try {
            const microorganismos = await Microorganismo.find({});
            return microorganismos;
        } catch (error) {
            console.log(error);
        }
    }, 
    obtenerMicroorganismosPatient: async (_, { id }) => {
        //console.log("Se llama a la funcion 'obtenerMicroorganismosPatient")
        //console.log("ID de paciente recibido:", id);
        try {
            const microorganismos = await Microorganismo.find({ 
                paciente_relacionado: id 
            });
            //console.log({microorganismos})
          return microorganismos;
        } catch (error) {
          console.error("Error al buscar microorganismos:", error);
          throw error;
        }
      },
      obtenerMicroorganismosAdmision: async (_, { idAdmision }) => {
        try {
          // Paso 1: Obtener todos los CamaHistorial relacionados con la Admisión
          const camasHistorial = await CamaHistorial.find({ admision_relacionada: idAdmision });
  
          // Paso 2: Para cada CamaHistorial, obtener los Microorganismos relacionados
          let microorganismosRelacionados = [];
          for (const camaHistorial of camasHistorial) {
            const microorganismos = await Microorganismo.find({ cama_relacionada: camaHistorial.id });
            microorganismosRelacionados = microorganismosRelacionados.concat(microorganismos);
          }
  
          // Paso 3: Devolver los Microorganismos encontrados
          return microorganismosRelacionados;
        } catch (error) {
          console.error(error);
          throw new Error('Error al obtener los microorganismos');
        }
      },
      obtenerCamaHistorialAdmision: async (_, { idAdmision }) => {
        try {
          const camasHistorials = await CamaHistorial.find({ admision_relacionada: idAdmision });
  
          return camasHistorials;
        } catch (error) {
          console.error(error);
          throw new Error('Error al obtener los microorganismos');
        }
      },

};

export default microorganismQueries;