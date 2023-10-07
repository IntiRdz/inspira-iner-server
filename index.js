import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './graphqlDB/typeDefs.js';
import { resolvers } from './graphqlDB/resolvers.js';
import './db/config.js'

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' })


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
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

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);