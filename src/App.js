import React, {Component} from 'react';
import {connect} from 'react-redux'
import {authActions} from "./_actions/authActions";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import Nomatch from './_components/Nomatch';
//import {Auth} from './_authentication/Auth'
import Home from './_containers/Home';
import Header from './_containers/Header';
import ShoppingCart from './_containers/ShoppingCart';
import CheckOut from './_containers/CheckOut';
import Login from './_containers/Authentication/Login';
import Register from './_containers/Authentication/Register';
import ForgotPassword from './_containers/Authentication/ForgotPassword';
import Footer from './_components/Footer';
import MobileHeader from './_containers/MobileHeader';
import SearchResult from './_components/Header/SearchResult';
import ShowCategoryProduct from './_containers/ShowCategoryProduct';
import ListResource from './_containers/ShowProducts';
import Dashboard from "./_containers/Authentication/Dashboard";
import Accountinfo from "./_containers/Authentication/Accountinfo";
import Measure from "./_containers/Measure";

class App extends Component {

    /*componentDidMount(){
        if(this.props.auth.id !== 0){
            setTimeout(() => {
                this.props.onLogoOut()
            }, 5000)
        }

    }*/

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.id !== this.props.auth.id) {
            setTimeout(() => {
                this.props.onLogoOut(nextProps.auth.id)
            }, 60000)

        }
    }

    render() {
        const authenticated = this.props.auth.isAuthenticated;
        return (
            <BrowserRouter>

                <div>
                    <div id="page">

                        <Route render={(props) => <Header {...props}/>}/>
                        <Switch>
                            <Route path="/" exact render={(props) => <Home  {...props}/>}/>
                            <Route path="/category/:cat_name" exact
                                   render={(props) => <ShowCategoryProduct {...props}/>}/>
                            <Route path="/search/:search_parameter" render={(props) => <SearchResult {...props}/>}/>
                            <Route path="/product/:product_name" render={(props) => <ListResource {...props}/>}/>
                            <Route path="/shopping_cart" render={(props) => <ShoppingCart {...props}/>}/>
                            <Route path="/login" render={(props) => <Login {...props}/>}/>
                            <Route path="/register" render={(props) => <Register {...props}/>}/>
                            <Route path="/forgot-password" render={(props) => <ForgotPassword {...props}/>}/>
                            <Route path="/checkout" render={(props) => <CheckOut {...props}/>}/>
                            {/*<Route path="/my-account" render={(props) => <Dashboard {...props}/> } />*/}


                            <Route path="/my-account" render={(props) => (
                                authenticated
                                    ? <Dashboard {...props} />
                                    : <Redirect to='/login'/>
                            )}
                            />

                            <Route path="/account-info" render={(props) => (
                                authenticated
                                    ? <Accountinfo {...props} />
                                    : <Redirect to='/login'/>
                            )}
                            />


                            <Route path="/measure-me" render={(props) => <Measure {...props}/>}/>

                            {/*<Route path="/category/:cat_name/:number" render={(props) => <ShowCategory {...props}/> } />


                    <Route path="/category/all" render={(props) => <Category {...props}/> } />

                    <Route path="/search/:search_parameter" render={(props) => <Search {...props}/> } />

                    <Route path="/product/:slug" render={(props) => <ProductDetails {...props}/> } />*/}


                            <Route path='*' component={Nomatch}/>

                        </Switch>

                        <Footer/>
                    </div>
                    <MobileHeader/>
                </div>

            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function matchDispatchToProps(dispatch) {
    return {

        onLogoOut(id) {
            dispatch(authActions.logoOut(id))
        }

    }
}


export default connect(mapStateToProps, matchDispatchToProps)(App);
