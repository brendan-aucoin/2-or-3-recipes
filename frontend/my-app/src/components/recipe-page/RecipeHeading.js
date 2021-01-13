import React from 'react';
import ImageUnnavailable from './../../img/image-unnavailable.jpg';
import URL_PREFIX from './../recipes/recipe-url-prefix';

const RecipeHeading = ({recipe,recipeDate})=>{
    return (
        <div style={{marginTop: "2rem"}}>
            <div className = "recipe-page-heading">
                <div className = "recipe-name-container">
                    <h1 className = "recipe-title">{recipe.recipeName}</h1>
                    <img className = "recipe-page-picture" src ={recipe.picture ? `${URL_PREFIX}${recipe.picture}` : ImageUnnavailable} />
                </div>

                <div className = "recipe-author-container">
                    <p>{recipe.author}: </p>
                    <p>{[recipeDate.getFullYear(),recipeDate.getMonth()+1, recipeDate.getDate()].join('-')}</p>
                </div>
                <hr />
            </div>
        </div>
    );
}

export default RecipeHeading;