import Paciente from '../../../models/Paciente.js';
import Admision from '../../../models/Admision.js';
import Cama from '../../../models/Cama.js';

import pubSub from '../pubSub.js';


// Función auxiliar para crear una admisión
async function crearAdmision(input, pacienteId, camaId) {
    const { fecha_ingreso, fecha_prealta, fecha_egreso, servicio_tratante } = input;
    const nuevaAdmision = new Admision({
        paciente_relacionado: pacienteId,
        cama_relacionada: camaId,
        fecha_ingreso: fecha_ingreso || new Date(),
        servicio_tratante,
        fecha_prealta,
        fecha_egreso,
        hospitalizado: true
    });
    return await nuevaAdmision.save();
}

async function actualizarUltimaAdmision(paciente, input) {
    const { fecha_ingreso, fecha_prealta, fecha_egreso, hospitalizado } = input;

    const ultimaAdmision = await Admision.findOne({ paciente_relacionado: paciente.id }).sort({ fecha_ingreso: -1 });

    if (ultimaAdmision) {
        ultimaAdmision.fecha_ingreso = fecha_ingreso || ultimaAdmision.fecha_ingreso;
        ultimaAdmision.fecha_prealta = fecha_prealta || ultimaAdmision.fecha_prealta;
        ultimaAdmision.fecha_egreso = fecha_egreso || ultimaAdmision.fecha_egreso;
        ultimaAdmision.hospitalizado = hospitalizado !== undefined ? hospitalizado : ultimaAdmision.hospitalizado;

        if (fecha_egreso) {
            ultimaAdmision.hospitalizado = false;
            const idUltimaCama = ultimaAdmision.cama_relacionada;
            if (idUltimaCama) {
                const camaUltimaAdmision = await Cama.findById(idUltimaCama);
                if (camaUltimaAdmision) {
                    camaUltimaAdmision.cama_ocupada = false;
                    await camaUltimaAdmision.save();
                }
            }
        }

        await ultimaAdmision.save();
    } else {
        // Manejar la situación donde no hay una admisión previa
    }
}
async function gestionarCambioDeCama(paciente, camaNuevaId) {
    const ultimaAdmision = await Admision.findOne({ paciente_relacionado: paciente.id }).sort({ fecha_ingreso: -1 });

    if (ultimaAdmision && ultimaAdmision.cama_relacionada) {
        const camaAntigua = await Cama.findById(ultimaAdmision.cama_relacionada);
        if (camaAntigua) {
            camaAntigua.cama_ocupada = false;
            camaAntigua.cama_genero = "Indeterminado";
            await camaAntigua.save();
        }

        const camaNueva = await Cama.findById(camaNuevaId);
        if (!camaNueva) {
            throw new Error('La cama relacionada no existe');
        }

        camaNueva.cama_ocupada = true;
        camaNueva.cama_genero = paciente.pac_genero;
        await camaNueva.save();

        ultimaAdmision.cama_relacionada = camaNueva.id;
        await ultimaAdmision.save();
    } else {
        throw new Error('El paciente no tiene admisión relacionada');
    }
}


const patientMutations = {

    nuevoPaciente: async (_, { input }, contextValue) => {
        console.log("Se llama al resolver nuevoPaciente");

        try {
            const { expediente, cama_relacionada, ...restoDelInput } = input;

            const pacienteExistente = await Paciente.findOne({ expediente });
            if (pacienteExistente) {
                throw new Error('Ese paciente ya está registrado');
            }

            const cama = await Cama.findById(cama_relacionada);
            if (!cama) {
                throw new Error('La cama relacionada no existe');
            }
            if (cama.cama_ocupada) {
                throw new Error('La cama relacionada ya está ocupada');
            }

            const nuevoPaciente = new Paciente(restoDelInput);
            // Asignar el usuario desde el contexto
            //nuevoPaciente.user = contextValue.usuario.id;


            console.log("Genero del Paciente",nuevoPaciente.pac_genero)

            nuevoPaciente.expediente = expediente;
            nuevoPaciente.creado= new Date();
            const paciente = await nuevoPaciente.save();

            cama.cama_ocupada = true;
            cama.cama_genero = nuevoPaciente.pac_genero;
            await cama.save();

            console.log("Servicio tratante: ", input.servicio_tratante);

            const admisionGuardada = await crearAdmision(input, paciente.id, cama.id);

            paciente.admision_relacionada.push(admisionGuardada.id);
            await paciente.save();

            pubSub.publish('NUEVO_PACIENTE', { nuevoPaciente: paciente });
            pubSub.publish('ACTUALIZAR_CAMA', { actualizarCama: cama });
            return paciente;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    
    actualizarPaciente: async (_, { id, input }) => {
        try {
            const paciente = await Paciente.findByIdAndUpdate(id, { $set: input }, { new: true });
            if (!paciente) {
                throw new Error('Ese paciente no existe');
            }

            await actualizarUltimaAdmision(paciente, input);

            if (input.cama_relacionada) {
                await gestionarCambioDeCama(paciente, input.cama_relacionada);
            }

            pubSub.publish('ACTUALIZAR_PACIENTE', { actualizarPaciente: paciente });
            return paciente;
        } catch (error) {
            console.error("Error al actualizar paciente:", error);
            throw error;
        }
    },

    eliminarPaciente : async (_, {id}, contextValue) => {
        // Verificar si existe o no
        let paciente = await Paciente.findById(id);

        if(!paciente) {
            throw new Error('Ese paciente no existe');
        }

        // Verificar si el user es quien edita
        if(paciente.user.toString() !== contextValue.usuario.id ) {
            throw new Error('No tienes las credenciales');
        }

        // Eliminar Paciente
        await Paciente.findOneAndDelete({id : id});
        return "Paciente Eliminado"
    },

};

export default patientMutations;