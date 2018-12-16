import React, {Component} from 'react';
import '../App.css';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const mapStateToProps = state => { // state :from redux store
    // redux의 state를 가져와서 props로 쓸수있게 된다.
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
        postComment: (dishId, rating, author, comment) => {
            dispatch(postComment(dishId, rating, author, comment))
        },
        postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => {
            dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
        },
        fetchDishes: () => {
            dispatch(fetchDishes())
        },
        fetchComments: () => {
            dispatch(fetchComments())
        },
        fetchPromos: () => {
            dispatch(fetchPromos())
        },
        fetchLeaders: () => {
            dispatch(fetchLeaders())
        },
        resetFeedbackForm: () => {
            dispatch(actions.reset('feedback'))
        },
    })
;

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                      dishesLoading={this.props.dishes.isLoading}
                      dishesErrMess={this.props.dishes.errMess}
                      promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                      promosLoading={this.props.promotions.isLoading}
                      promosErrMess={this.props.promotions.errMess}
                      leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                      leadersLoading={this.props.leaders.isLoading}
                      leadersErrMess={this.props.leaders.errMess}
                />
            );
        }

        const DishWithId = ({match}) => {
            return (
                <DishDetail
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comments) => comments.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}/>
            );
        }

        return (
            <div className="App">
                <Header/>
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="pages" timeout={300}>
                        <Switch>
                            <Route path="/home" component={HomePage}/>
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                            <Route path="/menu/:dishId" component={DishWithId}/>
                            <Route exact path="/contactus"
                                   component={() => <Contact
                                       postFeedback={this.props.postFeedback}
                                       resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer/>
            </div>
        );
    }
}

// connecting your component to the react routher
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
