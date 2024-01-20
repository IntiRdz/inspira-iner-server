import Cama from '../../../models/Cama.js';
import CamaHistorial from '../../../models/CamaHistorial.js';

import { startOfDay, endOfDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'; 

const bedQueries = {

    obtenerCama: async (_, { id }) => {
        //console.log("Se llama al resolver obtenerCama")
        //console.log("Se obtiene el ID de la cama: ",id)
        // revisar si el cama existe o no
        const cama = await Cama.findById(id);

        if(!cama) {
            throw new Error('Cama no encontrada');
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
        console.log("Se llama al resolver obtenerTrasladosHoy")
        try {

        const timeZone = 'America/Mexico_City';
        const inicioDelDia = utcToZonedTime(startOfDay(new Date()), timeZone);
        const finDelDia = utcToZonedTime(endOfDay(new Date()), timeZone);

        //console.log("Se llama al resolver obtenerHistorialesCama")

            const camas = await CamaHistorial.find({
                fecha_traslado: { $gte: inicioDelDia, $lt: finDelDia }
            });
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener los historiales de las camas: " + error.message);
        }
    },   

/*     obtenerTrasladosHoy: async (_, { diasAtras = 2 }) => {
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
    }, */
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
                cama_ubicacion: "Urgencias",
            });
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },
    obtenerCamas1: async () => {
        console.log("Se llama al resolver obtenerCamasUrgencias")
        try {
            const camas = await Cama.find({
                cama_ubicacion: "Clinico1",
            });
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas Clinico 1: " + error.message);
        }
    },
    obtenerCamas2: async () => {
        console.log("Se llama al resolver obtenerCamas2")
        try {
            const camas = await Cama.find({
                cama_ubicacion: "Clinico2"
            });
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },    
    obtenerCamas3: async () => {
        console.log("Se llama al resolver obtenerCamas3")
        try {
            const camas = await Cama.find({
                cama_ubicacion: "Clinico3",
            });
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas Clinico 3: " + error.message);
        }
    },
    obtenerCamas4: async () => {
        console.log("Se llama al resolver obtenerCamas4")
        try {
            const camas = await Cama.find({
                cama_ubicacion: "Clinico4"
            });
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },   
    obtenerCamas5: async () => {
        console.log("Se llama al resolver obtenerCamas5")
        try {
            const camas = await Cama.find({
                cama_ubicacion: "UTIM"
            });
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },   
    obtenerCamas7: async () => {
        console.log("Se llama al resolver obtenerCamas7")
        try {
            const camas = await Cama.find({
                cama_ubicacion: "Neumopedia"
            });
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },   
    obtenerCamas8: async () => {
        console.log("Se llama al resolver obtenerCamas8")
        try {
            const camas = await Cama.find({
                cama_ubicacion: "ORL"
            });
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },   
    obtenerCamas9: async () => {
        console.log("Se llama al resolver obtenerCamas9")
        try {
            const camas = await Cama.find({
                cama_ubicacion: "UCI"
            });
            //console.log(camas)
            return camas;
        } catch (error) {
            throw new Error("Error al obtener las camas: " + error.message);
        }
    },   
    obtenerCamas10: async () => {
        console.log("Se llama al resolver obtenerCamas10")
        try {
            const camas = await Cama.find({
                cama_ubicacion: "UCPQ"
            });
            //console.log(camas)
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
    },
/*     obtenerTrasladosDias: async (_, { diasAtras = 0 }) => {
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
    }, */
};
    
export default bedQueries;