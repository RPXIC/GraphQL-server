const { gql } = require('apollo-server')

const typeDefs = gql`

    type User {
        id: ID
        username: String
        created: String
    }

    type Token {
        token: String!
    }

    input UserInput {
        username: String!
        password: String!
    }

    input AuthenticateInput {
        username: String!
        password: String!
    }

    input FavInput {
        id: String!
    }

    type Query {
            """Get user data"""
        getUser(token: String!): User
            """Get favorites"""
        getFavs: [String]
    }

    type Mutation {
            """Create user"""
        register(input: UserInput!): User
            """Authenticate user"""
        login(input: AuthenticateInput!): Token
            """Add or delete from favorite list"""
        toggleFav(input: FavInput!): [String]!
    }
`

module.exports = typeDefs