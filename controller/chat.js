require('dotenv').config();
const Chat = require('../models/chat');


exports.createChat = (req, res, next) => {
    const chat = new Chat({
        users: req.body.users
    });
    chat
        .save()
        .then(chat => res.status(201).json({
            store: chat._id,
            msg: 'Chat created!'
        }))
        .catch(error => res.status(400).json({ error }));
}


exports.getAllChats = (req, res, next) => {
    Chat
        .find(id ? { _id: req.params.id } : {})
        .then(chats => res.status(200).json({
            store: id ? chats[0] : chats,
            msg: 'Chats found!'
        }))
        .catch(error => res.status(400).json({ error }));
}


exports.deleteChat = (req, res, next) => {
    Chat
        .deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ msg: 'Chat deleted!' }))
        .catch(error => res.status(400).json({ error }));
}
