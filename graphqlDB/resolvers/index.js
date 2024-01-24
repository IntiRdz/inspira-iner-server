
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
import diagnosticMutations from './mutations/diagnosticMutations.js';
import programMutations from './mutations/programMutations.js';

import patientSubscriptions from './subscriptions/patientSubscriptions.js';
import bedSubscriptions from './subscriptions/bedSubscriptions.js';

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
        ...diagnosticMutations,
        ...programMutations,
    },
    Subscription: {
        ...patientSubscriptions,
        ...bedSubscriptions,
    },
     Cama: {
        /*
        camahistorial: async (cama) => {
            await cama.populate('camahistorial');
            return cama.camahistorial;
        },
        */
        camahistorial: async (cama) => {
            await cama.populate('camahistorial');
            // Asumiendo que 'camahistorial' está ordenado cronológicamente
            const historial = cama.camahistorial;
            return historial.length > 0 ? [historial[historial.length - 1]] : [];
        },
    }, 
    Microorganismo: {
        camahistorial: async (microorganismo) => {
            await microorganismo.populate('camahistorial'); // Poblar directamente sin match
            return microorganismo.camahistorial;
        },
    },
    CamaHistorial: {
        cama: async (camahistorial) => {
            await camahistorial.populate('cama'); // Poblar directamente sin match
            return camahistorial.cama;
        },
        microorganismo_relacionado: async (camahistorial) => {
            await camahistorial.populate('microorganismo_relacionado');
            return camahistorial.microorganismo_relacionado;
        },
        admision_relacionada: async (camahistorial) => {
            await camahistorial.populate('admision_relacionada');
            return camahistorial.admision_relacionada;
        },

    },
    Admision: {
        paciente_relacionado: async (admision) => {
            await admision.populate('paciente_relacionado');
            return admision.paciente_relacionado;
        },
       cama_relacionada: async (admision) => {
            await admision.populate('cama_relacionada'); // Poblar directamente sin match
            return admision.cama_relacionada;
        },
        diagnostico: async (admision) => {
            await admision.populate('diagnostico'); // Poblar directamente sin match
            return admision.diagnostico;
        },
        programaintegral: async (admision) => {
            await admision.populate('programaintegral'); // Poblar directamente sin match
            return admision.programaintegral;
        },
    },
    Paciente: {
        admision_relacionada: async (paciente) => {
            await paciente.populate('admision_relacionada');
            return paciente.admision_relacionada;
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