import React, { Component } from 'react';
import '../App.css';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

import { Switch, Route, Redirect, withRouter } from  'react-router-dom';
import { connect } from 'react-redux';




const mapStateToProps = state => { // state :from redux store
    // redux의 state를 가져와서 props로 쓸수있게 된다.
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.filter((dish)=> dish.featured)[0]}
                      promotion={this.props.promotions.filter((promotion)=> promotion.featured)[0]}
                      leader={this.props.leaders.filter((leader)=> leader.featured)[0]}
                />
            );
        }

        const DishWithId = ({match}) => {
            return (
                <DishDetail dish={this.props.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId, 10))[0]}
                comments={this.props.comments.filter((comments)=> comments.dishId === parseInt(match.params.dishId, 10))}/>
            );
        }

        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Route exact path="/contactus" component={Contact}/>
                    <Redirect to="/home"/>
                    {/*<Menu dishes={this.state.dishes}*/}
                          {/*onClick={(dishId) => this.onDishSelect(dishId)}/>*/}
                    {/*<DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>*/}
                </Switch>
                <Footer />
            </div>
        );
    }
}

// connecting your component to the react routher
export default withRouter(connect(mapStateToProps)(Main));
