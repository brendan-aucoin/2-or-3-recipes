import React from 'react';
import CallToAction from './CallToAction'
import background1 from './../../img/background1.jpg';

const Header = ()=>{
    return (
        <div>
            <header className = "home-showcase" style = {{backgroundImage:`url(${background1})`}}>
                <h1 className= "home-showcase-title">2 or 3 Recipes: The Only Recipes on the Internet</h1>
                <p className = "home-showcase-company-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam delectus quam aliquam expedita dolorem dicta nam fuga culpa porro nemo quas officia id quia saepe impedit adipisci repellendus, enim, vitae et obcaecati. Soluta, dolorem quaerat nesciunt sequi aliquam quas vel?</p>
                <CallToAction />
            </header>
        </div>
    );

}

export default Header;