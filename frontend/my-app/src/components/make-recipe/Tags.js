import React from 'react';

const Tags = ({tags,handleClick})=>{
    return tags.length ? (
        <div className = "make-recipe-tags-container">
            {displayTags(tags,handleClick)}
        </div>
    ): (
        <div className = "make-recipe-tags-container">
            <p>Tags loading...</p>
        </div>
    );
}

const displayTags = (tags,handleClick)=>{
    return tags.map(tag=>{
        return (
            <div key = {tag}>
                <label  htmlFor = {`tag-${tag}`} className = "make-recipe-tag-label">{tag}:</label>
                 <input id = {`tag-${tag}`}onClick = {(e)=>handleClick(e,tag)} type = "checkbox" className = "make-recipe-tag-check-box" />
           </div>
        );
    });
}

export default Tags;