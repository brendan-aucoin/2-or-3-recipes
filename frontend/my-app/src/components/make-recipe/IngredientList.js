import React from 'react';
import { faMinus,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IngredientList = ({ingredients,handleAddIngredient,handleDeleteIngredient,handleChange})=>{
    return (
        <div className = "ingredient-list">
                {displayIngredientList(ingredients,handleDeleteIngredient,handleChange)}
                {/* the add button */}
                <div className="add-ingredient-button-container">
                    <button type = "button" onClick = {e=>handleAddIngredient("ingredients",{portion:"",ingredient:""})}className = "add-ingredient-button"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
            </div>
    );
}

const displayIngredientList = (ingredients,handleDeleteIngredient,handleChange) =>{
    return ingredients.map((ingredient,index)=>{
        return (
            <div className="ingredient-container" key = {`ingredient-${ingredient.id}`}>
                <button type = "button" onClick = {(e) => handleDeleteIngredient(ingredient.id,e,"ingredients")}className = "delete-ingredient-button"><FontAwesomeIcon icon={faMinus} /></button>
                <input type = "text" placeholder = "portion" onChange = {(e) => handleChange(index,e,"ingredients", "portion")}  className = "portion-field"/>
                <input type = "text" placeholder = "ingredient" onChange = {(e) => handleChange(index,e,"ingredients","ingredient")}  className = "ingredient-field" />
            </div>
        );
    });
}

export default IngredientList;