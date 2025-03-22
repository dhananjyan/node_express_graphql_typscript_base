import { buildSchema } from "type-graphql";
import { expressMiddleware } from "@apollo/server/express4";

// import { ApolloServer } from 'apollo-server-express';
import path from 'path'
import resolver from "../graphql/resolver";
import { authChecker } from "../graphql/authChecker";
import { Context } from "../graphql/common.type";
import { GRAPHQL_PATH } from "../config";
import { ApolloServer } from "@apollo/server";
import express from "express";
import context from "../graphql/context";

const apolloServer = async (app: express.Application) => {

    const schema = await buildSchema({
        resolvers: resolver,
        validate: true,
        authChecker,
        emitSchemaFile: path.resolve(__dirname, "../graphql/schema.graphql"),
    });

    const server = new ApolloServer<Context>({ schema });

    await server.start();  // Start the server

    app.use(
        GRAPHQL_PATH,
        expressMiddleware(server, {
            // Build context
            // 'req.user' comes from 'express-jwt'
            context,
        }),
    );
}

export default apolloServer;