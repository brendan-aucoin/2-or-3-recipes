import React,{Component} from 'react';

class NewRecipe extends Component{
    state ={

    }
    displayFileName = ()=>{
        return this.props.selectedFile === null ? (<span>No File selected yet</span>) :
        (<span>{this.props.selectedFile.name}</span>)
    }
    render(){
        const {stateProps,handleChange} = this.props;
        return (
            <div className = "name-container">
                        <div className="name-recipe-container">
                            <label className = "text-field-label" htmlFor = "recipe-name-field">Name of the Recipe: </label>
                            <input onChange = {e=>handleChange(e,stateProps.recipeName)}id = "recipe-name-field" type = "text" />
                        </div>
                        <div className = "add-picture-container">
                            <label htmlFor="choose-picture-field">Add Picture of Recipe: </label>
                            <input id = "choose-picture-field" style = {{display:'none'}} type = "file" onChange = {this.props.fileSelectedHandler} ref = {fileInput => this.fileInput = fileInput}/>
                            <button type = "button" className = "pick-file-button" onClick = {() => this.fileInput.click()}>Pick File</button>
                            <span>({this.displayFileName()})</span>
                        </div>
                        <div className="author-name-container">
                            <label className = "text-field-label" htmlFor = "author-field">Author: </label>
                            <input onChange = {e=>handleChange(e,stateProps.author)} id = "author-field" type = "text" />
                        </div>
                    </div>
        );
    }
}



export default NewRecipe