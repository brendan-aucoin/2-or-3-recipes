import React, { Component } from 'react';

class SortBox extends Component {
    state = {
        calories: "-",
        prep: "-",
        servings: "-",

    }

    changeSort = (fieldValue, field) => {
        if (fieldValue === "-")
        {
           this.setState({
               [field]: "High"
           })
        }

        else if (fieldValue === "High")
        {
            this.setState({
                [field]: "Low"
            })
        }
        else {
            this.setState({
                [field]: "-"
            })
        }

        if (field === "calories")
        {
            this.setState({
                prep: "-",
                servings: "-"
            })
        }
        else if (field === "prep")
        {
            this.setState({
                calories: "-",
                servings: "-"
            })
        }
        else{
            this.setState({
                prep: "-",
                calories: "-"
            })
        }
        //This code has no right to make this work but it does
       setTimeout(() => {this.props.sortState(this.state.calories, this.state.prep, this.state.servings)}, 0);
        
    }

    render() {
        return (
            <div className = "sort-box-flex-full">
                <h1>Sort By:</h1>
                <div className = "sort-box-flex">
                    <div className = "sort-title">Calories: 
                        <button className = "sort-button" onClick = {() => this.changeSort(this.state.calories, "calories")}>{this.state.calories}</button>
                    </div>
                    <div>Prep Time: 
                        <button className = "sort-button" onClick = {() => this.changeSort(this.state.prep, "prep")}>{this.state.prep}</button> 
                    </div>
                    <div>Servings: 
                        <button className = "sort-button" onClick = {() => this.changeSort(this.state.servings, "servings")}>{this.state.servings}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SortBox;