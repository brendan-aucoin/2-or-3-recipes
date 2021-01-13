import React from 'react';

const displayInstructions = (recipe)=>{
    return recipe.instructions.map((instruction,index)=>{
        return instruction.content ? (
            <div key = {index} className = "recipe-instruction">
                <span className = "recipe-instruction-step-number">Step {index+1}: </span>
                <div className = "recipe-instruction-text-box">
                <p>{instruction.content}</p>
                </div>
            </div>
        ) : <div key = {index}></div>;
    })
}
const RecipePageInstructions = ({recipe})=>{
    return (
        <div style = {{marginTop:"2rem"}}>
            <h1>Instructions</h1>
            <div className = "recipe-page-instructions">
                {displayInstructions(recipe)}   
            </div>
        </div>
    );
}

export default RecipePageInstructions;