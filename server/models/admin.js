const mongoose = require('mongoose');
const User=require('../models/user')
const adminSchema=new mongoose.Schema({

})
const Admin=User.discriminator('Admin',adminSchema)

module.exports = mongoose.model('Admin');
