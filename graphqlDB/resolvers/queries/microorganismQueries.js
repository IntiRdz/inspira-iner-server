import Microorganismo from '../../../models/Microorganismo.js';

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

};

export default microorganismQueries;