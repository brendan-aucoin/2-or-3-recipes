import React from 'react';
import  './../../styles/individual-recipe-styles.css';
import ImageUnnavailable from './../../img/image-unnavailable.jpg';

const URL_PREFIX = "http://localhost:5000/";

const IndividualRecipe = ({imgPath,name,desc})=>{
    return(
        <div className = "individual-recipe-container">
            <div className = "individual-recipe-info-container">
                <img className = "individual-recipe-image" src = {imgPath ? `${URL_PREFIX}${imgPath}` : ImageUnnavailable}/>
                <p className = "individual-recipe-name">{name}</p>
                <p className = "individual-recipe-desc">{desc}</p>
            </div>
        </div>
    );
}

export default IndividualRecipe;