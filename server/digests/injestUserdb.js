const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })
const mongoose = require("mongoose")
const User = require("../models/userSchema")
const fs = require("fs")

const rawData = fs.readFileSync("./initData.json")
const data = JSON.parse(rawData)

data.users.map((user) => {
    const newUser = new User({
        username: user.username,
        email: user.email,
        phoneNo: user.phoneNo,
        address: user.address,
        password: user.password
    })
    newUser.save()
        .then(() => {
        console.log("User Saved")
        })
        .catch((err) => {
            console.log(err)
        })
})