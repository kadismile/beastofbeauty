import React, {Component} from 'react'
import { Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {authActions} from '../../_actions/authActions'
class Login extends Component  {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            redirectToReferrer: false
        };
    }

    formSubmitted =(e, mail,  thepassword ) =>{
        e.preventDefault();
        const {email, password} = this.state;
       mail = email; thepassword = password;

        this.props.onLogin(mail, thepassword);
        this.setState({email: '', password:''})
    };



    render(){
        //console.log(this.props)
        const { redirectToReferrer } = this.state;
            if (redirectToReferrer === true) {
                return <Redirect to='/' />
            }
        return (
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
                                                <p>Kindly Log In or create an account with us by clicking the button below
                                                </p>
                                                <div className="buttons-set">

                                                    <Link className="button create-account" type="button"  to={{pathname: "/register"}} ><span>Create an Account</span></Link>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 registered-users"><strong>Login</strong>
                                            <div className="content">
                                                <p>If you have an account with us, please log in.</p>
                                                <ul className="form-list">
                                                    <li>
                                                        <label>Email Address / Username <span className="required">*</span></label>
                                                        <input type="text" value={this.state.email }
                                                               onChange={(event) => this.setState({email: event.target.value})}
                                                               title="Email Address" className="input-text required-entry"
                                                        />
                                                    </li>
                                                    <li>
                                                        <label>Password <span className="required">*</span></label>
                                                        <input type="password" onChange={(event) => this.setState({password: event.target.value})}
                                                               value={this.state.password} title="Password"
                                                               className="input-text required-entry validate-password"
                                                        />
                                                    </li>
                                                </ul>
                                                <p className="required">* Required Fields</p>
                                                <div className="buttons-set">
                                                    <button id="send2" name="send"  onClick={this.formSubmitted }type="submit" className="button login"><span>Login</span></button>
                                                    <Link className="forgot-word" to={{pathname: "/forgot-password"}} >Forgot Your Password? </Link>
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

function matchDispatchToProps(dispatch){
    return {

        onLogin(mail, thepassword){
            dispatch(authActions.loginUser(mail, thepassword))
        }

    }
}

export default connect(null,matchDispatchToProps)(Login);