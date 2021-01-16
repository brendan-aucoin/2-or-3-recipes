import axios from 'axios';
import React, { Component } from 'react';
import TitleCard from './../components/all-recipes/TitleCard';
import RecipeList from './../components/all-recipes/RecipeList';
import {tags} from './../tags';
import './../styles/all-recipes-styles.css';

class AllRecipes extends Component {
    state = {
        calories: "-",
        prep: "-",
        servings: "-",
        search: "",
        all_recipes: [],
        filter_recipes: [],
        filter_tags: []
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        axios.get('/get-all-recipes').then(res=>{
            this.setState ({
                all_recipes: res.data,
                filter_recipes: res.data
            })
        });  
    }
    handleSearchChange = (e)=>{
        this.setState({
            search:e.target.value
        })
    }

    //SEARCH BAR
    handleSearch = (search)=>{
        if (search.trim() === "") {
            this.setState({
                filter_recipes: this.state.all_recipes,
                filter_tags: [],
                search : ""
            });
            for (let i = 0; i < tags.length; i++)
            {
                tags[i].checked = false
            }
            return;
        }
        // the result you are returning at the end
        let resultSearch = [];

        // get a copy of all recipes
        let recipes = [...this.state.all_recipes];

        //go through all recipes and do the serach mapping for each word in the name and the author
        recipes = this.createRecipeSearchMap(recipes);
        // split the query into seperate words
        let searchWords = search.split(' ');

        const removableWords = ['and','is','the','but','i','in',' ',''];

        // convert every word to lowercase and have no special characters, and without an s at the end of the word (becuase of plural)
        searchWords = searchWords.map(word=>this.createSearchMapping(word)).filter(word=>removableWords.indexOf(word) ===-1);
        
        
        recipes.forEach((recipe,index)=>{
            let recipeValue = 0;
            // go through every single word in the serachWords
            searchWords.forEach(searchWord =>{
                // the checks if the name of the recipe or the author is an exact match
                if(recipe.recipeName === searchWords.join(' ') || recipe.author === searchWords.join(' ')){recipeValue += 100;}

                // if certain words match the name, author, or tags (these are less important so you give a smaller value)
                if(recipe.recipeName.includes(searchWord)){recipeValue+=10;}
                if(recipe.author.includes(searchWord)){recipeValue+=10;}
                if(recipe.tags.includes(searchWord)){recipeValue+=5;}
            });
            // end of inner loop

            if(recipeValue){
                resultSearch.push({
                    ...recipe,
                    value:recipeValue
                });
            }
        });

        resultSearch = resultSearch.sort((a,b)=>{
            return b.value - a.value;
        });
        let resultSearch2 = [];
        if(this.state.filter_tags.length !== 0){
            for(let i =0; i < resultSearch.length; i++){
                let containTags = true;
                for(let j = 0; j < this.state.filter_tags.length;j++){
                    if(!resultSearch[i].tags.includes(this.state.filter_tags[j])){
                        containTags = false;
                    }
                }
                if(containTags){
                    resultSearch2.push(resultSearch[i]);
                }   
            }
        }
        else{
            resultSearch2 = resultSearch;
        }

        this.setState({
            filter_recipes:resultSearch2,
            search:search
        });

       
    }


    createRecipeSearchMap = (recipes)=>{
        // a function that takes a property of a recipe and does the search mapping for that property and returns a new object with that updated
        const recipeSearchMapping = (recipe,property)=>{
            let propertyList = recipe[property].split(' ');
            propertyList = propertyList.map(word=>this.createSearchMapping(word));
            return {
                ...recipe,
                [property]:propertyList.join(' ')
            }
        }
        const serachMappedProperties = ['recipeName','author'];

        recipes = recipes.map(recipe=>{
            // change recipeName to the serach mapped version
            let newRecipe = {...recipe};
            serachMappedProperties.forEach(property=>{
                newRecipe = recipeSearchMapping(newRecipe,property);  
            })
            return newRecipe;
        });

        return recipes;
    }
    createSearchMapping = word=>this.removeLingeringS(this.removeSpecialChars(word.toLowerCase()))

    removeSpecialChars = (str)=>str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    removeLingeringS = (str)=>str && (str[str.length-1] ==='s' || str[str.length-1] ==='S') ? str.slice(0,-1) : str;
    //END OF SEARCH BAR STUFF


