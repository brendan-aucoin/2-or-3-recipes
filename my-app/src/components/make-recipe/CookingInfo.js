import React from 'react';

const CookingInfo = ({handleChange,stateProps}) =>{
    return (
        <div className="make-recipe-info-container">
            <label htmlFor = "prep-time-field">Prep Time (minutes): </label>
            <input onChange = {(e) => handleChange(e,stateProps.prepTime)} type = "text" className = "make-recipe-time-field" id = "prep-time-field" /><br />
            <label htmlFor = "cook-time-field">Cook Time (minutes): </label>
            <input onChange = {(e) => handleChange(e,stateProps.cookTime)} type = "text" className = "make-recipe-time-field"  id = "cook-time-field" /><br />
            <label htmlFor = "servings-field">Servings (per person): </label>
            <input onChange = {(e) => handleChange(e,stateProps.servings)} type = "text" className = "make-recipe-time-field"  id = "servings-field" /><br />
            <label htmlFor = "calories-field">Calories: </label>
            <input onChange = {(e) => handleChange(e,stateProps.calories)} type = "text" className = "make-recipe-time-field"  id = "calories-field" /><br />
            <label htmlFor = "description-area">Description: </label> 
            <textarea onChange = {(e)=>handleChange(e,stateProps.description)} id = "description-area" className = "make-recipe-description-area"></textarea>
        </div>
    );
}

export default CookingInfo;