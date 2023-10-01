const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'static')))

app.get('/api/items', (req, res) => {
})

app.get('/api/items/:id', (req, res) => {
})

app.get('/api/services', (req, res) => {
})

app.get('/api/services/:id', (req, res) => {
})

app.get('/api/users/:id', (req, res) => {
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})