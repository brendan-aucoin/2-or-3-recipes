import React, { Component } from 'react';

class Sort extends Component {
    state = {
        a: 5
    }

    render() {
        if (this.props.classNameSort === "drop-down-sort-hidden")
        {
            return (
                <div onClick = {() => this.props.sortClassName("drop-down-sort-shown")}>Sort
                </div>
            )
        }
        else {
            return (
                <div onClick = {() => this.props.sortClassName("drop-down-sort-hidden")}>Sort
                </div>
            )
        }   
    }
}

export default Sort;