require("dotenv").config()
const mongoose = require("mongoose")
const serviceProvider = require("../models/serviceProviderSchema")
const fs = require("fs")

const rawData = fs.readFileSync("./initData.json")
const data = JSON.parse(rawData)

data.serviceProvider.map((sp) => {
    const newServiceProvider = new serviceProvider({
        serviceProviderName: sp.serviceProviderName,
        serviceProviderPassword: sp.serviceProviderPassword,
        orgName: sp.orgName,
        serviceProviderAddress: sp.serviceProviderAddress,
        serviceProviderEmail: sp.serviceProviderEmail,
        serviceProviderPhone: sp.serviceProviderPhone
    })
    newServiceProvider.save()
        .then(() => {
            console.log("Service Provider Saved")
        })
        .catch((err) => {
            console.log(err)
        })
})