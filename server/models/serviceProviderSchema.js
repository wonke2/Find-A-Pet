const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

const serviceProviderSchema = new mongoose.Schema({
    serviceProviderName: {
        type: String,
        required: true
    },
    serviceProviderPassword: {
        type: String,
        required: true
    },
    orgName: String,
    serviceProviderAddress: String,
    serviceProviderEmail: String,
    serviceProviderPhone: String
})

serviceProviderSchema.pre('save', async function (next) { 
    try {
        if (this.ismodified("serviceProviderPassword")) {
            const hashedPassword = await bcrypt.hash(this.serviceProviderPassword, saltRounds)
            this.serviceProviderPassword = hashedPassword
        }
        next()
    } catch (err) {
    }
})

serviceProviderSchema.methods.validatePassword = async function (password) {
    try {
        const result = bcrypt.compare(password, this.serviceProviderPassword)
        return result
    } catch (err) {
        throw new Error(err)
    }
}
serviceProviderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema)

module.exports = ServiceProvider