    //Filters the recipes by their various tags
    filterByTags = (color, tag, index) => {
        let tags = [...this.state.filter_tags]
        // console.log("When defined: " ,tags)
        if (color === "white") {
            tags.push(tag.name)
            // console.log("If white: " ,tags)
            tag.checked = true
            this.setState ({
                filter_tags: tags
            })
        }
        else if(color ==="green") {     
            tags = tags.filter((element) => {
                return (tag.name !== element)
            })
            // console.log("If green: " ,tags)
            tag.checked = false
            this.setState ({
                filter_tags: tags
            })
        }
        let filter_recipes = [...this.state.all_recipes]
        let new_filter_recipes = []
        for (let i = 0; i < filter_recipes.length; i++) {
            let containsTags = true
            for (let j = 0; j < tags.length; j++) {
                if (filter_recipes[i].tags.includes(tags[j].toLowerCase()))
                {        
                }
                else {
                    containsTags = false
                }
            }
            if (containsTags === true)
            {
                new_filter_recipes.push(filter_recipes[i])
            }    
        } 
        setTimeout(() => {
            if (this.state.search.trim("") !== "") {
                this.handleSearch(this.state.search)
            }    
        }, 100)
    
       this.setState({
           filter_recipes :  new_filter_recipes
        });
        
    }


    sortState = (calories, prep, servings) => {
        this.setState ({
            calories: calories,
            prep: prep,
            servings: servings
        })
        let sortedArray = [...this.state.filter_recipes];
        //CALORIES SORTING
        if (prep === "-" && servings === "-")
        {
            if (calories === "High")
            {
                sortedArray.sort((a, b) => {
                    if (!a.calories){ return (0) }
                    if (!b.calories){ return (0) }
                    else { return (b.calories - a.calories) }         
                })
            }
            else if (calories === "Low")
            {
                sortedArray.sort((a, b) => {
                    if (!a.calories){ return (0) }
                    if (!b.calories){ return (0) }
                    else { return (a.calories - b.calories) }         
                })
            }
            else if (calories === "-")
            {
                sortedArray = this.state.filter_recipes
            }
        }
        //PREP TIME SORTING
        if (calories === "-" && servings === "-")
        {
            if (prep === "High")
            {
                sortedArray.sort((a, b) => {
                    if (!a.prepTime || !a.cookTime){ return (0) }
                    if (!b.prepTime || !b.cookTime){ return (0) }
                    else { return ((b.prepTime+b.cookTime) - (a.prepTime+a.cookTime)) }         
                })
            }
            else if (prep === "Low")
            {
                sortedArray.sort((a, b) => {
                    if (!a.prepTime || !a.cookTime){ return (0) }
                    if (!b.prepTime || !b.cookTime){ return (0) }
                    else { return ((a.prepTime+a.cookTime) - (b.prepTime+b.cookTime)) }         
                })
            }
            else if (prep === "-")
            {
                sortedArray = this.state.filter_recipes
            }
        }
        //SERVINGS SORTING
        if (calories === "-" && prep === "-")
        {
            if (servings === "High")
            {
                sortedArray.sort((a, b) => {
                    if (!a.servings){ return (0) }
                    if (!b.servings){ return (0) }
                    else { return (b.servings - a.servings) }         
                })
            }
            else if (calories === "Low")
            {
                sortedArray.sort((a, b) => {
                    if (!a.servings){ return (0) }
                    if (!b.servings){ return (0) }
                    else { return (a.servings - b.servings) }         
                })
            }
            else if (calories === "-")
            {
                sortedArray = this.state.filter_recipes
            }
        }
        
        this.setState ({
            filter_recipes: sortedArray
        })
        
    }

    resetRecipes = ()=>{
        this.setState({
            filterByTags:[],
            search:"",
            filter_recipes:this.state.all_recipes
        });
        for (let i = 0; i < tags.length; i++){
                tags[i].checked = false
        }
    }

    render() {
        return (
            <div>
                <TitleCard resetRecipes = {this.resetRecipes} handleSearchChange = {this.handleSearchChange} sortState={this.sortState} filterByTags={this.filterByTags} handleSearch = {this.handleSearch} tags = {tags}/>
                <RecipeList filter_recipes = {this.state.filter_recipes} />
            </div>
        );
    }
}

export default AllRecipes;