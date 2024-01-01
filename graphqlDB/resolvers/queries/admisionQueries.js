
import Admision from '../../../models/Admision.js';
import Paciente from '../../../models/Paciente.js';

const admisionQueries = {

    obtenerAdmisiones: async () => {
        console.log("Se llama al resolver obtenerAdmisiones")
        try {
            const admisions = await Admision.find({});
    
            return admisions;
        } catch (error) {
            console.log("Error al buscar Admisiones",error);
        }
    }, 
    obtenerUltimaAdmisionPaciente: async (_, { id },)=> {
        try {
            console.log("Se llama al resolver obtenerAdmision");
            console.log("ID de paciente recibido:", id);

            const paciente = await Paciente.findById(id);

            if (!paciente) {
                throw new Error('Paciente no encontrado');
            }

            // Poblar las admisiones relacionadas con el paciente
            await paciente.populate('admision_relacionada');

            // Verificar si hay admisiones relacionadas
            if (paciente.admision_relacionada.length === 0) {
                return null; // O manejar como mejor convenga en tu caso
            }

            // Obtener la última admisión del arreglo
            const ultimaAdmision = paciente.admision_relacionada[paciente.admision_relacionada.length - 1];

            // Devolver la última admisión
            console.log("admision",ultimaAdmision)
            return ultimaAdmision;
        } catch (error) {
            throw new Error('Error al obtener la última admisión del paciente: ' + error.message);
        }
    },
    obtenerAdmisionesActivas:async () => {
        console.log("Se llama al resolver obtenerAdmisionesActivas")
        try {
            const admisions = await Admision.find({
                hospitalizado: true,
            });
    
            return admisions;
        } catch (error) {
            console.log("Error al buscar AdmisionesActivas",error);
        }
    }, 
    obtenerAdmisionesInactivas:async () => {
        console.log("Se llama al resolver obtenerAdmisionesInactivas")
        try {
            const admisions = await Admision.find({
                hospitalizado: false,
            });
    
            return admisions;
        } catch (error) {
            console.log("Error al buscar AdmisionesActivas",error);
        }
    }, 
}

export default admisionQueries;