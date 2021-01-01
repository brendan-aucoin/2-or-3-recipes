import React, {Component} from 'react';
import AddRecipe from './pages/AddRecipe';

class App extends Component{
  state ={

  }

  render(){
    // we will return the menu bar, and the routes to all our other pages, using react router, and the Routes
    return (
      <div className = "App">
        <AddRecipe />

      </div>
    );
  }
}

export default App;
