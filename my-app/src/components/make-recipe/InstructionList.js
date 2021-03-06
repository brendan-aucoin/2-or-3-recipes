import React from 'react';
import { faMinus,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InstructionList = ({instructions,handleAddInstruction,handleChange,handleDeleteInstruction})=>{
    return (
        <div className = "make-recipe-instructions-list">
            {displayInstructions(instructions,handleChange,handleDeleteInstruction)}
            {/* the add button */}
            <div className="add-instruction-button-container">
                <button type = "button" onClick = {e=>handleAddInstruction("instructions",{content:""})}className = "add-instruction-button"><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </div>
    );
}

const displayInstructions = (instructions,handleChange,handleDeleteInstruction)=>{
    return instructions.map((instruction,index)=>{
        return (
            <div className="make-recipe-instruction-container" key = {`instruction-${instruction.id}`}>
                <textarea onChange = {(e)=>handleChange(index,e,"instructions","content")}placeholder = {`step ${index+1}: `}className = "make-recipe-instruction-area"></textarea>
                <button type = "button" onClick = {(e) => handleDeleteInstruction(instruction.id,e,"instructions")}className = "delete-instruction-button"><FontAwesomeIcon icon={faMinus} /></button>
            </div>
        );
    });
}


export default InstructionList;