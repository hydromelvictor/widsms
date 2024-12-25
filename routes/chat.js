const express = require('express');
const router = express.Router();


const chat = require('../controller/chat')


router.post('/', chat.createChat)
router.get('/:id?', chat.getAllChats)
router.delete('/:id', chat.deleteChat)

module.exports = router;
