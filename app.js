const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const smsRts = require('./routes/message')
const chatRts = require('./routes/chat')


// connexion a la base de donnees
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.error('Connexion à MongoDB échouée !'));


const app = express();

// cors 
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())

// endpoint root

app.use('/sms', smsRts)
app.use('/chat', chatRts)

module.exports = app;
