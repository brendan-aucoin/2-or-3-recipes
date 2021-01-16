import React, { Component } from 'react';

class Filter extends Component {
    state = {
        
    }

    render() {
        if (this.props.classNameFilter === "drop-down-filter-hidden")
        {
            return (
                <div onClick = {() => this.props.filterClassName("drop-down-filter-shown")}>Filter
                </div>
            )
        }
        else {
            return (
                <div onClick = {() => this.props.filterClassName("drop-down-filter-hidden")}>Filter
                </div>
            )
        }   
    }
}

export default Filter;