require('dotenv').config()
const mongoose = require('mongoose')

const DB_URL = process.env.DB_MONGO

const conectionDB = () => {
    return mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, err => {
        if (err) console.log(`Conection to DB failed ${err}`)
        else console.log("Conection to DB success")
    })
}

const db = mongoose.connection

db.on("error",console.error.bind(console,"MongoDB conection error"))

module.exports = conectionDB