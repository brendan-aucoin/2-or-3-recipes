const mongoose = require('mongoose');

// this is all the fields that we need for our document. 
const recipe = new mongoose.Schema({
    recipeName: String,
    author:String,
    picture:String,
    securePicture:String,
    ingredients:Array,
    prepTime:Number,
    cookTime:Number,
    servings:Number,
    calories:Number,
    tags:Array,
    instructions:Array,
    date:Date,
    description:String
});

// model the Recipes by using mongoose
module.exports = RecipeModel = mongoose.model('recipes',recipe);
