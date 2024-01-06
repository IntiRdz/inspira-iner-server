import Cama from '../../../models/Cama.js';
import CamaHistorial from '../../../models/CamaHistorial.js';

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
    obtenerHistorialCama: async () => {
        //console.log("Se llama al resolver obtenerHistorialesCama")
        try {
            const camas = await CamaHistorial.find({});
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener los historiales de las camas: " + error.message);
        }
    },
    obtenerTrasladosHoy: async () => {
        //console.log("Se llama al resolver obtenerHistorialesCama")
        try {
            const camas = await CamaHistorial.find({
                fecha_traslado: { $gte: new Date().setHours(0o0,0o0,0o0), $lt: new Date().setHours(23,59,59) }
            });
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener los historiales de las camas: " + error.message);
        }
    },
    obtenerTrasladosDias: async (_, { diasAtras = 0 }) => {
        try {
            const hoy = new Date();
            const fechaInicio = new Date();
            fechaInicio.setDate(hoy.getDate() - diasAtras);
            fechaInicio.setHours(0, 0, 0, 0);
    
            const fechaFin = new Date(fechaInicio);
            fechaFin.setDate(fechaInicio.getDate() + 1);
            fechaFin.setMilliseconds(-1);
    
            const camas = await CamaHistorial.find({
                fecha_traslado: { $gte: fechaInicio, $lt: fechaFin }
            });
    
            return camas;
        } catch (error) {
            throw new Error("Error al obtener los historiales de las camas: " + error.message);
        }
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
        console.log("Se llama al resolver obtenerCamas")
        try {
            // Utilizar 'populate' con 'slice' para obtener solo el último elemento de 'camahistorial'
            const camas = await Cama.find({
                cama_ubicacion: "Urgencias"
            }).populate({
                path: 'camahistorial',
                options: { sort: { 'fecha_traslado': -1 }, limit: 1 } // Ordenar por fecha_traslado y limitar a 1
            });
    
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },
/*     obtenerCamasUrgencias: async () => {
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
    },  */
    obtenerCamas1: async () => {
        console.log("Se llama al resolver obtenerCamas")
        try {
            // Utilizar 'populate' con 'slice' para obtener solo el último elemento de 'camahistorial'
            const camas = await Cama.find({
                cama_ubicacion: "Clinico1"
            }).populate({
                path: 'camahistorial',
                options: { sort: { 'fecha_traslado': -1 }, limit: 1 } // Ordenar por fecha_traslado y limitar a 1
            });
    
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },
    obtenerCamas2: async () => {
        console.log("Se llama al resolver obtenerCamas2")
        try {
            // Utilizar 'populate' con 'slice' para obtener solo el último elemento de 'camahistorial'
            const camas = await Cama.find({
                cama_ubicacion: "Clinico2"
            }).populate({
                path: 'camahistorial',
                options: { sort: { 'fecha_traslado': -1 }, limit: 1 } // Ordenar por fecha_traslado y limitar a 1
            });
    
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },
    obtenerCamas3: async () => {
        console.log("Se llama al resolver obtenerCamas2")
        try {
            // Utilizar 'populate' con 'slice' para obtener solo el último elemento de 'camahistorial'
            const camas = await Cama.find({
                cama_ubicacion: "Clinico3"
            }).populate({
                path: 'camahistorial',
                options: { sort: { 'fecha_traslado': -1 }, limit: 1 } // Ordenar por fecha_traslado y limitar a 1
            });
    
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },
    obtenerCamas4: async () => {
        console.log("Se llama al resolver obtenerCamas4")
        try {
            // Utilizar 'populate' con 'slice' para obtener solo el último elemento de 'camahistorial'
            const camas = await Cama.find({
                cama_ubicacion: "Clinico4"
            }).populate({
                path: 'camahistorial',
                options: { sort: { 'fecha_traslado': -1 }, limit: 1 } // Ordenar por fecha_traslado y limitar a 1
            });
    
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },
    obtenerCamas5: async () => {
        console.log("Se llama al resolver obtenerCamas5")
        try {
            // Utilizar 'populate' con 'slice' para obtener solo el último elemento de 'camahistorial'
            const camas = await Cama.find({
                cama_ubicacion: "Clinico5"
            }).populate({
                path: 'camahistorial',
                options: { sort: { 'fecha_traslado': -1 }, limit: 1 } // Ordenar por fecha_traslado y limitar a 1
            });
    
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },
    obtenerCamas7: async () => {
        console.log("Se llama al resolver obtenerCamas7")
        try {
            // Utilizar 'populate' con 'slice' para obtener solo el último elemento de 'camahistorial'
            const camas = await Cama.find({
                cama_ubicacion: "Clinico7"
            }).populate({
                path: 'camahistorial',
                options: { sort: { 'fecha_traslado': -1 }, limit: 1 } // Ordenar por fecha_traslado y limitar a 1
            });
    
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },
    obtenerCamas8: async () => {
        console.log("Se llama al resolver obtenerCamas8")
        try {
            // Utilizar 'populate' con 'slice' para obtener solo el último elemento de 'camahistorial'
            const camas = await Cama.find({
                cama_ubicacion: "Clinico8"
            }).populate({
                path: 'camahistorial',
                options: { sort: { 'fecha_traslado': -1 }, limit: 1 } // Ordenar por fecha_traslado y limitar a 1
            });
    
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },
    obtenerCamas9: async () => {
        console.log("Se llama al resolver obtenerCamas9")
        try {
            // Utilizar 'populate' con 'slice' para obtener solo el último elemento de 'camahistorial'
            const camas = await Cama.find({
                cama_ubicacion: "Clinico9"
            }).populate({
                path: 'camahistorial',
                options: { sort: { 'fecha_traslado': -1 }, limit: 1 } // Ordenar por fecha_traslado y limitar a 1
            });
    
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },
    obtenerCamas10: async () => {
        console.log("Se llama al resolver obtenerCamas10")
        try {
            // Utilizar 'populate' con 'slice' para obtener solo el último elemento de 'camahistorial'
            const camas = await Cama.find({
                cama_ubicacion: "Clinico10"
            }).populate({
                path: 'camahistorial',
                options: { sort: { 'fecha_traslado': -1 }, limit: 1 } // Ordenar por fecha_traslado y limitar a 1
            });
    
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