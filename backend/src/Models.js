const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// modul user
const userSchema = new Schema({
    fullName: String,
    companyName: String,
    email: String,
    serviceGroup: String,
    serviceType: String,
    channels: Array,
    password: String,
    role: String,
    photoProfile: String
})
const user = mongoose.model('user', userSchema)

// modul ticket
const ticketSchema = new Schema({
    subject: String,
    description: String,
    status: String,
    date: String,
    user: String,
    admin: String,
})
const ticket = mongoose.model('ticket', ticketSchema)

// modul pesan
const pesanSchema = new Schema({
    pesan: String,
    date: String,
    sender: String,
    receiver: String,
    room: String,
})
const pesan = mongoose.model('pesan', pesanSchema)


module.exports = {
    user,
    ticket,
    pesan
}