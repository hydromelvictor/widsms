const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const chatSchema = mongoose.Schema({
    users: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }
        }
    ]
});

chatSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Chat', chatSchema);
