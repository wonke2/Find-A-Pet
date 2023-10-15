const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })
const mongoose = require("mongoose")
const serviceProvider = require("../models/serviceProviderSchema")
const fs = require("fs")

const rawData = fs.readFileSync("./initData.json")
const data = JSON.parse(rawData)

data.serviceProviders.map((sp) => {
    const newServiceProvider = new serviceProvider({
        serviceProviderName: sp.serviceProviderName,
        serviceProviderPassword: sp.serviceProviderPassword,
        orgName: sp.orgName,
        serviceProviderAddress: sp.serviceProviderAddress,
        serviceProviderEmail: sp.serviceProviderEmail,
        serviceProviderPhone: sp.serviceProviderPhone,
        servicesProvided: sp.servicesProvided
    })
    newServiceProvider.save()
        .then(() => {
            console.log("Service Provider Saved")
        })
        .catch((err) => {
            console.log(err)
        })
})