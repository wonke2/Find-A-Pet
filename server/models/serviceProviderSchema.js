const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const saltRounds = 10
const path = require('path')
require('dotenv').config({path: path.join(__dirname, '../../.env')})

const url = process.env.MONGODB_SP_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

const serviceSchema = new mongoose.Schema({
    serviceProviderName: {
        type: String,
        required: true
    },
    serviceName: {
        type: String,
        required: true
    },
    serviceDescription: {
        type: String,
        required: true
    },
    serviceLocation: {
        type: String,
        required: true
    }
})

const serviceProviderSchema = new mongoose.Schema({
    serviceProviderName: {
        type: String,
        required: true,
        unique: true
    },
    serviceProviderPassword: {
        type: String,
        required: true
    },
    orgName: { type: String, required: true},
    serviceProviderAddress: { type: String},
    serviceProviderEmail: { type: String, required: true, unique: true },
    serviceProviderPhone: { type: String, required: true, unique: true },
    servicesProvided: [serviceSchema]
})

serviceProviderSchema.pre('save', async function (next) { 
    try {
        if (this.isModified("serviceProviderPassword")) {
            const hashedPassword = await bcrypt.hash(this.serviceProviderPassword, saltRounds)
            this.serviceProviderPassword = hashedPassword
        }
        next()
    } catch (err) {
    }
})

serviceProviderSchema.methods.validatePassword = async function (password) {
    try {
        const result = await bcrypt.compare(password, this.serviceProviderPassword)
        return result
    } catch (err) {
        throw new Error(err)
    }
}
serviceProviderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
    }
})

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema)

module.exports = ServiceProvider