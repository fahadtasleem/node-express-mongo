var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: Number,
    name: String,
    email: String,
});

var User = mongoose.model("User",UserSchema);

module.exports = User;