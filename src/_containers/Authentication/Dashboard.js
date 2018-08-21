import React, {Component} from 'react'
import {connect} from 'react-redux'
import {authActions} from "../../_actions/authActions";
import {Link} from 'react-router-dom'
const loader = <div className="data-loading"> <i className="fa fa-refresh fa-spin"></i> </div>
class Dashboard extends Component  {


    constructor (props) {
        super();
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1200); // simulates an async action, and hides the spinner
    }
    render(){
        const user = this.props.auth;
        const { loading } = this.state;


        return (

            loading  ? loader :
            <section className="main-container col2-left-layout">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-sm-push-3">
                            <article className="col-main">
                                <div className="my-account">
                                    <div className="page-title">
                                        <h2>My Dashboard</h2>
                                    </div>
                                    <div className="dashboard">
                                        <div className="welcome-msg"> <strong>Hello,<span style={{textTransform: 'capitalize'}}>{user.username}</span>!</strong>
                                            <p>From your Account Dashboard you have the ability to view a snapshot of your recent account activity and update your account information. Select a link below to view or edit information.</p>
                                        </div>
                                        <div className="recent-orders">
                                            <div className="title-buttons"><strong>Recent Orders</strong> <a href="/">View All </a> </div>
                                            <div className="table-responsive">
                                                <table className="data-table" id="my-orders-table">
                                                    <colgroup><col/>
                                                        <col/>
                                                            <col/>
                                                                <col width="1"/>
                                                                    <col width="1"/>
                                                                        <col width="1"/>
                                                    </colgroup><thead>
                                                <tr className="first last">
                                                    <th>Order #</th>
                                                    <th>Date</th>
                                                    <th>Ship to</th>
                                                    <th><span className="nobr">Order Total</span></th>
                                                    <th>Status</th>
                                                    <th>&nbsp;</th>
                                                </tr>
                                                </thead>
                                                    <tbody>
                                                    <tr className="first odd">
                                                        <td>500000002</td>
                                                        <td>9/9/10 </td>
                                                        <td>John Doe</td>
                                                        <td><span className="price">$5.00</span></td>
                                                        <td><em>Pending</em></td>
                                                        <td className="a-center last"><span className="nobr"> <a href="/">View Order</a> <span className="separator">|</span> <a href="/">Reorder</a> </span></td>
                                                    </tr>
                                                    <tr className="last even">
                                                        <td>500000001</td>
                                                        <td>9/9/10 </td>
                                                        <td>John Doe</td>
                                                        <td><span className="price">$1,397.99</span></td>
                                                        <td><em>Pending</em></td>
                                                        <td className="a-center last"><span className="nobr"> <a href="">View Order</a> <span className="separator">|</span> <a href="/">Reorder</a> </span></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="box-account">
                                            <div className="page-title">
                                                <h2>Account Information</h2>
                                            </div>
                                            <div className="col2-set">
                                                <div className="col-1">
                                                    <h5>Contact Information</h5>
                                                    <a href="/">Edit</a>
                                                    <p>Ibrahim<br/>
                                                        ibrahim@kadismile.com<br/>
                                                        <a href="/">Change Password</a> </p>
                                                </div>
                                                <div className="col-2">
                                                    <h5>Newsletters</h5>
                                                    <a href="/">Edit</a>
                                                    <p> You are currently not subscribed to any newsletter. </p>
                                                </div>
                                            </div>
                                            <div className="col2-set">
                                                <h4>Address Book</h4>
                                                <div className="manage_add"><a href="/">Manage Addresses</a> </div>
                                                <div className="col-1">
                                                    <h5>Primary Billing Address</h5>
                                                    <address>Abuja<br/>
                                                        aundh<br/>
                                                        Area 2 Section 1 <br/>
                                                        Gongola Street,<br/>
                                                        Dankama Close Garki Abuja <br/>
                                                        <a href="/">Edit Address</a>
                                                    </address>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                        </div>
                        <aside className="col-left sidebar col-sm-3 col-xs-12 col-sm-pull-9">

                            <div className="block block-account">
                                <div className="block-title">My Account</div>
                                <div className="block-content">
                                    <ul>
                                        <li className="current"><a>Account Dashboard</a></li>
                                        <li><Link to={{pathname: "/account-info"}}>Account Information</Link></li>
                                        <li><a href="/">Address Book</a></li>
                                        <li><a href="/">My Orders</a></li>
                                        <li className="last"><a href="/">Newsletter Subscriptions</a></li>
                                        <li className="last"><a href="/">Manage Credit Card</a></li>
                                    </ul>
                                </div>
                            </div>
                        </aside>


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


export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);