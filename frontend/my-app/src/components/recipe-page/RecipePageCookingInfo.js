import React from 'react';

const RecipePageCookingInfo = ({recipe})=>{
    return (recipe.cookTime || recipe.servings || recipe.prepTime || recipe.calories) ? (
        <div className = "recipe-page-cooking-info-container">
            <h1 className = "recipe-page-cooking-info-title">Cooking Info</h1>
            {displayCookingInfo(recipe)}
        </div>
    ) :
    (<div></div>);
}

const displayCookingInfo = (recipe)=>{
    return (
        <div className = "recipe-cooking-info">
                {recipe.calories ? (
                    <div>
                        <span className = "recipe-cooking-info-category">Calories:</span>
                        <span>{recipe.calories}</span>
                    </div>
                ) :
                (<div ></div>)}
                
                {recipe.cookTime ? (
                    <div >
                        <span className = "recipe-cooking-info-category">Cook Time:</span>
                        <span>{recipe.cookTime} Minutes</span>
                    </div>
                ) :
                (<div></div>)}
                
                {recipe.prepTime ? (
                    <div>
                        <span className = "recipe-cooking-info-category">Prep Time:</span>
                        <span>{recipe.prepTime} Minutes</span>
                    </div>
                ) : (<div></div>)}
                
                {recipe.servings ? (
                    <div>
                        <span className = "recipe-cooking-info-category">Servings:</span>
                        <span>{recipe.servings}</span>
                    </div>
                ) : (<div></div>)}     
            </div>
    );
}

export default RecipePageCookingInfo;