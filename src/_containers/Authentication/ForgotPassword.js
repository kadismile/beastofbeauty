import React, {Component} from 'react'
class ForgotPassword extends Component  {

    render(){
        return (
            <section className="main-container col1-layout">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <article className="col-main">
                                <div className="account-login">
                                    <div className="page-title">
                                        <h2>Forgot Your Password?</h2>
                                    </div>
                                    <fieldset className="col2-set">
                                        <div className="col-1 new-users">

                                            <div className="content">
                                                <p>Kindly input the E-mail you registered with
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-2 registered-users"><strong>Forgot My Password</strong>
                                            <div className="content">
                                                <p>Kindly input the E-mail you registered with</p>
                                                <ul className="form-list">
                                                    <li>
                                                        <label for="email">Email Address <span className="required">*</span></label>
                                                        <input type="text" title="Email Address" className="input-text required-entry" id="email" value="" name="login[username]"/>
                                                    </li>

                                                </ul>
                                                <p className="required">* Required Fields</p>
                                                <div className="buttons-set">
                                                    <button id="send2" name="send" type="submit" className="button login"><span>Login</span></button>
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

export default ForgotPassword