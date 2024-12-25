require('dotenv').config();
const Message = require('../models/message');


exports.createMessage = (req, res, next) => {
    const { userId, chatId, content, file } = req.body

    if (!userId || !chatId || (!content && !file )) {
        return res.status(400).json({
            error: 'data invalid !!!'
        })
    }

    const sms = new Message({
        userId: userId,
        chatId: chatId,
        content: content,
        file: file
    })

    sms
        .save()
        .then(sms => res.status(201).json({
            store: sms,
            msg: 'message created'
        }))
        .catch(error => res.status(400).json({ error }));
}


exports.getMessage = (req, res, next) => {
    Message
        .findOne({ _id: req.params.id })
        .then(message => res.status(200).json({
            store: message,
            msg: 'Message found!'
        }))
        .catch(error => res.status(400).json({ error }));
}


exports.getMessages = (req, res, next) => {
    Message
        .find({ chatId: req.params.id })
        .then(messages => res.status(200).json({
            store: messages,
            msg: 'Messages found!'
        }))
        .catch(error => res.status(400).json({ error }));
}


exports.updateMessage = (req, res, next) => {
    Message
        .updateOne(
            { _id: req.params.id },
            { ...req.body, _id: req.params.id }
        )
        .then( msg => res.status(200).json({ 
            store: msg,
            msg: 'Message updated!'    
        }))
        .catch(error => res.status(400).json({ error }));
}


exports.deleteMessage = (req, res, next) => {
    Message
        .deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ msg: 'Message deleted!' }))
        .catch(error => res.status(400).json({ error }));
}


exports.deleteMessages = (req, res, next) => {
    Message
        .deleteMany({ chatId: req.params.id })
        .then(() => res.status(200).json({ msg: 'Messages deleted!' }))
        .catch(error => res.status(400).json({ error }));
}
