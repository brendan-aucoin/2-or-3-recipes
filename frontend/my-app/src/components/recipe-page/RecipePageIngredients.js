import React from 'react';

const displayIngredients = (recipe)=>{
    return recipe.ingredients.map((ingredient,index)=>{
        return (
            <div key = {index}>
                <span>{ingredient.ingredient}: </span>
                <span>{ingredient.portion}</span>
            </div>
        );
    })
}
const RecipePageIngredients = ({recipe})=>{
    return (
        <div className = "recipe-page-ingredients">
            <h1 className = "recipe-page-ingredients-title">Ingredients</h1>
            {/* this where you will map all ingredients from the array */}
            <div className = "recipe-ingredients-list">
                {displayIngredients(recipe)}
            </div>
        </div>
    );
}

export default RecipePageIngredients;