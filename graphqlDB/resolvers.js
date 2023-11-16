// GraphQL Resolvers

import Usuario from '../models/Usuario.js';
import Paciente from '../models/Paciente.js';
import Cama from '../models/Cama.js';
import Microorganismo from '../models/Microorganismo.js';
import Admision from '../models/Admision.js';

import bcryptjs from 'bcryptjs';

import { GraphQLScalarType, Kind, GraphQLError  } from 'graphql';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

const crearToken = (usuario, secreta, expiresIn) => {
  // console.log(usuario);
  const { id, email,nombre, apellido } = usuario;

  return jwt.sign( { id, email, nombre, apellido }, secreta, { expiresIn } )
}


export const resolvers = {

Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return value.toISOString();
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    },
}),

Query: {
    obtenerUsuario: async (_, {}, contextValue) => {
        //console.log("Se llama al resolver obtenerUsuario")
        if(!contextValue){
            throw new GraphQLError('No se recibió Contex por lo que no se puede obtener Usuario');
        }
        return contextValue.usuario;
    }, 
    obtenerPaciente: async (_, { id },) => {
        //console.log("Se llama al resolver obtenerPaciente")
        // Revisar si el paciente existe o no
        const paciente = await Paciente.findById(id);
        //console.log("Paciente encontrado:",paciente)
        if(!paciente) {
            throw new Error('Paciente no encontrado');
        }
        return paciente;
    }, 

/*     obtenerPacientes: async () => {
        //console.log("Se llama al resolver obtenerPacientes")
        try {
            const pacientes = await Paciente.find({});
    
            return pacientes;
        } catch (error) {
            console.log(error);
        }
    }, 
 */
    obtenerPacientes: async () => {
        try {
            return await Paciente.find().populate('cama_relacionada');
        } catch (error) {
            throw new Error(error);
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
    obtenerPacientesUrgencias : async () => {
        try {
            // Obtener los IDs de las camas que están en el rango de 1 a 14
            const camasEnRango = await Cama.find({
                cama_numero: { $gte: 1, $lte: 14 }
            }).select('_id');
            
            // Extraer solo los IDs de las camas
            const camasIds = camasEnRango.map(cama => cama._id);
    
            // Obtener todos los pacientes hospitalizados
            let pacientesHospitalizados = await Paciente.find({
                hospitalizado: true
            }).populate('cama_relacionada');
    
            // Filtrar aquellos cuya última cama relacionada esté en el rango deseado
            let pacientesUrgencias = pacientesHospitalizados.filter(paciente => {
                const ultimaCamaRelacionada = paciente.cama_relacionada[paciente.cama_relacionada.length - 1];
                return camasIds.includes(ultimaCamaRelacionada?._id);
            });
    
            return pacientesUrgencias;
        } catch (error) {
            console.log(error);
            throw error; 
        }
    },
    
    
/*     obtenerPacientesUrgencias: async () => {
        try {
            // Obtener los IDs de las camas que están en el rango de 1 a 14
            const camasEnRango = await Cama.find({
                cama_numero: { $gte: 1, $lte: 14 }
            }).select('_id');
    
            // Extraer solo los IDs de las camas
            const camasIds = camasEnRango.map(cama => cama._id);
    
            // Ahora, encontrar los pacientes hospitalizados que están relacionados con esas camas
            const pacientesUrgencias = await Paciente.find({
                hospitalizado: true,
                cama_relacionada: { $in: camasIds }
            });
    
            return pacientesUrgencias;
        } catch (error) {
            console.log(error);
            throw error; 
        }
    },   */  
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
    obtenerPacientesHospitalizadosSinCama: async () => {
        try {
            const pacientesHospitalizadosSinCama = await Paciente.find({ 
                hospitalizado: true,
                cama_relacionada: null 
            });
            
            return pacientesHospitalizadosSinCama;
        } catch (error) {
            console.log(error);
            throw error; 
        }
    },
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
    obtenerCamas: async () => {
        //console.log("Se llama al resolver obtenerCamas")
        try {
            const camas = await Cama.find({});
            return camas;
        } catch (error) {
            console.log(error);
        }
    }, 
    obtenerCamasOcupadas: async () => {
        //console.log("Se llama al resolver 'obtenerCamasOcupadas")
        try {
          const camasOcupadas = await Cama.find({ 
            cama_ocupada: true 
        });
  
          // Retorna las camas encontradas
          return camasOcupadas;
        } catch (error) {
          throw new Error("Error al obtener las camas ocupadas: " + error.message);
        }
      },
    obtenerCamasDisponibles: async () => {
        //console.log("Se llama al resolver 'obtenerCamasDisponibles")
        try {
            const camasDisponibles = await Cama.find({ 
                cama_ocupada: false, 
                cama_disponible:true 
            });

            // Retorna las camas encontradas
            //console.log("y retorna esto: ",camasDisponibles)
            return camasDisponibles;
        } catch (error) {
            throw new Error("Error al obtener las camas ocupadas: " + error.message);
        }
    },
    obtenerCamasDisponiblesMujer: async () => {
        //console.log("Se llama al resolver 'obtenerCamasDisponibles")
        try {
            const camasDisponiblesMujer = await Cama.find({ 
                cama_ocupada: false, 
                cama_disponible:true,
                cama_genero: { $in: ['Mujer', 'Indeterminado'] }
            });

            // Retorna las camas encontradas
            //console.log("y retorna esto: ",camasDisponibles)
            return camasDisponiblesMujer;
        } catch (error) {
            throw new Error("Error al obtener las camas ocupadas: " + error.message);
        }
    },
    obtenerCamasDisponiblesHombre: async () => {
        //console.log("Se llama al resolver 'obtenerCamasDisponibles")
        try {
            const camasDisponiblesHombre = await Cama.find({ 
                cama_ocupada: false, 
                cama_disponible:true,
                cama_genero: { $in: ['Hombre', 'Indeterminado'] }
            });

            // Retorna las camas encontradas
            //console.log("y retorna esto: ",camasDisponibles)
            return camasDisponiblesHombre;
        } catch (error) {
            throw new Error("Error al obtener las camas ocupadas: " + error.message);
        }
    },
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
      obtenerAntibiotico: async (_, { id }) => {
        // revisar si el producto existe o no
        const antibiotico = await Antibiotico.findById(id);

        if(!antibiotico) {
            throw new Error('Antibiotico no encontrado');
        }

        return producto;
    },
    obtenerAntibioticos: async () => {
        try {
            const antibioticos = await Antibiotico.find({});
            return antibioticos;
        } catch (error) {
            console.log(error);
        }
    }, 
    buscarCama: async(_, { texto }) => {
        const camas = await Cama.find({ $text: { $search: texto } }).limit(10)

        return camas;
    }
},
Paciente: {
    cama_relacionada: async (paciente) => {
        await paciente.populate({
            path: 'cama_relacionada',
            match: { paciente_relacionado: paciente._id }
        });
        return paciente.cama_relacionada;
    },
    microorganismo_relacionado: async (paciente) => {
        const microorganismos = await Microorganismo.find({ paciente_relacionado: paciente.id });
        return microorganismos;
    },   
},
Cama: {
    microorganismo_relacionado: async (cama) => {

        const microorganismos = await Microorganismo.find({ cama_relacionada: cama.id });
        return microorganismos;

    },
    paciente_relacionado: async (cama) => {

        const pacientes = await Paciente.find({ cama_relacionada: cama.id });
        return pacientes;

    },
},
Microorganismo: {
    cama_relacionada: async ( microorganismo ) => {

        const camas = await Cama.find({ microorganismo_relacionado: microorganismo.id });
        return camas;

    },
    paciente_relacionado: async (microorganismo) => {

        const pacientes = await Paciente.find({ microorganismo_relacionado: microorganismo.id });
        return pacientes;

    },
},
Antibiotico: {
    microorganismo_relacionado: async (antibiotico ) => {

        const microorganismos = await Microorganismo.find({ antibiotico_relacionado: antibiotico.id });
        return microorganismos;

    },
    paciente_relacionado: async (antibiotico) => {

        const pacientes = await Paciente.find({ antibiotico_relacionado: antibiotico.id });
        return pacientes;
    },


},
Mutation: {
    nuevoUsuario: async (_, { input } ) => {

        const { email, password } = input;
        
        // Revisar si el usuario ya esta registrado
        const existeUsuario = await Usuario.findOne({email});
        if (existeUsuario) {
            throw new Error('El usuario ya esta registrado');
        }

        // Hashear su password
        const salt = await bcryptjs.genSalt(10);
        input.password = await bcryptjs.hash(password, salt);

        try {
             // Guardarlo en la base de datos
            const usuario = new Usuario(input);
            usuario.save(); // guardarlo
            return usuario;
        } catch (error) {
            console.log(error);
        }
    }, 
    autenticarUsuario: async (_, {input}) => {

        const { email, password } = input;

        // Si el usuario existe
        const existeUsuario = await Usuario.findOne({email});
        if (!existeUsuario) {
            throw new Error('El usuario no existe');
        }

        // Revisar si el password es correcto
        const passwordCorrecto = await bcryptjs.compare( password, existeUsuario.password );
        if(!passwordCorrecto) {
            throw new Error('El Password es Incorrecto');
        }

        // Crear el token
        return {
            token: crearToken(existeUsuario, process.env.SECRETA, '12h' ) 
        }
        
    },
    nuevoPaciente: async (_, { input }, contextValue) => {
        console.log("Se llama al resolver nuevoPaciente")
        console.log("input recibido",input)
        const { expediente } = input
        // Verificar si el paciente ya esta registrado
        const paciente = await Paciente.findOne({ expediente });
        if(paciente) {
            throw new Error('Ese paciente ya esta registrado');
        }

        try {

            const nuevoPaciente = new Paciente(input);

            // asignar el user
            nuevoPaciente.user = contextValue.usuario.id;
            //console.log("Paciente creado",nuevoPaciente)

            let cama = await Cama.findById(input.cama_relacionada);
            //console.log("cama",cama)
    
            if (!cama) {
                throw new Error('La cama relacionada no existe');
            }
    

            // Agregar al cama al paciente
            cama.paciente_relacionado.push(nuevoPaciente.id);
            cama.cama_ocupada = !cama.cama_ocupada;
            await cama.save()


            // guardarlo en la base de datos
            const resultado = await nuevoPaciente.save();
            //console.log("Paciente creado",resultado)
            return resultado;

        } catch (error) {
            console.log(error);
        }
    },

    actualizarCama: async (_, {id, input}) => {
        // revisar si el cama existe o no
        let cama = await Cama.findById(id);

        if(!cama) {
            throw new Error('Cama no encontrada');
        }
        //console.log("input recibido",input)

        // guardarlo en la base de datos
        cama = await Cama.findOneAndUpdate(
            { _id: id }, // Usar _id en lugar de id
            { $set: input }, // Usar $set para actualizar campos individuales
            { new: true } // Devolver el documento actualizado
        );

        return cama;
    }, 
    actualizarPaciente: async (_, { id, input }) => {
        console.log("Se llama a la funcion Actualizar Paciente")
        console.log("se recibe el ID del paciente", id)
        console.log("Input recibido", input)
        
        try {
            let paciente = await Paciente.findById(id);
            
            if (!paciente) {
                throw new Error('Ese paciente no existe');
            }
    
            console.log("Paciente encontrado", paciente);
            const ultimaCamaRelacionada = paciente.cama_relacionada[paciente.cama_relacionada.length - 1];
    
            const { cama_relacionada, ...restoDelInput } = input;
            paciente = await Paciente.findOneAndUpdate(
                { _id: id },
                { $set: restoDelInput },
                { new: true }
            );
    
            if (cama_relacionada) {
                let camaAntigua;
                if (ultimaCamaRelacionada) {
                    camaAntigua = await Cama.findById(ultimaCamaRelacionada);
                    if (camaAntigua) {
                        camaAntigua.cama_ocupada = false;
                        await camaAntigua.save();
                    }
                }
    
                let cama = await Cama.findById(cama_relacionada);
                if (!cama) {
                    throw new Error('La cama relacionada no existe');
                }
    
                if (!cama.paciente_relacionado.includes(paciente.id)) {
                    cama.paciente_relacionado.push(paciente.id);
                }
                cama.cama_ocupada = true;
    
                await cama.save();

                paciente.cama_relacionada.push(cama.id);
                await paciente.save();
            }
    
            return paciente;
        } catch (error) {
            console.error("Error al actualizar paciente:", error);
            throw error;
        }
    },
    
/*     actualizarPaciente: async (_, { id, input }) => {
        console.log("Se llama a la funcion Actualizar Paciente")
        console.log("se recibe el ID del paciente", id)
        console.log("Input recibido", input)
        
        try {
            // Verificar si el paciente existe
            let paciente = await Paciente.findById(id);
            
            if (!paciente) {
                throw new Error('Ese paciente no existe');
            }
            
            console.log("Paciente encontrado",paciente);
            busqueda = paciente.cama_relacionada

            // Actualizar solo los campos proporcionados, excluyendo cama_relacionada
            const { cama_relacionada, ...restoDelInput } = input;
            paciente = await Paciente.findOneAndUpdate(
                { _id: id },
                { $set: restoDelInput },
                { new: true }
            );
    
            // Manejar la cama solo si cama_relacionada está presente
            if (cama_relacionada) {


                let camaAntigua = await Cama.findById(busqueda)
                camaAntigua.cama_ocupada = !cama.cama_ocupada;

                let cama = await Cama.findById(cama_relacionada);
    
                if (!cama) {
                    throw new Error('La cama relacionada no existe');
                }
    
                // Actualizar la relación de cama y paciente
                cama.paciente_relacionado.push(paciente.id);
                cama.cama_ocupada = !cama.cama_ocupada;
    
                // Guardar los cambios en la cama
                await camaAntigua.save();
                await cama.save();
            }
    
            // Guardar los cambios en el paciente
            await paciente.save();
    
            return paciente;
        } catch (error) {
            console.error("Error al actualizar paciente:", error);
            throw error;
        }
    }, */
    
/*     actualizarPaciente: async (_, { id, input }) => {
        console.log("Se llama a la funcion Actualizar Paciente")
        console.log("se recibe el ID del paciente", id)
        console.log("Input recibido", input)
        
        try {
            // Verificar si el paciente existe
            let paciente = await Paciente.findById(id);
        
            if (!paciente) {
                throw new Error('Ese paciente no existe');
            }

            paciente = await Paciente.findOneAndUpdate(
                { _id: id }, // Usar _id en lugar de id
                { $set: input }, // Usar $set para actualizar campos individuales
                { new: true } // Devolver el documento actualizado
            );

            // Agregar al paciente, la cama relacionada
            //paciente.cama_relacionada.push(cama.id);
    
            // Obtener el documento de la cama relacionada por su ID
            let cama = await Cama.findById(input.cama_relacionada);
            //console.log("cama",cama)
    
            if (!cama) {
                throw new Error('La cama relacionada no existe');
            }
    

            // Agregar al cama al paciente
            cama.paciente_relacionado.push(paciente.id);
            cama.cama_ocupada = !cama.cama_ocupada;
    
            // Guardar los cambios en el paciente
            await paciente.save();
            // Guardar los cambios en la cama
            await cama.save()
    
            //console.log("Paciente actualizado", paciente);
            //console.log("Cama actualizada", cama);
            return paciente;
        } catch (error) {
            console.error("Error al actualizar paciente:", error);
            throw error;
        }
    }, */
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
    nuevaCama: async (_, { input }) => {
        //console.log("Se llama al resolver nuevaCama")
        console.log("input recibido",input)

        const { cama_numero } = input
        // Verificar si el paciente ya esta registrado
        const cama = await Cama.findOne({ cama_numero });
        if(cama) {
            throw new Error('Esta cama ya esta registrada');
        }
        try {

          // Crear una nueva instancia de Cama sin valores
          const cama = new Cama(input);
          //console.log("Cama vacia creada",cama)
      
          // Asignar los valores del input a la instancia
          //Object.assign(cama, input);
          //console.log("Cama llenada con input",cama)
      
          // Almacenar en la base de datos
          const resultado = await cama.save();
      
          return resultado;
        } catch (error) {
          console.log(error);
        }
      },
    actualizarCama: async (_, {id, input}) => {
        // revisar si el cama existe o no
        let cama = await Cama.findById(id);

        if(!cama) {
            throw new Error('Cama no encontrada');
        }
        //console.log("input recibido",input)

        // guardarlo en la base de datos
        cama = await Cama.findOneAndUpdate(
            { _id: id }, // Usar _id en lugar de id
            { $set: input }, // Usar $set para actualizar campos individuales
            { new: true } // Devolver el documento actualizado
        );

        return cama;
    }, 
    desocuparCama: async (_, { id }) => {
        //console.log(`Resolver desocuparCama recibió el ID: ${id}`);
        try {
            // Busca la cama por su ID
            const cama = await Cama.findById(id);

            // Si la cama no existe, lanza un error
            if (!cama) {
            throw new Error(`No se encontró una cama con ID ${id}`);
            }

            // Cambia el valor de cama_ocupada a false
            cama.cama_ocupada = false;

            // Guarda la cama actualizada en la base de datos
            await cama.save();

            // Retorna la cama actualizada
            return cama;

        } catch (error) {
            throw new Error("Error al desocupar la cama: " + error.message);
        }
    },
    eliminarCama: async(_, {id}) => {
        //console.log(`Resolver modificarEstadoCama recibió el ID: ${id}`);
        // Revisar si la cama existe o no
        let cama = await Cama.findById(id);
    
        if (!cama) {
            throw new Error('Cama no encontrada');
        }
    
        // Cambiar el valor de "cama_ocupada" a false
        //cama.cama_ocupada = false;
        cama.cama_ocupada = !cama.cama_ocupada;
    
        // Guardar los cambios en la base de datos
        await cama.save();
    
        return "Estado de cama modificado correctamente";
    },
    nuevoMicroorganismo: async (_, { input }) => {
        //console.log("Se inicia resolver 'nuevoMicroorganismo'");
        //console.log('Valor de input paciente_relacionado:', input.paciente_relacionado);
        //console.log('Valor de input cama_relacionada:', input.cama_relacionada);
        //console.log('Valor de input microorganismo:', input.microorganismo_nombre);
    
        try {
            // Crear una instancia de Microorganismo a partir del input
            const microorganismo = new Microorganismo(input);
            //console.log("Microorganismo creado:", microorganismo);
    
            // Obtener el documento del paciente relacionado por su ID
            let paciente = await Paciente.findById(input.paciente_relacionado);
            
            // Agregar al paciente, el ID del microorganismo creado
            //console.log("Paciente relacionado a modificar", paciente);
            paciente.microorganismo_relacionado.push(microorganismo.id);
            //console.log("Paciente relacionado modificado", paciente);

            // Obtener el documento de la cama relacionada por su ID
            let cama = await Cama.findById(input.cama_relacionada);
            
            // Agregar a la cama, el ID del microorganismo creado
            //console.log("cama relacionada a modificar", cama);
            cama.microorganismo_relacionado.push(microorganismo.id);
            //console.log("Cama Relacionada Modificada", cama);
    
            // Guardar los documentos de Paciente y Cama
            await paciente.save();
            await cama.save();
    
            // Guardar el Microorganismo en la base de datos
            const resultado = await microorganismo.save();
    
            return resultado;
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear el microorganismo');
        }
    },        
    actualizarMicroorganismo: async (_, {id, input}) => {
        // revisar si el producto existe o no
        let microorganismo = await Microorganismo.findById(id);

        if(!microorganismo) {
            throw new Error('Producto no encontrado');
        }

        // guardarlo en la base de datos
        microorganismo = await Microorganismo.findOneAndUpdate(
            { id }, 
            input, 
            { new: true } 
        );

        return microorganismo;
    }, 
    eliminarMicroorganismo: async(_, {id}) => {
        // revisar si el producto existe o no
        let microorganismo = await Microorganismo.findById(id);

        if(!microorganismo) {
            throw new Error('Microorganismo no encontrado');
        }

        // Eliminar
        await Microorganismo.findOneAndDelete({id :  id});

        return "Microorganismo Eliminado";
    },
    nuevoAntibiotico: async (_, {input}) => {
        try {
            const antibiotico = new Antibiotico(input);

            // almacenar en la bd
            const resultado = await antibiotico.save();

            return resultado;
        } catch (error) {
            console.log(error);
        }
    }, 
    actualizarAntibiotico: async (_, {id, input}) => {
        // revisar si el producto existe o no
        let antibiotico = await Antibiotico.findById(id);

        if(!antibiotico) {
            throw new Error('Antibiotico no encontrado');
        }

        // guardarlo en la base de datos
        antibiotico = await Antibiotico.findOneAndUpdate({ id : id }, input, { new: true } );

        return antibiotico;
    }, 
 
  },


  };