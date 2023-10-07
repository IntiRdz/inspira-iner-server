import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';

import { typeDefs } from './graphqlDB/typeDefs.js';
import { resolvers } from './graphqlDB/resolvers.js';
import './db/config.js'

import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' })

import jwt from 'jsonwebtoken'


// Crear una instancia de express
const app = express();

// Habilita CORS para permitir solicitudes desde 'http://localhost:3000'
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: ({req}) => {
    const token = req.headers['authorization'] || '';
    if(token) {
        try {
            const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA );
            // console.log(usuario);
            return {
                usuario
            }
        } catch (error) {
            console.log('Hubo un error en la autenticación');
            console.log(error);
        }
    }
},
});

await server.start();

app.use(
  '/graphql',
  cors({ origin: ['http://localhost:3000', 'https://vercel.com/'] }),
  bodyParser.json(),
  expressMiddleware(server),
);



/* app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) */




await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
console.log(`🚀 Servidor listo en la URL http://localhost:${process.env.PORT || 4000}`);