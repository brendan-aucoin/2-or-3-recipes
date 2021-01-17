import React from 'react';


const displayTags = (tags)=>{
    return tags.length !== 0 ? tags.map(tag=>{
        return (
           <div key = {tag.name} className = "recipe-page-individual-tag">
                <span className =  "recipe-page-tag-name">{tag.name}:</span>
                <div style = {{backgroundColor: tag.color}} className = "recipe-page-tag-color-box"></div>
           </div> 
        );
    }) : (
        <div></div>
    );
}
const RecipePageTags = ({tags,recipe})=>{
    return tags.length !== 0 ?(
        <div>
            <h1 className = "recipe-page-tags-title">Tags</h1>
            <div className = "recipe-page-tags">
                {displayTags(tags)}
            </div>
        </div>
    ) :
    (<div></div>);
}

export default RecipePageTags;