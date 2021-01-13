import React from 'react';
import IndividualRecipe from './../recipes/IndividualRecipe';

const RecipeFlexShowcase = ({latestRecipes,title})=>{
    return (
        <div>
            <h1 className = "recipe-flex-showcase-title">{title}</h1>
            <hr />
            <div className = "recipe-flex-showcase">
                {displayLatestRecipes(latestRecipes)}
            </div> 
        </div>
         
    );
}

const displayLatestRecipes = (latestRecipes)=>{
    return latestRecipes.length !== 0 ? (latestRecipes.map((recipe,index)=>{
        return (
            <div className = "home-recipe-showcase-recipe-container" key = {index}>
                <IndividualRecipe author = {recipe.author} id = {recipe._id} imgPath = {recipe.picture} name = {recipe.recipeName} desc = {recipe.description}/>
            </div>
        );
    })) : (
        <div>
            <h1> Latest Recipes Loading ...</h1>
        </div>
    );
}
export default RecipeFlexShowcase;