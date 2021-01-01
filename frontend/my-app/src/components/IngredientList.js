import React, {Component} from 'react';
import { faMinus,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from 'uuid';
class IngredientList extends Component{
    state = {
        ingredients:[
            {id: 1, ingredient: "", portion: ""},
            {id:2, ingredient: "", portion: ""},
            {id:3, ingredient: "", portion: ""}
        ]

    }

    componentDidMount = ()=>{
        
    }
    // this takes in which index you are changing, the event and the field of the object you want to change (ie portion, ingredient)
    handleChange = (index,e,field)=>{
        const newIngredients = [...this.state.ingredients];
        newIngredients[index][field] = e.target.value;
        this.setState({ingredients:newIngredients})
    }

    handleDeleteIngredient = (id,e)=>{
        if(this.state.ingredients.length <= 1){return;}
        const newIngredients = [...this.state.ingredients].filter(ingredient=>ingredient.id!==id);
        this.setState({ingredients:newIngredients})
    }

    handleAddIngredient = ()=>{
        if(this.state.ingredients.length > 40){return}
        const newElem = { id: uuidv4(),portion:"",ingredient:""}
        const newIngredients = [...this.state.ingredients, newElem];
        this.setState({ingredients:newIngredients})
    }
    displayIngredientList = () =>{
        return this.state.ingredients.map((ingredient,index)=>{
            return (
                <div className="ingredient-container" key = {`ingredient-${ingredient.id}`}>
                    <button onClick = {(e) => this.handleDeleteIngredient(ingredient.id,e)}className = "delete-ingredient-button"><FontAwesomeIcon icon={faMinus} /></button>
                    <input type = "text" placeholder = "portion" onChange = {(e) => this.handleChange(index,e,"portion")}  className = "portion-field"/>
                    <input type = "text" placeholder = "ingredient" onChange = {(e) => this.handleChange(index,e,"ingredient")}  className = "ingredientField" />
                </div>
            );
        });
    }

    render(){
        return (
            <div className = "ingredient-list">
                {this.displayIngredientList()}
                {/* the add button */}
                <div className="add-ingredient-button-container">
                    <button onClick = {this.handleAddIngredient}className = "add-ingredient-button"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
            </div>
        );
    }
}

export default IngredientList;