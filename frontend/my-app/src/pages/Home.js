import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './../styles/home-styles.css';
import background1 from './background1.jpg';

class Home extends Component{
    state = {

    }

    render(){

        return (
            <div className = "home-container">
                {/* the showcase */}
                <header className = "showcase"style = {{backgroundImage:`url(${background1})`}}>
                    <h1 className= "title">2 or 3 Recipes: The Only Recipes on the Internet</h1>
                    <p className = "company-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam delectus quam aliquam expedita dolorem dicta nam fuga culpa porro nemo quas officia id quia saepe impedit adipisci repellendus, enim, vitae et obcaecati. Soluta, dolorem quaerat nesciunt sequi aliquam quas vel?</p>
                    <div className = "action-buttons-container">
                        <button className= "action-button"><Link to = '/all-recipes'>Check Out Our Recipes</Link></button>
                        <button className= "action-button"><Link to = '/make-recipe'>Upload Your Recipe</Link></button>
                    </div>
                </header>
                <section>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, vero! Eaque, soluta. Magnam voluptatibus nihil quia illo vitae earum architecto optio impedit fugit, eos molestiae, debitis, molestias reprehenderit porro assumenda. Id dolore itaque vitae quis tempora totam voluptas aliquid illo, et nesciunt nostrum omnis ad veniam assumenda libero. Debitis dicta voluptatem, excepturi optio, quaerat repellat omnis incidunt illum iusto quam recusandae nostrum itaque eius dolore et velit id repudiandae ea! Voluptate dicta, sit earum inventore dignissimos totam molestias accusamus, quo laudantium sint laborum aliquid sapiente explicabo tempora. Reprehenderit quia illum, illo at dolore facere quasi, enim doloribus hic repudiandae itaque.</p>
                </section>

            </div>
        );
    }
}

export default Home;