import Paciente from '../../../models/Paciente.js';
import Admision from '../../../models/Admision.js';
import Cama from '../../../models/Cama.js';


// Función auxiliar para crear una admisión
async function crearAdmision(input, pacienteId, camaId) {
    const { fecha_ingreso, fecha_prealta, fecha_egreso, hospitalizado } = input;
    const nuevaAdmision = new Admision({
        paciente_relacionado: pacienteId,
        cama_relacionada: camaId,
        fecha_ingreso: fecha_ingreso || new Date(),
        fecha_prealta,
        fecha_egreso,
        hospitalizado: hospitalizado !== undefined ? hospitalizado : true
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
            await camaAntigua.save();
        }

        const camaNueva = await Cama.findById(camaNuevaId);
        if (!camaNueva) {
            throw new Error('La cama relacionada no existe');
        }

        camaNueva.cama_ocupada = true;
        await camaNueva.save();

        ultimaAdmision.cama_relacionada = camaNueva.id;
        await ultimaAdmision.save();
    } else {
        throw new Error('El paciente no tiene admisión relacionada');
    }
}


const patientMutations = {

/*     nuevoPaciente: async (_, { input }, contextValue) => {
        console.log("Se llama al resolver nuevoPaciente");
        console.log("input recibido", input);
    
        // Verificar si el paciente ya está registrado
        const { expediente } = input;
        const pacienteExistente = await Paciente.findOne({ expediente });
        if (pacienteExistente) {
            throw new Error('Ese paciente ya está registrado');
        }
    
        try {
            // Extraer campos relacionados con la admisión del input
            const { cama_relacionada, fecha_ingreso, fecha_prealta, fecha_egreso, hospitalizado, ...restoDelInput } = input;
            
            // Crear la instancia del nuevo paciente
            const nuevoPaciente = new Paciente({...restoDelInput});
            
            // Asignar el usuario desde el contexto
            // nuevoPaciente.user = contextValue.usuario.id;
            
            // Guardar el paciente en la base de datos
            const pacienteGuardado = await nuevoPaciente.save();
            
            // Verificar si la cama relacionada existe
            let cama = await Cama.findById(cama_relacionada);
            if (!cama) {
                throw new Error('La cama relacionada no existe');
            }
            if (cama.cama_ocupada) {
                throw new Error('La cama relacionada ya está ocupada');
            }else{
                cama.cama_ocupada = true;
                await cama.save();
            }

                // Crear la nueva admisión
            const nuevaAdmision = new Admision({
                paciente: pacienteGuardado.id,
                cama_relacionada,
                fecha_ingreso: fecha_ingreso || new Date(), 
                fecha_prealta, 
                fecha_egreso, 
                hospitalizado: hospitalizado !== undefined ? hospitalizado : true
            });
            
            // Guardar la nueva admisión en la base de datos
            const admisionGuardada = await nuevaAdmision.save();
            
            // Agregar la admisión al paciente y a la cama
            pacienteGuardado.admision_relacionada.push(admisionGuardada.id);
            await pacienteGuardado.save();
    
            cama.admision_relacionada.push(admisionGuardada.id);
            await cama.save();
    
            console.log("Paciente creado", pacienteGuardado);
    
            // Retornar el paciente guardado
            return pacienteGuardado;
    
        } catch (error) {
            console.error("Error completo:", error);
            throw new Error(error.message);
        }
    }, */


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
            nuevoPaciente.user = contextValue.usuario.id;
            nuevoPaciente.expediente = expediente;
            nuevoPaciente.creado= new Date();
            const paciente = await nuevoPaciente.save();

            cama.cama_ocupada = true;
            await cama.save();

            const admisionGuardada = await crearAdmision(input, paciente.id, cama.id);

            paciente.admision_relacionada.push(admisionGuardada.id);
            await paciente.save();
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

            return paciente;
        } catch (error) {
            console.error("Error al actualizar paciente:", error);
            throw error;
        }
    },
    
    

/*     actualizarPaciente: async (_, { id, input }) => {
        console.log("Se llama a la función Actualizar Paciente");
        console.log("se recibe el ID del paciente", id);
        console.log("Input recibido", input);
    
        try {
            let paciente = await Paciente.findById(id);
    
            if (!paciente) {
                throw new Error('Ese paciente no existe');
            }
    
            console.log("Paciente encontrado", paciente);
    
            // Extraer campos relacionados con la admisión y la cama del input
            const { cama_relacionada, fecha_ingreso, fecha_prealta, fecha_egreso, hospitalizado, ...restoDelInput } = input;
    
            // Actualizar los detalles del paciente
            paciente = await Paciente.findOneAndUpdate(
                { _id: id },
                { $set: restoDelInput },
                { new: true }
            );
    
            // Encuentra y actualiza la última admisión relacionada del paciente
            let ultimaAdmision = await Admision.findOne({ paciente_relacionado: id }).sort({ fecha_ingreso: -1 });
    
            if (ultimaAdmision) {
                // Actualiza los detalles de la admisión
                ultimaAdmision.fecha_ingreso = fecha_ingreso || ultimaAdmision.fecha_ingreso;
                ultimaAdmision.fecha_prealta = fecha_prealta || ultimaAdmision.fecha_prealta;
                ultimaAdmision.fecha_egreso = fecha_egreso || ultimaAdmision.fecha_egreso;
                ultimaAdmision.hospitalizado = hospitalizado !== undefined ? hospitalizado : ultimaAdmision.hospitalizado;
    
                // Si la fecha de egreso no es null, cambia hospitalizado a false y busca la última cama para cambiar cama_ocupada a false
                if (fecha_egreso) {
                    ultimaAdmision.hospitalizado = false;
    
                    // Asegúrate de que haya camas relacionadas
                    if (ultimaAdmision.cama_relacionada && ultimaAdmision.cama_relacionada.length > 0) {
                        // Obtiene el ID de la última cama relacionada
                        let idUltimaCama = ultimaAdmision.cama_relacionada[ultimaAdmision.cama_relacionada.length - 1];
                        let camaUltimaAdmision = await Cama.findById(idUltimaCama);
                        
                        if (camaUltimaAdmision) {
                            camaUltimaAdmision.cama_ocupada = false;
                            await camaUltimaAdmision.save();
                        }
                    }
                }
    
                await ultimaAdmision.save();
            } else {
                // Manejar la situación donde no hay una admisión previa (si es necesario)
            }
    
            // Manejo de la cama
            if (cama_relacionada) {
                // (tu lógica actual para manejar la cama)
                if (ultimaAdmision) {
                    // Desocupar la cama anterior si existe
                    let camaAntigua = await Cama.findById(ultimaAdmision.cama_relacionada);
                    if (camaAntigua) {
                        camaAntigua.cama_ocupada = false;
                        await camaAntigua.save();
                    }
    
                    // Encuentra la nueva cama
                    let camaNueva = await Cama.findById(cama_relacionada);
                    if (!camaNueva) {
                        throw new Error('La cama relacionada no existe');
                    }
    
                    // Actualizar la cama en la última admisión
                    ultimaAdmision.cama_relacionada = camaNueva.id;
                    await ultimaAdmision.save();
    
                    // Ocupar la nueva cama
                    camaNueva.cama_ocupada = true;
                    await camaNueva.save();
                } else {
                    throw new Error('El paciente no tiene admisión relacionada');
                }
            }
    
            return paciente;
        } catch (error) {
            console.error("Error al actualizar paciente:", error);
            throw error;
        }
    },     */
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