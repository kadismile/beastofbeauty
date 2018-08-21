import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {categoryActions} from '../_actions/categoryActions'
import {currencyActions} from '../_actions/currencyActions'

class Authentication extends Component {



    render(){
        return(

            <section className="main-container col1-layout">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <article className="col-main">
                                <div className="account-login">
                                    <div className="page-title">
                                        <h2>Login or Create an Account</h2>
                                    </div>
                                    <fieldset className="col2-set">
                                        <div className="col-1 new-users"><strong>New Customers</strong>
                                            <div className="content">
                                                <p>By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</p>
                                                <div className="buttons-set">
                                                    <button onClick="window.location='http://demo.magentomagik.com/computerstore/customer/account/create/';" className="button create-account" type="button"><span>Create an Account</span></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 registered-users"><strong>Login</strong>
                                            <div className="content">
                                                <p>If you have an account with us, please log in.</p>
                                                <ul className="form-list">
                                                    <li>
                                                        <label for="email">Email Address <span className="required">*</span></label>
                                                        <input type="text" title="Email Address" className="input-text required-entry" id="email" value="" name="login[username]"/>
                                                    </li>
                                                    <li>
                                                        <label for="pass">Password <span className="required">*</span></label>
                                                        <input type="password" title="Password" id="pass" className="input-text required-entry validate-password" name="login[password]"/>
                                                    </li>
                                                </ul>
                                                <p className="required">* Required Fields</p>
                                                <div className="buttons-set">
                                                    <button id="send2" name="send" type="submit" className="button login"><span>Login</span></button>
                                                    <a className="forgot-word" href="http://demo.magentomagik.com/computerstore/customer/account/forgotpassword/">Forgot Your Password?</a> </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </article>

                        </div>

                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return{

        currency: state.currency
    }
}

function matchDispatchToProps(dispatch){
    return {

        onAllCategory(){
            dispatch(categoryActions.prepareCategory())
        },



    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Authentication);