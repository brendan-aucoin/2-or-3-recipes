import React, {Component} from 'react';
import AddRecipe from './pages/AddRecipe';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';

import {BrowserRouter,Route} from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar/Navbar';
class App extends Component{
  state ={
    image:null
  }


  render(){
    // we will return the menu bar, and the routes to all our other pages, using react router, and the Routes
    return (
      <BrowserRouter>
        <div className = "App">
          <Navbar />
          {/* the routes */}
          <Route exact path = '/' component = {Home} />
          {/* <Route path = '/all-recipes'  component = {AllRecipes}/> */}
          <Route path = '/all-recipes/:recipeID' component = {RecipePage} />
          <Route path = '/make-recipe' component = {AddRecipe} />
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
