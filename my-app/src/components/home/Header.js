import React from 'react';
import CallToAction from './CallToAction'
import background1 from './../../img/background1.jpg';

const Header = ()=>{
    return (
        <div>
            <header className = "home-showcase" style = {{backgroundImage:`url(${background1})`}}>
                <h1 className= "home-showcase-title">2 or 3 Recipes: The Only Recipes on the Internet</h1>
                <p className = "home-showcase-company-text">A web app developed by Brendan Aucoin and Sasha White.  You can upload your own recipes, and view all recipes uploaded on our site.</p>
                <CallToAction />
            </header>
        </div>
    );

}

export default Header;