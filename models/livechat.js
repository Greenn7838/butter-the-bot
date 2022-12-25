const mongoose = require('mongoose');
let schema = new mongoose.Schema({
    guildId: { type: String, required: true },
    channelId: { type: String, required: true }
});

module.exports = mongoose.model('livechat', schema);