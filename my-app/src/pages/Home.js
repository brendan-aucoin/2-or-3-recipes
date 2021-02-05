import React, {Component} from 'react';
import './../styles/home-styles.css';
import Header from './../components/home/Header';
import RecipeFlexShowcase from './../components/home/RecipeFlexShowcase';
import axios from 'axios'
class Home extends Component{
    state = {
        recipes:[],
        latestRecipes:[]
    }

    /*

        You get the recipes from the backend, and filter it to get the 6 most recent recipes

        when the Home mounts you want to get the recipes from the db
        you would want to actually handle the fitlering on the backend.  The reason its like this
        is becuase I wanted practice in React.
    */
    componentDidMount(){
        window.scrollTo(0,0);
        axios.get('/get-all-recipes').then(res=>{
            const recipes = res.data;
            const NUM_LATEST = 6;
            const latestRecipes = this.getLatestRecipes(recipes,NUM_LATEST);
            this.setState({
                recipes:recipes,
                latestRecipes:latestRecipes,
            });
            
            // end of promise
        })
    }

    /*
        You sort your recipes by date, then you only include the first 6 (whatever the number you pass in is)
    */
    getLatestRecipes = (recipes,numLatest)=>{
        let latestRecipes = [...recipes];
        latestRecipes.sort((a,b)=>{return new Date(b.date) - new Date(a.date);});
        latestRecipes = latestRecipes.slice(0,numLatest);
        return latestRecipes;
    }

    render(){
        return (
            <div className = "home-container">
                <Header />
                {/* the latest recipes */}
                <RecipeFlexShowcase title = {`Latest Recipes`} latestRecipes = {this.state.latestRecipes}/>
            </div>
        );
    }
}

export default Home;