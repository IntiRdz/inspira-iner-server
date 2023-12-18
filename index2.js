import { ApolloServer } from '@apollo/server';
import { createServer } from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bodyParser from 'body-parser';
import express from 'express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import pubSub  from './graphqlDB/resolvers/pubSub.js';

import cors from 'cors';

import { typeDefs } from './graphqlDB/typeDefs.js';
import  resolvers  from './graphqlDB/resolvers/index.js';
import './db/config.js'

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' })


const PORT = process.env.PORT || 4000; // Puerto por defecto 4000 si no se define en las variables de entorno



const mockLongLastingOperation = (name) => {
  setTimeout(() => {
      pubSub.publish('OPERATION_FINISHED', { operationFinished: { name, endDate: new Date().toDateString() } });
  }, 1000);
}

const schema = makeExecutableSchema({ 
  typeDefs, 
  resolvers,
  context: async ({ req }) => {
/*     const token = req.headers['authorization'] || '';
    if (token) {
      try {
        const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);
        return {
          usuario,
        };
      } catch (error) {
        console.log('Hubo un error en la autenticación');
        console.log(error);
      }
    } */
    return {}; 
  },
});

const app = express();
app.use(cors());
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql'
});

const wsServerCleanup = useServer({schema}, wsServer);

const apolloServer = new ApolloServer({
    schema,
    plugins: [
       // Proper shutdown for the HTTP server.
       ApolloServerPluginDrainHttpServer({ httpServer }),

       // Proper shutdown for the WebSocket server.
       {
        async serverWillStart() {
            return {
                async drainServer() {
                    await wsServerCleanup.dispose();
                }
            }
        }
       }
    ]
});

await apolloServer.start();

app.use('/graphql', bodyParser.json(), expressMiddleware(apolloServer));



httpServer.listen(PORT, () => {
  console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
  console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`);
});