require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')
const conectionDB = require('./config/db')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

//Conection to DB
conectionDB()

//Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: {    
        reportSchema: true
    },
    context: ({req}) => {
        const token = req.headers['authorization'] || ''
        if (token) {
            try {
                const userId = jwt.verify(token.replace('Bearer ', ''), SECRET)
                return userId
            } catch (error) {
                console.log(error.name)
            }
        }
    }
})

//Run server
server.listen({ port: process.env.PORT || 4000}).then( ({url}) => {
    console.log(`Server up in URL ${url}`)
})