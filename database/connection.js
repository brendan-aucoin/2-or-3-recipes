const mongoose = require('mongoose');

const URI = 'mongodb+srv://Brendan:test@recipedatabase.bkefh.mongodb.net/RecipeDatabase?retryWrites=true&w=majority'

const connectMongoose = async ()=>{
   await mongoose.connect(process.env.MONGODB_URI || URI,{ useNewUrlParser: true,useUnifiedTopology: true });
}

module.exports = connectMongoose;