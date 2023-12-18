
import Admision from '../../../models/Admision.js';

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