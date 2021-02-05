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
    /*
        setting the states selected file to what the event has stored as a file (only the first one becuase you can only have 1 picture)
    */
    fileSelectedHandler = e=>{
       if(!e.target || !e.target.files || e.target.files.size === 0){return;}
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    /*
        takes in an event and a property you want to change.  this is for text fields
    */
    handleFieldChange = (e,property)=>{
        this.setState({
            [property]: e.target.value
        })
    }

    /* 
        if you click on a tag (checkbox) you add that tagname to the array
        if you uncheck a tag then you filter the array to not have that element in it
        and then you set the state to the array of tags
    */
    handleTagChange = (e,tagName)=>{
        // if they checked the tag
        const newTags = e.target.checked ? [...this.state.tags,tagName] : this.state.tags.filter(tag => tag !== tagName);
        this.setState({
            tags:newTags
        })
    }

    /*
    this takes in which index you are changing, the event and the field of the object you want to change (ie portion, ingredient)
    */
    handleArrayChange = (index,e,property,field)=>{
        //make a copy of the array that you want based on the property value (ingredients or instructions)
        const newArray = [...(this.state[property])];
        // change the array at the index you specify and what field of that object (portion, ingredient)
        newArray[index][field] = e.target.value;
        // set the state to the new array we made
        this.setState({[property]:newArray})
    }

    /*
        delete one of the elements in the ingredients or instructions array

    */
    handleDeleteArray = (id,e,property)=>{
        // you cannot delete the last ingredient or instructions (every recipe has at least 1 thing in it, and one thing you have to do)
        if(this.state[property].length <= 1){return;}
        // filter the array defined by the states property you pass in, and fitler
        //it so that the element with the id you specify is no longer in the array
        const newArray = [...this.state[property]].filter(field=>field.id!==id);
        this.setState({[property]:newArray})
    }

    /*
        add a new element to the ingredients or instructions array,
        the newElem is an object that you want to add to the end of the current array
    */
    handleAddArray = (property,newElem)=>{
        // you cant have more than 40 ingredients or instructions
        const LIMIT = 40;
        if(this.state[property].length > LIMIT){return}
        // generate a random id
        newElem.id =  uuidv4();

        const newArray = [...this.state[property], newElem];
        this.setState({[property]:newArray})
    }

    /*

    */
    handleSubmit = e=>{
        // don't refresh the page
        e.preventDefault();

        // define what parts of the state you don't want included in the db
        const deleteProperties = ['selectedFile'];
        // define what parts of the state should be numbers when inputted into the db
        const convertToNumberProperties = ['cookTime','prepTime','servings','calories'];

        // create form data and add our state, the picture, and the special properties to it
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
        
        // use axios to make a post request to the backend
        axios.post('/upload-recipe',form,config).then(response=>{
            console.log("IN FRONTEND got response");
            this.goToHome();

        }).catch(error=>{
            console.log(error.response);
            this.goToHome();
        })
        
    }
    
    /*
        scroll the window to the top of the page, and reload the page.
        you would probably want to include some cool effects maybe (or a popup box saying upload successful).  More to be added in the future
    */
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