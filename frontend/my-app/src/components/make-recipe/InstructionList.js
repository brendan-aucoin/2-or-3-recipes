import React from 'react';
import { faMinus,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InstructionList = ({instructions,handleAddInstruction,handleChange,handleDeleteInstruction})=>{
    return (
        <div className = "instructions-list">
            {displayInstructions(instructions,handleChange,handleDeleteInstruction)}
            {/* the add button */}
            <div className="add-instruction-button-container">
                <button onClick = {e=>handleAddInstruction("instructions",{content:""})}className = "add-instruction-button"><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </div>
    );
}

const displayInstructions = (instructions,handleChange,handleDeleteInstruction)=>{
    return instructions.map((instruction,index)=>{
        return (
            <div className="instruction-container" key = {`instruction-${instruction.id}`}>
                <textarea onChange = {(e)=>handleChange(index,e,"instructions","content")}placeholder = {`step ${index+1}: `}className = "instruction-area"></textarea>
                <button onClick = {(e) => handleDeleteInstruction(instruction.id,e,"instructions")}className = "delete-instruction-button"><FontAwesomeIcon icon={faMinus} /></button>
            </div>
        );
    });
}


export default InstructionList;