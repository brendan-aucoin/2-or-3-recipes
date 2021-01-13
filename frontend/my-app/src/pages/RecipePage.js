import React, {Component} from 'react';
import corgi from './../img/corgi.jpg';
import './../styles/individual-recipe-page-styles.css';
import tags from './../tags.js'
import RecipeHeading from './../components/recipe-page/RecipeHeading';
import RecipePageTags from './../components/recipe-page/RecipePageTags';
import RecipePageDescription from './../components/recipe-page/RecipePageDescription';
import RecipePageIngredients from './../components/recipe-page/RecipePageIngredients';
import RecipePageInstructions from './../components/recipe-page/RecipePageInstructions';
import axios from 'axios';

class RecipePage extends Component{
    state ={
        recipe:null,
        recipeDate:null,
        tags:[]
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        let id = this.props.match.params.recipeID;
        let response = axios.get(`/get-recipe/${id}`).then(res=>{
            const recipe = res.data.recipe;
            const recipeTags = tags.filter(tag=>recipe.tags.indexOf(tag.name) !==-1 )
            this.setState({
                recipe:recipe,
                recipeDate:new Date(recipe.date),
                tags:recipeTags
            });
        })
    }

    render(){
        const {recipe,recipeDate,tags} = this.state;
        return !this.state.recipe ? (<div><h1>Recipe Loading......</h1>  </div>) :(
            <div style = {{backgroundColor:"#f0f0f0"}}>
                <div className = "recipe-page-container">
                    <RecipeHeading recipe = {recipe} recipeDate = {recipeDate}/>

                    <RecipePageDescription recipe = {recipe} />

                    <RecipePageIngredients recipe = {recipe} />

                    <RecipePageTags tags = {tags}/>
                    
                    <RecipePageInstructions recipe = {recipe}/>
                    <br />
                    <br />
                    <br />

                    
                </div>
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

/* 
 <div>
                    <div className = "recipe-title-container">
                        <h1 className = "recipe-title-container">Veggie Borgars</h1>
                        <img className = "recipe-page-picture" src ={corgi} />
                    </div>
                    <div className = "recipe-author-container">
                        <p>Brendan</p>
                        <p>2000/12/12</p>
                    </div>
                </div>
*/

export default RecipePage;