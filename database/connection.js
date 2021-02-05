const mongoose = require('mongoose');

// this would want to be encrypted or not shown because this has my password in it (even though the password is test)
const URL = 'mongodb+srv://Brendan:test@recipedatabase.bkefh.mongodb.net/RecipeDatabase?retryWrites=true&w=majority'

// this will connect our application to mongodb
const connectMongoose = async ()=>{
   await mongoose.connect(process.env.MONGODB_URI || URL,{ useNewUrlParser: true,useUnifiedTopology: true });
}

module.exports = connectMongoose;