import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
class Register extends Component  {

    constructor () {
        super();
        this.state = {
            email: '',
            userName: '',
            shippingAddress:'',
            password:'',
            confirmPassword:'',
        };
    }


    formSubmitted =(e, mail, username, Address, thepassword ) =>{
        e.preventDefault();
        const {email, userName, shippingAddress, password} = this.state;
            mail = email; username = userName;
               Address = shippingAddress; thepassword = password;


                let settings = {
                    "async": true,
                    "crossDomain": true,
                    //"url": `https://localhost/mama-ankara/api/user/register/?username=${username}&email=${mail}&nonce=9a0a343b9f&display_name=${username}&user_pass=${thepassword}`,
                    //"url": `https://localhost/mama-ankara/api/auth/get_currentuserinfo/?cookie=salim|1531678079|nOGqxjOxhh6CtL6Ip7DUVoX6Y7jovqF3JeONTNVz79W|53fa1e56a42c0ced66db3c095beb39bba29e78ed05dd0608f0f528fbd2d8b2d5`,
                    "url": `https://localhost/mama-ankara/wp-json/wc/v2/customers/20`,
                    "method": "GET",
                    "headers": {
                        "authorization": "Basic Y2tfODg5OWUyZjY2NTg3YTExZDZiMWIwNjQxODlmNmU0MTI3NmY1NTM4YTpjc18wYjcwOGY1YWY2YjZiNzRhMjc4MGY1M2FiNDliMTlmNTI2ZTI0ZjJi",
                    }
                };
                axios(settings).then((response) => {
                   /* if(response.status === "ok"){
                        alert('User Registered')
                    }*/
                    console.log(response)
                }).catch((error) => {
                    console.log(error);
                });

        /*fetch('https://localhost/mama-ankara/api/get_nonce/?controller=user&method=register', {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                //"authorization": "Basic Y2tfODg5OWUyZjY2NTg3YTExZDZiMWIwNjQxODlmNmU0MTI3NmY1NTM4YTpjc18wYjcwOGY1YWY2YjZiNzRhMjc4MGY1M2FiNDliMTlmNTI2ZTI0ZjJi",
                /!*'Access-Control-Allow-Origin': '*',*!/
                //'Content-Type': 'application/json',
            })
        }).then((response)=> {
            console.log(response)
        }).catch((error) =>{
            console.log(error)
        });*/

       this.setState({email: '',userName: '', shippingAddress:'', password:'', confirmPassword:'',})
    };

    render(){

        return (
            <section className="main-container col1-layout">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <article className="col-main">
                                <div className="account-login">
                                    <div className="page-title">
                                        <h2>Create an Account</h2>
                                    </div>
                                    <fieldset className="col2-set">
                                        <div className="col-1 new-users"><strong>New Customers</strong>
                                            <div className="content">
                                                <p>By creating an account with our store, you will be able to move through the checkout
                                                    process faster, store multiple shipping addresses, view and track your orders in your
                                                    account and more.</p>
                                                <hr/>

                                                <p>You Already have an account with us ?</p>
                                                <div className="buttons-set">
                                                    <Link className="button create-account" type="button"  to={{pathname: "/login"}} ><span>Log In</span></Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 registered-users"><strong>Create Your Account</strong>
                                            <div className="content">

                                                <ul className="form-list">
                                                    <li>
                                                        <label >Email Address <span className="required">*</span></label>
                                                        <input type="text" name="email" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}
                                                               className="input-text required-entry"
                                                        />
                                                    </li>
                                                    <li>
                                                        <label>Username <span className="required">*</span></label>
                                                        <input type="text"  value={this.state.userName} onChange={(event) => this.setState({userName: event.target.value})} className="input-text required-entry" />
                                                    </li>
                                                    <li>
                                                        <label>Password <span className="required">*</span></label>
                                                        <input type="password" value={this.state.password}   onChange={(event) => this.setState({password: event.target.value})} className="input-text required-entry validate-password" />
                                                    </li>
                                                    <li>
                                                        <label>Confirm Password <span className="required">*</span></label>
                                                        <input type="password" value={this.state.confirmPassword} onChange={(event) => this.setState({confirmPassword: event.target.value})} id="pass" className="input-text required-entry validate-password" />
                                                    </li>
                                                    <li>
                                                        <label>Shipping Address <span className="required">*</span></label>
                                                        <textarea   cols="67" onChange={(event) => this.setState({shippingAddress: event.target.value})} rows="5" className="input-text required-entry validate-password" />
                                                    </li>
                                                </ul>
                                                <p className="required">* Required Fields</p>
                                                <div className="buttons-set">
                                                    <button id="send2" onClick={this.formSubmitted } type="submit" className="button login"><span>Register </span></button>
                                                </div>
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

export default Register