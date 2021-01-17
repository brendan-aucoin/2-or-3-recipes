import React, {Component} from 'react';
import './../styles/add-recipe-styles.css';
import IngredientList from '../components/make-recipe/IngredientList';
import Tags from '../components/make-recipe/Tags';
import InstructionList from '../components/make-recipe/InstructionList';
import NameRecipe from '../components/make-recipe/NameRecipe';
import CookingInfo from '../components/make-recipe/CookingInfo';
import {tags} from './../tags';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
class AddRecipe extends Component{
    state = {
        selectedFile: null,
        recipeName:"",
        author:"",
        prepTime:"",
        cookTime:"",
        servings:"",
        calories:"",
        description:"",
        tags:[],
        ingredients:[
         {id: 1, ingredient: "", portion: ""},
         {id:2, ingredient: "", portion: ""},
         {id:3, ingredient: "", portion: ""}
        ],
        instructions:[
            {id: 1, content:""},
            {id:2, content:""}
        ],
    }
    fileSelectedHandler = e=>{
       if(!e.target || !e.target.files){return;}
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    handleFieldChange = (e,property)=>{
        this.setState({
            [property]: e.target.value
        })
    }


    handleTagChange = (e,tagName)=>{
        // if they checked the tag
        const newTags = e.target.checked ? [...this.state.tags,tagName] : this.state.tags.filter(tag => tag !== tagName);
        this.setState({
            tags:newTags
        })
    }

    //this takes in which index you are changing, the event and the field of the object you want to change (ie portion, ingredient)
    handleArrayChange = (index,e,property,field)=>{
        const newIngredients = [...(this.state[property])];
        newIngredients[index][field] = e.target.value;
        this.setState({[property]:newIngredients})
    }

    handleDeleteArray = (id,e,property)=>{
        if(this.state[property].length <= 1){return;}
        const newIngredients = [...this.state[property]].filter(ingredient=>ingredient.id!==id);
        this.setState({[property]:newIngredients})
    }

    handleAddArray = (property,newElem)=>{
        if(this.state[property].length > 40){return}
        newElem.id =  uuidv4();
        const newIngredients = [...this.state[property], newElem];
        this.setState({[property]:newIngredients})
    }

    handleSubmit = e=>{
        e.preventDefault();
        // check form validation
        const deleteProperties = ['selectedFile'];
        const convertToNumberProperties = ['cookTime','prepTime','servings','calories'];
        const form = new FormData();
        form.append('recipeImage',this.state.selectedFile);
        form.append("content",JSON.stringify(this.state));
        form.append('deleteProperties',JSON.stringify(deleteProperties));
        form.append('convertToNumberProperties',JSON.stringify(convertToNumberProperties));
        
        const config = {
            headers:{
                'content-type':'multipart/form-data'
            }
        };
        
        axios.post('/upload-recipe',form,config).then(response=>{
            console.log(response);
            this.goToHome();

        }).catch(error=>{
            console.log(error.response);
        })
        
    }
    
    goToHome = ()=>{
        window.scrollTo(0,0);
        window.location.reload();
        
    }
    render(){
        return (
            <div className = "make-recipe">
            
                <form onSubmit = {this.handleSubmit}>
                    <h2>Make a New Recipe</h2>
                    <br />
                    {/* the first section */}
                    <NameRecipe handleChange = {this.handleFieldChange} stateProps = {{recipeName:"recipeName",author:"author"}}selectedFile = {this.state.selectedFile} fileSelectedHandler = {this.fileSelectedHandler}/>
               
                    {/* the ingredient list */}
                    <h4>Ingredients</h4>
                    {/* ({ingredients,handleAddIngredient,handleDeleteIngredient,handleChange}) */}
                    <IngredientList ingredients = {this.state.ingredients} handleAddIngredient = {this.handleAddArray} handleDeleteIngredient = {this.handleDeleteArray} handleChange = {this.handleArrayChange}/>
                    {/* the time container */}
                    <h4>Cooking Information</h4>
                    <CookingInfo handleChange = {this.handleFieldChange} stateProps = {{prepTime:"prepTime", cookTime:"cookTime",servings:"servings",calories:"calories",description:"description"}} />
                    <h4>Tags</h4>
                    {/* tags */}
                    <Tags tags = {tags} handleClick = {this.handleTagChange} />

                    {/* the instructions */}
                    <h4>Instructions</h4>
                    {/* {instructions,handleAddInstruction,handleChange,handleDeleteInstruction}) */}
                    <InstructionList instructions = {this.state.instructions} handleAddInstruction = {this.handleAddArray} handleChange = {this.handleArrayChange} handleDeleteInstruction = {this.handleDeleteArray}/>
                    {/* the upload button */}
                    <div className="make-recipe-upload-container">
                        <button type= "submit" className = "make-recipe-upload-button"> Upload </button>
                    </div>
                    
                </form>
            </div>
        );
    }
}

export default AddRecipe;