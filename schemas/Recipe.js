const mongoose = require('mongoose');

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

module.exports = RecipeModel = mongoose.model('recipes',recipe);