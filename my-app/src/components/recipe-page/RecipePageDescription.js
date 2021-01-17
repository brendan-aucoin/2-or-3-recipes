import React from 'react';

const RecipePageDescription = ({recipe})=>{
    return (
        <div className = "recipe-page-description">
            <p>{recipe.description}</p>
        </div>
    );
}

export default RecipePageDescription;