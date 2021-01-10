import React, {Component} from 'react';
import './../styles/home-styles.css';
import Header from './../components/home/Header';

class Home extends Component{
    state = {

    }

    render(){

        return (
            <div className = "home-container">
                {/* the showcase */}
                <Header />

            </div>
        );
    }
}

export default Home;