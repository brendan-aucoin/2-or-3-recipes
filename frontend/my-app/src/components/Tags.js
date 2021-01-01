import React from 'react';

const Tags = ({tags})=>{
    return (
        <div className = "tags-container">
            {displayTags(tags)}
        </div>
    );
}

const displayTags = tags=>{
    return tags.map(tag=>{
        return (
            <div key = {tag}>
                <span  className = "tag-label">{tag}</span>
                 <input type = "checkbox" className = "tag" />
           </div>
        );
    });
}

export default Tags;