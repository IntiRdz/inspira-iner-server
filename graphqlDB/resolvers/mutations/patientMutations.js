import Paciente from '../../../models/Paciente.js';
import Admision from '../../../models/Admision.js';
import Cama from '../../../models/Cama.js';
import CamaHistorial from '../../../models/CamaHistorial.js';
import pubSub from '../pubSub.js';



// Función auxiliar para crear una admisión
async function crearAdmision(input, pacienteId, camaId) {
    const { fecha_ingreso, fecha_prealta, fecha_egreso, servicio_tratante } = input;

    // Primero, crear y guardar la nueva Admision
    const nuevaAdmision = new Admision({
        paciente_relacionado: pacienteId,
        cama_relacionada: [], // Inicializar como arreglo vacío, se actualizará luego
        fecha_ingreso: fecha_ingreso || new Date(),
        servicio_tratante,
        fecha_prealta,
        fecha_egreso,
        hospitalizado: true
    });

    const admisionGuardada = await nuevaAdmision.save();

    // Luego, crear y guardar el CamaHistorial con el ID de la admisión guardada
    const nuevoCamaHistorial = new CamaHistorial({
        fecha_traslado: new Date(), // Fecha actual
        cama: camaId,
        admision_relacionada: admisionGuardada.id
    });

    const camaHistorialGuardado = await nuevoCamaHistorial.save();

    // Actualizar la admisión con el nuevo CamaHistorial
    admisionGuardada.cama_relacionada.push(camaHistorialGuardado.id);
    await admisionGuardada.save();

    // Obtener la cama por ID y agregar el CamaHistorial a su arreglo
    const cama = await Cama.findById(camaId);
    if (!cama) {
        throw new Error('La cama relacionada no existe');
    }
    cama.camahistorial.push(camaHistorialGuardado.id);
    await cama.save();
    return admisionGuardada;
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
            // Obteniendo el ID del último CamaHistorial de la admisión
            const idUltimoCamaHistorial = ultimaAdmision.cama_relacionada[ultimaAdmision.cama_relacionada.length - 1];

            if (idUltimoCamaHistorial) {
                // Obteniendo el último CamaHistorial
                const ultimoCamaHistorial = await CamaHistorial.findById(idUltimoCamaHistorial);
                if (ultimoCamaHistorial && ultimoCamaHistorial.cama) {
                    // Obteniendo la cama asociada con el último CamaHistorial
                    const camaUltimaAdmision = await Cama.findById(ultimoCamaHistorial.cama);
                    if (camaUltimaAdmision) {
                        camaUltimaAdmision.cama_ocupada = false;
                        camaUltimaAdmision.cama_genero = "Indeterminado";
                        await camaUltimaAdmision.save();
                    }
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

    if (ultimaAdmision && ultimaAdmision.cama_relacionada.length > 0) {
        const camaHistorialId = ultimaAdmision.cama_relacionada[ultimaAdmision.cama_relacionada.length - 1]; // Último CamaHistorial
        const camaAntiguaHistorial = await CamaHistorial.findById(camaHistorialId);

        if (camaAntiguaHistorial) {
            const camaAntigua = await Cama.findById(camaAntiguaHistorial.cama);
            if (camaAntigua) {
                camaAntigua.cama_ocupada = false;
                camaAntigua.cama_genero = "Indeterminado";
                await camaAntigua.save();
            }
        }

        const camaNueva = await Cama.findById(camaNuevaId);
        if (!camaNueva) {
            throw new Error('La cama relacionada no existe');
        }

        camaNueva.cama_ocupada = true;
        camaNueva.cama_genero = paciente.pac_genero;
        //await camaNueva.save();

        // Crear un nuevo CamaHistorial para la cama nueva
        const nuevoCamaHistorial = new CamaHistorial({
            fecha_traslado: new Date(),
            cama: camaNueva.id,
            admision_relacionada: ultimaAdmision.id
        });
        const camaHistorialGuardado = await nuevoCamaHistorial.save();

        // Actualizar la admisión con el nuevo CamaHistorial
        ultimaAdmision.cama_relacionada.push(camaHistorialGuardado.id);
        await ultimaAdmision.save();

        // Agregar el nuevo CamaHistorial al arreglo camahistorial de la nueva cama
        camaNueva.camahistorial.push(camaHistorialGuardado.id);
        await camaNueva.save();

    } else {
        throw new Error('El paciente no tiene admisión relacionada');
    }
}








// Función auxiliar para crear una admisión
async function crearAdmision1(input, pacienteId, camaId) {
    const { fecha_ingreso, fecha_prealta, fecha_egreso, servicio_tratante } = input;

    // Primero, crear y guardar la nueva Admision
    const nuevaAdmision = new Admision({
        paciente_relacionado: pacienteId,
        cama_relacionada: [], // Inicializar como arreglo vacío, se actualizará luego
        fecha_ingreso: fecha_ingreso || new Date(),
        servicio_tratante,
        fecha_prealta,
        fecha_egreso,
        hospitalizado: true
    });

    const admisionGuardada = await nuevaAdmision.save();

    // Luego, crear y guardar el CamaHistorial con el ID de la admisión guardada
    const nuevoCamaHistorial = new CamaHistorial({
        cama: camaId,
        admision_relacionada: admisionGuardada.id
    });

    const camaHistorialGuardado = await nuevoCamaHistorial.save();

    // Actualizar la admisión con el nuevo CamaHistorial
    admisionGuardada.cama_relacionada.push(camaHistorialGuardado.id);
    await admisionGuardada.save();

    // Obtener la cama por ID y agregar el CamaHistorial a su arreglo
    const cama = await Cama.findById(camaId);
    if (!cama) {
        throw new Error('La cama relacionada no existe');
    }
    cama.camahistorial.push(camaHistorialGuardado.id);
    await cama.save();
    return admisionGuardada;
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

            //console.log("Servicio tratante: ", input.servicio_tratante);

            const admisionGuardada = await crearAdmision1(input, paciente.id, cama.id);

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
            const paciente = await Paciente.findByIdAndUpdate(
                id, 
                { $set: input }, 
                { new: true });
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
/*         if(paciente.user.toString() !== contextValue.usuario.id ) {
            throw new Error('No tienes las credenciales');
        } */

        // Eliminar Paciente
        await Paciente.findOneAndDelete({id : id});
        return "Paciente Eliminado"
    },

};

export default patientMutations;