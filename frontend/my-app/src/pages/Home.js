import React, {Component} from 'react';
import './../styles/home-styles.css';
import Header from './../components/home/Header';
import RecipeFlexShowcase from './../components/home/RecipeFlexShowcase';
import SearchBar from './../components/all-recipes/SearchBar';
import axios from 'axios'
class Home extends Component{
    state = {
        recipes:[],
        latestRecipes:[],
        testRecipes:[]
    }

    componentDidMount(){
        axios.get('/get-all-recipes').then(res=>{
            const recipes = res.data;
            const numLatest = 6;
           const latestRecipes = this.getLatestRecipes(recipes,numLatest);
            this.setState({
                recipes:recipes,
                latestRecipes:latestRecipes,
            });
            
            // end of promise
        })
    }

    getLatestRecipes = (recipes,numLatest)=>{
        let latestRecipes = [...recipes];
        latestRecipes.sort((a,b)=>{return new Date(b.date) - new Date(a.date);});
        latestRecipes = latestRecipes.slice(0,numLatest);
        return latestRecipes;
    }

    handleSearch = (search)=>{
        // the result you are returning at the end
        let resultSearch = [];
        

        // get a copy of all recipes
        let recipes = [...this.state.recipes];
        
        //go through all recipes and do the serach mapping for each word in the name and the author
        recipes = this.createRecipeSearchMap(recipes);
        console.log(recipes);
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
        this.setState({
            testRecipes:resultSearch
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

    
    render(){
        return (
            <div className = "home-container">
            {/* <SearchBar handleSearch = {this.handleSearch} /> */}
                {/* the showcase */}
                <Header />
                {/* the latest recipes */}
                <RecipeFlexShowcase title = {`Latest Recipes`} latestRecipes = {this.state.latestRecipes}/>
            </div>
        );
    }
}

export default Home;