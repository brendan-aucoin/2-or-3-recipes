import React, {Component} from 'react';
import './../styles/individual-recipe-page-styles.css';
import {tags} from './../tags.js'
import RecipeHeading from './../components/recipe-page/RecipeHeading';
import RecipePageTags from './../components/recipe-page/RecipePageTags';
import RecipePageDescription from './../components/recipe-page/RecipePageDescription';
import RecipePageIngredients from './../components/recipe-page/RecipePageIngredients';
import RecipePageInstructions from './../components/recipe-page/RecipePageInstructions';
import RecipePageCookingInfo from './../components/recipe-page/RecipePageCookingInfo';

import axios from 'axios';

class RecipePage extends Component{
    state ={
        recipe:null,
        recipeDate:null,
        tags:[]
    }
    /*
        get the recipe defined by the route parameter (using a get request)

        set the state of the recipe, the date, and the tags
    */
    componentDidMount() {
        window.scrollTo(0, 0);
        let id = this.props.match.params.recipeID;
        axios.get(`/get-recipe/${id}`).then(res=>{
            const recipe = res.data.recipe;
            const recipeTags = tags.filter(tag=>recipe.tags.indexOf(tag.name) !==-1 )
            this.setState({
                recipe:recipe,
                recipeDate:new Date(recipe.date),
                tags:recipeTags
            });
        });
    }


    render(){
        const {recipe,recipeDate,tags} = this.state;
        return !this.state.recipe ? (<div><h1>Recipe Loading......</h1>  </div>) :(
            <div style = {{backgroundColor:"#f0f0f0"}}>
                <div className = "recipe-page-container">

                    <RecipeHeading recipe = {recipe} recipeDate = {recipeDate}/>

                    <RecipePageDescription recipe = {recipe} />

                    <RecipePageIngredients recipe = {recipe} />

                    <RecipePageCookingInfo recipe = {recipe} />
                    <RecipePageTags tags = {tags}/>
                    
                    <RecipePageInstructions recipe = {recipe}/>
                    <br />
                    <br />
                    <br />
                </div>
                
            </div>
        );
    }
}


export default RecipePage;