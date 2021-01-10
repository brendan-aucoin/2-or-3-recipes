const mongoose = require('mongoose');

const recipe = new mongoose.Schema({
    name: String,
    author:String,
    picture:String,
    ingredients:Array,
    prepTime:String,
    cookTime:String,
    servings:String,
    calories:String,
    tags:Array,
    instructions:Array
});

module.exports = RecipeModel = mongoose.model('recipes',recipe);