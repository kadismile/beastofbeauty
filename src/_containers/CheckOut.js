import React, {Component} from 'react'
import {Link} from 'react-router-dom'
class CheckOut extends Component {

    constructor () {
        super();
        this.state = {
            email: '',
            phone:'',
            first_name: '',
            last_name: '',
            userName: '',
            state:'',
            town: '',
            postal:'',
            shippingAddress:'',
            password:'',
            confirmPassword:'',
        };
    }
    render(){
        return (
            <section className="main-container col1-layout">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <article className="col-main">
                                <div className="account-login">
                                    <div className="page-title">
                                        <h2>Check Out</h2>
                                    </div>
                                    <fieldset className="col2-set">
                                        <div className="col-2 registered-users"><strong>Create Your Account</strong>
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
                                        <div className="col-1 new-users"><strong>Returning Customer ? click <span><Link to={{pathname:'/register'}}> Here</Link></span></strong>
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
export default CheckOut