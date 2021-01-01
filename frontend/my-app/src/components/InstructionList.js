import React, {Component} from 'react';
import { faMinus,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from 'uuid';

class InstructionList extends Component{
    state ={
        instructions:[
            {id: 1, content:""},
            {id:2, content:""}
        ]
    }

    handleChange = (index,e)=>{
        const newInstructions = [...this.state.instructions];
        newInstructions[index].content = e.target.value;
        this.setState({instructions:newInstructions})
    }

    handleDeleteInstruction = (id,e)=>{
        if(this.state.instructions.length <= 1){return;}
        const newInstructions = [...this.state.instructions].filter(instruction=>instruction.id!==id);
        this.setState({instructions:newInstructions})
    }

    handleAddInstruction = ()=>{
        if(this.state.instructions.length > 40){return}
        const newElem = { id: uuidv4(),content:""}
        const newInstructions = [...this.state.instructions, newElem];
        this.setState({instructions:newInstructions})
    }

    displayInstructions = ()=>{
        return this.state.instructions.map((instruction,index)=>{
            return (
                <div className="instruction-container" key = {`instruction-${instruction.id}`}>
                    <textarea onChange = {(e)=>this.handleChange(index,e)}placeholder = {`step ${index+1}: `}className = "instruction-area"></textarea>
                    <button onClick = {(e) => this.handleDeleteInstruction(instruction.id,e)}className = "delete-instruction-button"><FontAwesomeIcon icon={faMinus} /></button>
                </div>
            );
        });
    }

    
    render(){
        return (
            <div className = "instructions-list">
               {this.displayInstructions()}
                 {/* the add button */}
                 <div className="add-instruction-button-container">
                    <button onClick = {this.handleAddInstruction}className = "add-instruction-button"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
            </div>

        );
    }
}

export default InstructionList;