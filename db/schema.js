const { gql } = require('apollo-server')

const typeDefs = gql`

    type User {
        id: ID!
        username: String!
        created: String!
    }

    type UserAuth {
        user: User!
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
        register(input: UserInput!): String
            """Authenticate user"""
        authenticate(input: AuthenticateInput!): UserAuth!
            """Add or delete from favorite list"""
        toggleFav(input: FavInput!): [String]!
    }
`

module.exports = typeDefs