// GraphQL Resolvers

import Usuario from '../models/Usuario.js';
import Paciente from '../models/Paciente.js';
import Cama from '../models/Cama.js';
import Microorganismo from '../models/Microorganismo.js';

import Producto from '../models/Producto.js';
import Cliente from '../models/Cliente.js';
import Pedido from '../models/Pedido.js';

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
        if(!contextValue){
            throw new GraphQLError('No se recibió Contex por lo que no se puede obtener Usuario');
        }
        return contextValue.usuario;
    }, 

/*     adminExample: (parent, args, contextValue, info) => {
        if (contextValue.authScope !== ADMIN) {
          throw new GraphQLError('not admin!', {
            extensions: { code: 'UNAUTHENTICATED' },
          });
        }
      }, */

    
    obtenerPacientes: async () => {
        try {
            const pacientes = await Paciente.find({});
            return pacientes;
        } catch (error) {
            console.log(error);
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
    obtenerPaciente: async (_, { id } ) => {
        // Revisar si el paciente existe o no
        const paciente = await Paciente.findById(id);
    
        if (!paciente) {
            return null; // Devolver null en lugar de lanzar un error
        }
    
        // Quien lo creo puede verlo
        return paciente;
    },
    obtenerCamas: async () => {
        try {
            const camas = await Cama.find({});
            return camas;
        } catch (error) {
            console.log(error);
        }
    }, 
    obtenerCama: async (_, { id }) => {
        // revisar si el cama existe o no
        const cama = await Cama.findById(id);

        if(!cama) {
            throw new Error('Cana no encontrada');
        }

        return cama;
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
        try {
            console.log('Valor de input paciente_relacionado:', input.paciente_relacionado);
            const microorganismos = await Microorganismo.find({ paciente_relacionado: id });
            console.log("ID de paciente recibido:", id);
            return microorganismos;
        } catch (error) {
          console.error("Error al buscar microorganismos:", error);
          throw error; // Deberías lanzar el error para manejarlo adecuadamente en GraphQL
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
    obtenerAntibioticos: async () => {
        try {
            const antibioticos = await Antibiotico.find({});
            return antibioticos;
        } catch (error) {
            console.log(error);
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
    obtenerClientes: async () => {
        try {
            const clientes = await Cliente.find({});
            return clientes;
        } catch (error) {
            console.log(error);
        }
    }, 
    obtenerClientesVendedor: async (_, {}, contextValue ) => {
        try {
            const clientes = await Cliente.find({ vendedor: contextValue.usuario.id.toString() });
            return clientes;
        } catch (error) {
            console.log(error);
        }
    }, 
    obtenerCliente: async (_, { id }, contextValue) => {
        // Revisar si el cliente existe o no
        const cliente = await Cliente.findById(id);

        if(!cliente) {
            throw new Error('Cliente no encontrado');
        }

        // Quien lo creo puede verlo
        if(cliente.vendedor.toString() !== contextValue.usuario.id ) {
            throw new Error('No tienes las credenciales');
        }

        return cliente;
    }, 
    obtenerProductos: async () => {
        try {
            const productos = await Producto.find({});
            return productos;
        } catch (error) {
            console.log(error);
        }
    }, 
    obtenerProducto: async (_, { id }) => {
        // revisar si el producto existe o no
        const producto = await Producto.findById(id);

        if(!producto) {
            throw new Error('Producto no encontrado');
        }

        return producto;
    },
    obtenerPedidos: async () => {
        try {
            const pedidos = await Pedido.find({});
            return pedidos;
        } catch (error) {
            console.log(error);
        }
    }, 
    obtenerPedidosUser: async (_, {}, contextValue) => {
        try {
            const pedidos = await Pedido.find({ user: contextValue.usuario.id }).populate('paciente');

            // console.log(pedidos);
            return pedidos;
        } catch (error) {
            console.log(error);
        }
    }, 
    obtenerPedido: async(_, {id}, contextValue) => {
        // Si el pedido existe o no
        const pedido = await Pedido.findById(id);
        if(!pedido) {
            throw new Error('Pedido no encontrado');
        }

        // Solo quien lo creo puede verlo
        if(pedido.user.toString() !== contextValue.usuario.id) {
            throw new Error('No tienes las credenciales');
        }

        // retornar el resultado
        return pedido;
    }, 
    obtenerPedidosEstado: async (_, { estado }, contextValue) => {
        const pedidos = await Pedido.find({ user: contextValue.usuario.id, estado });

        return pedidos;
    },
    mejoresPacientes: async () => {
        const pacientes = await Pedido.aggregate([
            { $match : { estado : "COMPLETADO" } },
            { $group : {
                _id : "$paciente", 
                total: { $sum: '$total' }
            }}, 
            {
                $lookup: {
                    from: 'pacientes', 
                    localField: '_id',
                    foreignField: "_id",
                    as: "paciente"
                }
            }, 
            {
                $limit: 10
            }, 
            {
                $sort : { total : -1 }
            }
        ]);

        return pacientes;
    }, 
    mejoresUseres: async () => {
        const useres = await Pedido.aggregate([
            { $match : { estado : "COMPLETADO"} },
            { $group : {
                _id : "$user", 
                total: {$sum: '$total'}
            }},
            {
                $lookup: {
                    from: 'usuarios', 
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            }, 
            {
                $limit: 3
            }, 
            {
                $sort: { total : -1 }
            }
        ]);

        return useres;
    },
    buscarProducto: async(_, { texto }) => {
        const productos = await Producto.find({ $text: { $search: texto  } }).limit(10)

        return productos;
    },
    buscarCama: async(_, { texto }) => {
        const camas = await Cama.find({ $text: { $search: texto } }).limit(10)

        return camas;
    }
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

        console.log(contextValue);

        const { expediente } = input
        // Verificar si el paciente ya esta registrado
        console.log(input);

        const paciente = await Paciente.findOne({ expediente });
        if(paciente) {
            throw new Error('Ese paciente ya esta registrado');
        }

        const nuevoPaciente = new Paciente(input);

        // asignar el user
        nuevoPaciente.user = contextValue.usuario.id;

        // guardarlo en la base de datos

        try {
            const resultado = await nuevoPaciente.save();
            return resultado;
        } catch (error) {
            console.log(error);
        }
    },
    actualizarPaciente: async (_, {id, input}, contextValue) => {
        // Verificar si existe o no
        let paciente = await Paciente.findById(id);

        if(!paciente) {
            throw new Error('Ese paciente no existe');
        }

        // Verificar si el user es quien edita
        if(paciente.user.toString() !== contextValue.usuario.id ) {
            throw new Error('No tienes las credenciales');
        }

        // guardar el paciente
        paciente = await Paciente.findOneAndUpdate({_id : id}, input, {new: true} );
        return paciente;
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
        await Paciente.findOneAndDelete({_id : id});
        return "Paciente Eliminado"
    },
    nuevaCama: async (_, {input}) => {
        try {
            const cama = new Cama(input);

            // almacenar en la bd
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

        // guardarlo en la base de datos
        cama = await Cama.findOneAndUpdate({ _id : id }, input, { new: true } );

        return cama;
    }, 
    eliminarCama: async(_, {id}) => {
        // revisar si el cama existe o no
        let cama = await Cama.findById(id);

        if(!cama) {
            throw new Error('Producto cama');
        }

        // Eliminar
        await Producto.findOneAndDelete({_id :  id});

        return "Cama Eliminado";
    },
    nuevoMicroorganismo: async (_, { input }) => {
    try {
        
        // Agrega este registro para verificar el valor de input.paciente_relacionado
        console.log('Valor de input paciente_relacionado:', input.paciente_relacionado);
        console.log('Valor de input  cama_relacionada:', input.cama_relacionada);
        // Crear una instancia de Microorganismo a partir del input
        const microorganismo = new Microorganismo(input);


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
        microorganismo = await Microorganismo.findOneAndUpdate({ _id : id }, input, { new: true } );

        return microorganismo;
    }, 
    eliminarMicroorganismo: async(_, {id}) => {
        // revisar si el producto existe o no
        let microorganismo = await Microorganismo.findById(id);

        if(!microorganismo) {
            throw new Error('Microorganismo no encontrado');
        }

        // Eliminar
        await Microorganismo.findOneAndDelete({_id :  id});

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
        antibiotico = await Antibiotico.findOneAndUpdate({ _id : id }, input, { new: true } );

        return antibiotico;
    }, 
    eliminarProducto: async(_, {id}) => {
        // revisar si el producto existe o no
        let producto = await Producto.findById(id);

        if(!producto) {
            throw new Error('Producto no encontrado');
        }

        // Eliminar
        await Producto.findOneAndDelete({_id :  id});

        return "Producto Eliminado";
    },
    nuevoProducto: async (_, {input}) => {
        try {
            const producto = new Producto(input);

            // almacenar en la bd
            const resultado = await producto.save();

            return resultado;
        } catch (error) {
            console.log(error);
        }
    }, 
    actualizarProducto: async (_, {id, input}) => {
        // revisar si el producto existe o no
        let producto = await Producto.findById(id);

        if(!producto) {
            throw new Error('Producto no encontrado');
        }

        // guardarlo en la base de datos
        producto = await Producto.findOneAndUpdate({ _id : id }, input, { new: true } );

        return producto;
    }, 
    eliminarProducto: async(_, {id}) => {
        // revisar si el producto existe o no
        let producto = await Producto.findById(id);

        if(!producto) {
            throw new Error('Producto no encontrado');
        }

        // Eliminar
        await Producto.findOneAndDelete({_id :  id});

        return "Producto Eliminado";
    },
    nuevoPedido: async (_, {input}, contextValue) => {

        const { paciente } = input
        
        // Verificar si existe o no
        let pacienteExiste = await Paciente.findById(paciente);

        if(!pacienteExiste) {
            throw new Error('Ese paciente no existe');
        }

        // Verificar si el paciente es del user
        if(pacienteExiste.user.toString() !== contextValue.usuario.id ) {
            throw new Error('No tienes las credenciales');
        }

        // Revisar que el stock este disponible
        for await ( const articulo of input.pedido ) {
            const { id } = articulo;

            const producto = await Producto.findById(id);

            if(articulo.cantidad > producto.existencia) {
                throw new Error(`El articulo: ${producto.nombre} excede la cantidad disponible`);
            } else {
                // Restar la cantidad a lo disponible
                producto.existencia = producto.existencia - articulo.cantidad;

                await producto.save();
            }
        }

        // Crear un nuevo pedido
        const nuevoPedido = new Pedido(input);

        // asignarle un user
        nuevoPedido.user = contextValue.usuario.id;

    
        // Guardarlo en la base de datos
        const resultado = await nuevoPedido.save();
        return resultado;

        
    },
    actualizarPedido: async(_, {id, input}, contextValue) => {

        const { paciente } = input;

        // Si el pedido existe
        const existePedido = await Pedido.findById(id);
        if(!existePedido) {
            throw new Error('El pedido no existe');
        }

        // Si el paciente existe
        const existePaciente = await Paciente.findById(paciente);
        if(!existePaciente) {
            throw new Error('El Paciente no existe');
        }

        // Si el paciente y pedido pertenece al user
        if(existePaciente.user.toString() !== contextValue.usuario.id ) {
            throw new Error('No tienes las credenciales');
        }

        // Revisar el stock
        if( input.pedido ) {
            for await ( const articulo of input.pedido ) {
                const { id } = articulo;

                const producto = await Producto.findById(id);

                if(articulo.cantidad > producto.existencia) {
                    throw new Error(`El articulo: ${producto.nombre} excede la cantidad disponible`);
                } else {
                    // Restar la cantidad a lo disponible
                    producto.existencia = producto.existencia - articulo.cantidad;

                    await producto.save();
                }
            }
        }



        // Guardar el pedido
        const resultado = await Pedido.findOneAndUpdate({_id: id}, input, { new: true });
        return resultado;

    },
    eliminarPedido: async (_, {id}, contextValue) => {
        // Verificar si el pedido existe o no
        const pedido = await Pedido.findById(id);
        if(!pedido) {
            throw new Error('El pedido no existe')
        }

        // verificar si el user es quien lo borra
        if(pedido.user.toString() !== contextValue.usuario.id ) {
            throw new Error('No tienes las credenciales')
        }

        // eliminar de la base de datos
        await Pedido.findOneAndDelete({_id: id});
        return "Pedido Eliminado"
    }

  },


  };