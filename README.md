const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.log(err));

// Route de base
app.get('/', (req, res) => {
  res.send('Serveur de chat en cours d\'exécution...');
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});



const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  chatId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);






io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté', socket.id);

  // Rejoindre un chat (privé ou de groupe)
  socket.on('joinChat', (chatId) => {
    socket.join(chatId);
    console.log(`Utilisateur rejoint le chat : ${chatId}`);
  });

  // Envoi de message
  socket.on('sendMessage', async ({ chatId, senderId, content }) => {
    const message = new (require('./models/Message'))({ sender: senderId, content, chatId });
    await message.save();
    io.to(chatId).emit('receiveMessage', message);
  });

  // Déconnexion
  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});





<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chat App</title>
  <script src="https://cdn.socket.io/4.0.1/socket.io.min.js"></script>
</head>
<body>
  <h1>Chat App</h1>
  <input type="text" id="chatId" placeholder="Chat ID">
  <input type="text" id="message" placeholder="Message">
  <button onclick="sendMessage()">Envoyer</button>

  <ul id="messages"></ul>

  <script>
    const socket = io('http://localhost:5000');

    function sendMessage() {
      const chatId = document.getElementById('chatId').value;
      const message = document.getElementById('message').value;
      socket.emit('joinChat', chatId);
      socket.emit('sendMessage', { chatId, senderId: '123', content: message });
    }

    socket.on('receiveMessage', (msg) => {
      const li = document.createElement('li');
      li.textContent = `${msg.content} (de ${msg.sender})`;
      document.getElementById('messages').appendChild(li);
    });
  </script>
</body>
</html>
