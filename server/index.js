const express =require('express');
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require('cors');
const bodyparser = require('body-parser');
const axios = require('axios');
const { USERS } = require("./user");
const { TODOS } = require("./todo");

async function startServer(){
const app=express();
const server = new ApolloServer({
    typeDefs: `
    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        phone: String!
        website: String!
    }

    type Todo {
        id: ID!
        title: String!
        completed: Boolean
        user: User
    }

    type Query {
        getTodos: [Todo]
        getUsers: [User]
        getUser(id: ID!): User
    }
`,
    resolvers:{

        Todo: {
            user: (todo) => USERS.find((e) => e.id === todo.id),
          },
        Query: {
            getTodos: () => TODOS,
            getUsers: () => USERS,
            getUser: async (parent, { id }) => USERS.find((e) => e.id === id),
          
      
    },}
});
app.use(cors());
app.use(bodyparser.json());

await server.start();

app.use('/graphql',expressMiddleware(server));
app.listen({port:8000},()=>{    
    console.log('Server is running on http://localhost:4000');});



}
startServer();