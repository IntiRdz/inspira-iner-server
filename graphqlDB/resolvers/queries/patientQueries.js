import Paciente from '../../../models/Paciente.js';


const patientQueries = {

    obtenerPaciente: async (_, { id },) => {
        console.log("Se llama al resolver obtenerPaciente")
        
        try{
            const paciente = await Paciente.findById(id);
            if(!paciente) {
                throw new Error('Paciente no encontrado');
            }
            console.log("Paciente encontrado:",paciente)
            return paciente;

        } catch (error) {
            throw new Error("Error al obtener paciente: " + error.message);
        }
    }, 

    obtenerPacientes: async () => {
        console.log("Se llama al resolver obtenerPacientes")
        try {
            const pacientes = await Paciente.find({});
    
            return pacientes;
        } catch (error) {
            throw new Error("Error al obtener a los pacientes: " + error.message);
        }
    }, 

    obtenerPacientesUser: async (_, {}, contextValue ) => {
        try {
            if(!contextValue){
                throw new Error('No se recibió Contex por lo que no se puede obtener Usuario');
            }
            const pacientes = await Paciente.find({ user: contextValue.usuario.id.toString() });
            return pacientes;
        } catch (error) {
            console.log(error);
        }
    }, 
    obtenerPacientesHospitalizados: async () => {
        try {
            const pacientesHospitalizados = await Paciente.find({ 
                hospitalizado: true 
            });
            
            return pacientesHospitalizados;
        } catch (error) {
            console.log(error);
            throw error; 
        }
    },
    obtenerPacientesNoHospitalizados: async () => {
        try {
            const pacientesNoHospitalizados = await Paciente.find({ 
                hospitalizado: false 
            });
            
            return pacientesNoHospitalizados;
        } catch (error) {
            console.log(error);
            throw error; 
        }
    },
};

export default patientQueries;