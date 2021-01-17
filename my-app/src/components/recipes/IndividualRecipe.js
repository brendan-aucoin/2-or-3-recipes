import React from 'react';
import  './../../styles/individual-recipe-styles.css';
import ImageUnnavailable from './../../img/image-unnavailable.jpg';
import {Link} from 'react-router-dom';
const wordCutoff = 25;
const IndividualRecipe = ({id,imgPath,name,desc,author})=>{
    return(
        <Link to = {`/all-recipes/${id}`} className = "individual-recipe-link">
        <div className = "individual-recipe-container">
            <div className = "individual-recipe-info-container">
                {/* <img className = "individual-recipe-image" src = {imgPath ? `/${imgPath}` : ImageUnnavailable} alt = ""/> */}
                <img className = "individual-recipe-image" src = {imgPath ? `${imgPath}` : ImageUnnavailable} alt = ""/>
                <p className = "individual-recipe-name">{name}</p>
                <p className = "individual-recipe-desc">{splitDescription(desc,wordCutoff)}</p>
                <p className  = "individual-recipe-author"> {author}</p>
            </div>
        </div>
        </Link>
    );
}
/* this function takes in a recipes description and returns a shorter version of it if there were more than numWords in it.  
it places a .... at the end of the description*/
const splitDescription = (description,numWords)=>{
    let descriptionList = description.split(" ");
    if(descriptionList.length <numWords){return description;}
    descriptionList.splice(numWords-1,(descriptionList.length -numWords),'......');
    return descriptionList.join(' ');
}

export default IndividualRecipe;