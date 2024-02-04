const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    img1Cover: {
        type: String,
    },
    img2Cover: {
        type: String,
    },
    img3Cover: {
        type: String,
    },
    img4Cover: {
        type: String,
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    ticket: {
        type: Number,
        required: true
    },
    dressCode: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    upi: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true,
})

const TicketModel = mongoose.model('Ticket', TicketSchema)

module.exports = TicketModel