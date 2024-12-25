const express = require('express');
const router = express.Router();


const sms = require('../controller/message')


router.post('/', sms.createMessage)
router.get('/:id', sms.getMessage)
router.get('/chat/:id', sms.getMessages)
router.put('/:id', sms.updateMessage)
router.delete('/:id', sms.deleteMessages)

module.exports = router;
