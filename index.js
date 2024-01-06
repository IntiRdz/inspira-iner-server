import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';


import { createServer } from 'http';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import cors from 'cors';

import bodyParser from 'body-parser';

import { typeDefs } from './graphqlDB/typeDefs.js';
import  resolvers  from './graphqlDB/resolvers/index.js';
import './db/config.js'

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' })



// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ 
    typeDefs, 
    resolvers 
});

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ 
  schema,
  onError: (ctx, msg, errors) => {
    console.error('Error en WebSocket:', errors);
  },
}, wsServer);


// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
    schema,
    formatError: (error) => {
      // Muestra más detalles sobre los errores
      console.error(error);
      return {
          message: error.message,
          locations: error.locations,
          path: error.path,
          ...error.extensions, // Proporciona detalles adicionales si están disponibles
      };
    },
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
  
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
// Ensure we wait for our server to start
await server.start();
app.use('/graphql', (cors({
  origin: 'http://tu-dominio-frontend.com', // Reemplaza con el dominio de tu cliente
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permite cookies
})), bodyParser.json(), expressMiddleware(server));

const PORT = process.env.PORT || 4000; // Puerto por defecto 4000 si no se define en las variables de entorno

// Now that our HTTP server is fully set up, actually listen.
httpServer.listen(PORT, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`);
  });
  