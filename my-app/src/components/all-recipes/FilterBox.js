import React, { Component } from 'react';

class FilterBox extends Component {
    state = {

    }

    render() {
        return (
            <div className = "filter-box-flex-full">
                <h1>Filters:</h1>
                <div className = "filter-box-flex">
                    {
                        this.props.tags.map((tag, index) => {
                            return (
                                <div key = {index} className = {tag.checked ? "tag-green" : "tag-white"} onClick = {() => this.props.filterByTags(tag.checked ? "green" : "white", tag, index)}>
                                    {tag.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default FilterBox;