import React, {Component} from 'react';
import './../styles/add-recipe-styles.css';
import IngredientList from '../components/IngredientList';
import Tags from '../components/Tags';
import InstructionList from '../components/InstructionList';
class AddRecipe extends Component{
    state = {
        selectedFile: null,
        recipeName:"",
        author:"",
        prepTime:"",
        cookTime:"",
        servings:"",
        calories:"",
        tags:[],
        ingredients:[],
        instructions:[],

        // this will be read from the backend
        allTags:["vegan", "vegetarian","baked goods","meat","breakfast","dinner","curry","lunch","easy","sandwich","gluten free","sauce"]
    }

    fileSelectedHandler = e=>{
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

   
    displayFileName = ()=>{
        return this.state.selectedFile === null ? (<span>No File selected yet</span>) :
        (<span>{this.state.selectedFile.name}</span>)
    }
    render(){
        // contains all the components of the add recipe page
        return (
            <div className = "add-recipe">
                <h2>Make a New Recipe</h2>
                <br />
                {/* the first section */}
                <div className = "name-container">
                    <div className="name-recipe-container">
                        .
                        <span>Name of the Recipe: </span>
                        <input type = "text" />
                        <input style = {{display:'none'}} type = "file" onChange = {this.fileSelectedHandler} ref = {fileInput => this.fileInput = fileInput}/>
                        <button onClick = {() => this.fileInput.click()}>Pick File</button>
                        {this.displayFileName()}
                    </div>
                    <div className="author-name-container">
                        <span>Author: </span>
                        <input type = "text" />
                    </div>
                </div>
                

                {/* the ingredient list */}
                <h4>Ingredients</h4>
                <IngredientList />
                {/* the time container */}
                <h4>Cooking Information</h4>
                <div className="info-container">
                    <span>Prep Time (minutes): </span>
                    <input type = "text" className = "time-field" id = "prep-time-field" /><br />
                    <span>Cook Time (minutes): </span>
                    <input type = "text" className = "time-field"  id = "cook-time-field" /><br />
                    <span>Servings (per person): </span>
                    <input type = "text" className = "time-field"  id = "servings-field" /><br />
                    <span>Calories: </span>
                    <input type = "text" className = "time-field"  id = "calories-field" /><br />
                </div>
                <h4>Tags</h4>
                {/* tags */}
                <Tags tags = {this.state.allTags} />

                {/* the instructions */}
                <h4>Instructions</h4>
                <InstructionList />
                {/* the upload button */}
                <div className="upload-container">
                    <button className = "upload-button">Upload</button>
                </div>
            </div>
        );
    }
}

export default AddRecipe;