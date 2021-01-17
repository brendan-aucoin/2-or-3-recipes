import React from 'react';
import {Link} from 'react-router-dom';

const CallToAction = ()=>{
    return (
        <div className = "home-action-buttons-container">
            <Link to = '/all-recipes'><button className= "home-action-button">Check Out Our Recipes</button></Link>
            <Link to = '/make-recipe'> <button className= "home-action-button">Upload Your Recipe</button></Link>
        </div>
    );
}

export default CallToAction;