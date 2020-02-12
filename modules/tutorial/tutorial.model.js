const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id : { type : Number },
    title : { type : String },
    videoLink : { type : String },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Haji', schema);