import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {authActions} from "../../_actions/authActions";
const loader = <div className="data-loading"> <i className="fa fa-refresh fa-spin"></i> </div>
class Accountinfo extends Component  {

    constructor (props) {
        const user = props.auth;
        console.log(user.username)
        super();
        this.state = {
            email: user.email,
            userName: user.username,
            shippingAddress:user.shippingAddress,
            first_name:user.first_name,
            last_name:user.last_name,
            confirmPassword:'',
            loading: true
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1200); // simulates an async action, and hides the spinner
    }


    formSubmitted =(e, mail, username, Address, f_name, l_name ) =>{
        e.preventDefault();
        const {email, userName, shippingAddress, first_name, last_name} = this.state;
        mail = email; username = userName;
            Address = shippingAddress; f_name = first_name; l_name = last_name;

        this.setState({email: '',userName: '', shippingAddress:'', first_name:'', last_name:'',})
    };


    render(){
        const { loading } = this.state;
        return (
            loading  ? loader :  //An if statement
            <section className="main-container col1-layout">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <article className="col-main">
                                <div className="account-login">
                                    <div className="page-title">
                                        <h2>Account Information</h2>
                                    </div>
                                    <fieldset className="col2-set">
                                        <div className="col-1 new-users" style={{width: '30%'}}>
                                            <aside className="col-left sidebar ">

                                                <div className="block block-account">
                                                    <div className="block-title">My Account</div>
                                                    <div className="block-content">
                                                        <ul>
                                                            <li ><a>Account Dashboard</a></li>
                                                            <li className="current"><Link to={{pathname: "/account-info"}}>Account Information</Link></li>
                                                            <li><a href="/">Address Book</a></li>
                                                            <li><a href="/">My Orders</a></li>
                                                            <li className="last"><a href="/">Newsletter Subscriptions</a></li>
                                                            <li className="last"><a href="/">Manage Credit Card</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </aside>
                                        </div>

                                        <div className="col-2 registered-users" style={{width: '70%'}}>
                                            <strong>Update Your Account</strong>
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
                                                        <label>First Name <span className="required">*</span></label>
                                                        <input type="text" value={this.state.first_name}   onChange={(event) => this.setState({password: event.target.value})} className="input-text required-entry validate-password" />
                                                    </li>
                                                    <li>
                                                        <label>Last Name <span className="required">*</span></label>
                                                        <input type="text" value={this.state.last_name} onChange={(event) => this.setState({confirmPassword: event.target.value})} id="pass" className="input-text required-entry validate-password" />
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

function mapStateToProps(state) {
    return{
        auth: state.auth
    }
}

function matchDispatchToProps(dispatch){
    return {

        onLogoOut(id){
            dispatch(authActions.logoOut(id))
        }

    }
}


export default connect(mapStateToProps, matchDispatchToProps)(Accountinfo);