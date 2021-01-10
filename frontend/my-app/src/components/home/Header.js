import React from 'react';

import background1 from './../../img/background1.jpg';
import {Link} from 'react-router-dom'
const Header = ()=>{
    return (
        <div>
            <header className = "showcase"style = {{backgroundImage:`url(${background1})`}}>
                <h1 className= "title">2 or 3 Recipes: The Only Recipes on the Internet</h1>
                <p className = "company-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam delectus quam aliquam expedita dolorem dicta nam fuga culpa porro nemo quas officia id quia saepe impedit adipisci repellendus, enim, vitae et obcaecati. Soluta, dolorem quaerat nesciunt sequi aliquam quas vel?</p>
                <div className = "action-buttons-container">
                <Link to = '/all-recipes'><button className= "action-button">Check Out Our Recipes</button></Link>
                <Link to = '/make-recipe'> <button className= "action-button">Upload Your Recipe</button></Link>
                </div>
            </header>
        </div>
    );

}

export default Header;