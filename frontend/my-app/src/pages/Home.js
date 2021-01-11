import React, {Component} from 'react';
import './../styles/home-styles.css';
import Header from './../components/home/Header';
import IndividualRecipe from './../components/recipes/IndividualRecipe';
import axios from 'axios'
class Home extends Component{
    state = {

    }

    componentDidMount(){
        console.log("HOME MOUNTED");
        
    }
    render(){
        return (
            <div className = "home-container">
                {/* the showcase */}
                <Header />
                <IndividualRecipe imgPath = {`uploads/cat.jpg:1610402910451`}  name = {`Vegetarian Sheppherds Pie`} desc = {`These vegetarian burgers are delicious! Your carnivorous friends will be impressed. 
		My favorite way to serve is on a whole-wheat bun with garlic-lemon mayonnaise, fresh raw spinach, 
		sliced tomato, and caramelized onions! Click here for full recipe`}/>
            </div>
        );
    }
}

export default Home;