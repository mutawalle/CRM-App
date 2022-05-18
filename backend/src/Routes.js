const express = require('express')
const app = express()
const Controllers = require('./Controllers')

// user
app.post('/register', Controllers.validasiUser[0], Controllers.validasiUser[1], Controllers.buatUser)
app.get('/login', Controllers.loginUser)
app.post('/upload-photo-profile', Controllers.uploadPhotoProfile, Controllers.buatPhotoProfile)

// ticket
app.post('/create-ticket', Controllers.createTicket)
app.get('/get-ticket', Controllers.getTicket)
app.post('/update-ticket', Controllers.updateTicket)

// pesan
app.post('/create-pesan', Controllers.createPesan)
app.get('/get-pesan', Controllers.getPesan)

module.exports = app
