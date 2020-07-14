const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sanitize = require('../utils/sanitize')
require('dotenv').config({ path: 'variables.env' })

const createToken = (user, secret, expiresIn) => {
    const { id, username, created } = user
    return jwt.sign( { id, username, created }, secret, { expiresIn } )
}

const resolvers = {
    Query: {
        getUser: (_, { token }) => {
            const user = jwt.verify(token, process.env.SECRET)
            return user
        },
        getFavs: async (_, {}, ctx) => {
            const { id } = ctx

            const userExist = await User.findById(id)

            if (!userExist) throw new Error(`User with id ${id} no exist`)

            return userExist.favs
        }
    },
    Mutation: {
        register: async (_, { input }) => {
            const { username, password } = input

            const userExist = await User.findOne({username})

            if (userExist) throw new Error(`User with username ${username} already exist`)
            
            const salt = await bcryptjs.genSalt(10)
            input.password = await bcryptjs.hash(password, salt)

            try {
                const user = new User(input)
                user.save()
                return sanitize(user)
            } catch (error) {
                console.log(error)
            }
        },
        login: async (_, { input }) => {
            const { username, password } = input

            const user = await User.findOne({username})

            if (!user) throw new Error(`User with username ${username} no exist`)
        
            const correctPassword = await bcryptjs.compare(password, user.password)

            if (!correctPassword) throw new Error('Incorrect credentials')
            
            return  {token: createToken(user, process.env.SECRET, '24h')}
        },
        toggleFav: async (_, { input }, ctx) => {
            const { username } = ctx
            const { id:favId } = input
            
            const user = await User.findOne({username})
            
            if (!user) throw new Error(`User with username ${username} no exist`)
            
            if (!user.favs.includes(favId)) {
                user.favs.push(favId)
            } else if (user.favs.includes(favId)) {
                let result = user.favs.filter( fav => fav !== favId)
                user.favs = result
            }
            
            user.save()
            return user.favs
        }
    }
}

module.exports = resolvers