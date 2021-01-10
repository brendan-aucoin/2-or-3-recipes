import React, {Component} from 'react';
import {Link,NavLink} from 'react-router-dom';
import './../../styles/nav-styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {menuItems} from './Menuitems';

class Navbar extends Component{
    // the only thing in the state is if you clicked the hamburger button
    state = {
        clicked:false
    }

    // when you click the hamburger button it inverts the states clicked property
    handleClick = e=>{
        this.setState({
            clicked:!this.state.clicked
        })
    }

    // when you go to a new page you want to change the state of the nav bar to not be showing
    resetNavbar = ()=>{
        this.setState({clicked:false})
    }
    // read the array from the the menu items and map them to NavLinks
    displayMenuItems = ()=>{
        return menuItems.map((item,index)=>{
            return (
                <NavLink key = {index} className = {item.cName} onClick = {this.resetNavbar} to = {item.url}>{item.content}</NavLink>
            );
        })
    }
    
    render(){
        return (
            <div className = "menu-bar">
                <Link to = '/'><h2 className = "logo">2 or 3 Recipe</h2></Link>
                <button id = "menu-burger" onClick = {this.handleClick}></button>
                <label htmlFor = "menu-burger" className = "show-menu-button">
                     <FontAwesomeIcon  icon={faBars} /> 
                </label>

                {/* the menu items */}
                <ul className =  {this.state.clicked ?  "menu-active" : "menu"}>
                    {this.displayMenuItems()}
                    <label htmlFor = "menu-burger" className = "hide-menu-button">
                        <FontAwesomeIcon  icon={faTimes} /> 
                    </label>
                </ul>
            </div>
        );
    }
    
}

export default Navbar;