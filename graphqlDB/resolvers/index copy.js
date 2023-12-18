
import admisionQueries from './queries/admisionQueries.js';
import antibioticQueries from './queries/antibioticQueries.js';
import bedQueries from './queries/bedQueries.js';
import microorganismQueries from './queries/microorganismQueries.js';
import patientQueries from './queries/patientQueries.js';
import userQueries from './queries/userQueries.js';

import admisionMutations from './mutations/admisionMutations.js';
import antibioticMutations from './mutations/antibioticMutations.js';
import bedMutations from './mutations/bedMutations.js';
import microorganismMutations from './mutations/microorganismMutations.js';
import patientMutations from './mutations/patientMutations.js';
import userMutations from './mutations/userMutations.js';

import patientSubscriptions from './subscriptions/patientSubscriptions.js';

import Admision from '../../models/Admision.js';

import Microorganismo from '../../models/Microorganismo.js';

import { GraphQLScalarType, Kind, GraphQLError  } from 'graphql';
import { format, utcToZonedTime } from 'date-fns-tz';



const resolvers = {


    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            // Define la zona horaria de la Ciudad de México
            const timeZone = 'America/Mexico_City';
            // Convierte la fecha/hora UTC a la zona horaria local
            const zonedDate = utcToZonedTime(value, timeZone);
            // Formatea la fecha/hora según tus necesidades
            return format(zonedDate, 'yyyy-MM-dd HH:mm:ssX', { timeZone });
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return new Date(ast.value);
            }
            return null;
        },
    }),


    Query: {
        ...admisionQueries,
        ...antibioticQueries,
        ...bedQueries,
        ...microorganismQueries,
        ...patientQueries,
        ...userQueries,
    },
    Mutation: {
        ...admisionMutations,
        ...antibioticMutations,
        ...bedMutations,
        ...microorganismMutations,
        ...patientMutations,
        ...userMutations,
    },
    Subscription: {
        ...patientSubscriptions,
    },
/*     Subscription: {
        ...userSubscriptions,
        ...patientSubscriptions,
        ...bedSubscriptions,
        
    }, */

    Admision: {
        paciente_relacionado: async (admision) => {
            await admision.populate('paciente_relacionado');
            return admision.paciente_relacionado;
        },
       cama_relacionada: async (admision) => {
            await admision.populate('cama_relacionada'); // Poblar directamente sin match
            return admision.cama_relacionada;
        },
        microorganismo_relacionado: async (admision) => {
            await admision.populate('microorganismo_relacionado');
            return admision.microorganismo_relacionado;
        },
    },
    Paciente: {
/*         admision_relacionada: async (paciente) => {
            await paciente.populate({
                path: 'admision_relacionada',
                match: { paciente_relacionado: paciente._id }
            });
            return paciente.admision_relacionada;
        },  */
/*         admision_relacionada: async (paciente) => {
            const admisions = await Admision.find({ paciente_relacionado: paciente.id });
            return admisions;
        }, */
        admision_relacionada: async (paciente) => {
            await paciente.populate('admision_relacionada');
            return paciente.admision_relacionada;
        },
    },
    Cama: {
/*         admision_relacionada: async (cama) => {
            await cama.populate({
                path: 'admision_relacionada',
                match: { admision_relacionada: cama._id }
            });
            return cama.admision_relacionada;
        }, */
        admision_relacionada: async (cama) => {
            const admisions = await Admision.find({ cama_relacionada: cama.id });
            return admisions;
        },
    },
    
    Microorganismo: {
        admision_relacionada: async (microorganismo) => {
            await microorganismo.populate({
                path: 'admision_relacionada',
                match: { admision_relacionada: microorganismo._id }
            });
            return microorganismo.admision_relacionada;
        }, 
    },
    
    Antibiotico: {
        microorganismo_relacionado: async (antibiotico) => {
            const microorganismos = await Microorganismo.find({ antibiotico_relacionado: antibiotico.id });
            return microorganismos;
        },
    },




};

export default resolvers;