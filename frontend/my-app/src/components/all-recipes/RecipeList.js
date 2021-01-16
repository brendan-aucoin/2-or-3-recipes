import React, { Component } from 'react';
import IndividualRecipe from './../recipes/IndividualRecipe';
class RecipeList extends Component {
    state = {
    }

    render() {
        return ( this.props.all_recipes.length !==0 ? (
            <div className="list-flex-container">
                {
                    this.props.filter_recipes.map((recipe, index) => {
                        return (
                            <div key = {index}>
                                <IndividualRecipe id = {recipe._id} imgPath = {recipe.picture} name = {recipe.recipeName} 
                                desc = {recipe.description} author = {recipe.author} calories = {recipe.calories}/>
                            </div>
                        )
                    })
                }
             </div>)

             :
             (<div><h1>Recipes Loading.....</h1></div>)
        )
    }
}

export default RecipeList;