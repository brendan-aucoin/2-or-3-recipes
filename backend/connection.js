const mongoose = require('mongoose');

const URI = 'mongodb+srv://Brendan:test@recipedatabase.bkefh.mongodb.net/RecipeDatabase?retryWrites=true&w=majority'

const connectMongoose = async ()=>{
   await mongoose.connect(URI,{ useNewUrlParser: true,useUnifiedTopology: true });
}

module.exports = connectMongoose;