import React, {Component} from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// the search bar will disable all other filters/sorts
const ENTER = 13;

class SearchBar extends Component{
    state = {
        content:''
    }

    handleChange = e=>{
        this.props.handleSearchChange(e)
        this.setState({
            content:e.target.value
        })
    }

    handleKeyUp = (e)=>{
        if(e.keyCode === ENTER){
            this.props.handleSearch(this.state.content);
        }
    }


    render(){
        return (
            <div className = "topnav">
                <div className="search-container">
                    <input onKeyUp = {(e) =>this.handleKeyUp(e)} onChange = {this.handleChange} id =  'search-bar'type = "text" placeholder="Search.."/>
                    <button onClick = {(e) => this.props.handleSearch(this.state.content)} className = "search-bar-button"><FontAwesomeIcon icon={faSearch} /></button>
                </div>         
            </div>
        );
    }
}

export default SearchBar;