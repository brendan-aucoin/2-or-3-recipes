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

    componentDidMount(){
        console.log("HOME MOUNTED");
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

    render(){
        return (
            <div className = "home-container">
                {/* the showcase */}
                <Header />
                {/* the latest recipes */}
                <RecipeFlexShowcase title = {`Latest Recipes`} latestRecipes = {this.state.latestRecipes}/>
            </div>
        );
    }
}

export default Home;