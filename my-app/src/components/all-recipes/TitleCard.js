import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Filter from './Filter';
import Sort from './Sort';
import FilterBox from './FilterBox';
import SortBox from './SortBox';
import background1 from './../../img/menu_bar.jpeg';

class TitleCard extends Component {
    state = {
        classNameFilter : "drop-down-filter-hidden",
        classNameSort : "drop-down-sort-hidden"
    }
    filterClassName = (className) => {
        this.setState({
            classNameFilter: className,
            classNameSort: "drop-down-sort-hidden"
        })
    }
    sortClassName = (className) => {
        this.setState({
            classNameSort: className,
            classNameFilter: "drop-down-filter-hidden"
        })
    }

    render() {
        
        return(
            <div>
                <div className = "search_image" style = {{backgroundImage:`url(${background1})`}}>
                    <SearchBar handleSearchChange = {this.props.handleSearchChange} handleSearch = {this.props.handleSearch}/>
                    <div className = "sort-flex-container">
                        <Filter filterClassName={this.filterClassName} classNameFilter = {this.state.classNameFilter}/>
                        <Sort sortClassName={this.sortClassName} classNameSort = {this.state.classNameSort} />
                        <div className = "reset-all-recipes-container" onClick = {() =>this.props.resetRecipes()}>Reset</div>
                    </div>
                </div>
                <div className = {this.state.classNameFilter}>
                    <FilterBox filterByTags={this.props.filterByTags} tags = {this.props.tags}/>
                </div>
                <div className = {this.state.classNameSort}>
                    <SortBox sortState={this.props.sortState}/>
                </div>
               
            </div>
        )
    }  
}

export default TitleCard;