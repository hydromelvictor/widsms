const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const messageSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Chat'
    },
    content: { 
        type: String, 
        required: false
    },
    file: {
        type: String, 
        required: false
    }
}, { timestamps: true });

messageSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Message', messageSchema);
