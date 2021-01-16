import React, {Component} from 'react';
import AddRecipe from './pages/AddRecipe';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';
import AllRecipes from './pages/AllRecipes';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
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
          <Switch>
            <Route exact path = '/' component = {Home} />
            <Route path = '/all-recipes/:recipeID' component = {RecipePage} />
            <Route path = '/all-recipes'  component = {AllRecipes}/>
            <Route path = '/make-recipe' component = {AddRecipe} />
          </Switch>
          
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
