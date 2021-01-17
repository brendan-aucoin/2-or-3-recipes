import React from 'react';

const displayIngredients = (recipe)=>{
    return recipe.ingredients.map((ingredient,index)=>{
        return (
            <div key = {index}>
                <li>
                    <span className =  "recipe-page-ingredient-list-element">{ingredient.ingredient}: </span>
                    <span>{ingredient.portion}</span>
                </li>
            </div>
        );
    })
}
const RecipePageIngredients = ({recipe})=>{
    return (
        <div className = "recipe-page-ingredients">
            <h1 className = "recipe-page-ingredients-title">Ingredients</h1>
            {/* this where you will map all ingredients from the array */}
            <ul className = "recipe-ingredients-list">
                {displayIngredients(recipe)}
            </ul>
        </div>
    );
}

export default RecipePageIngredients;