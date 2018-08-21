import React, {Component} from 'react'
class Measure extends Component  {

    render(){
        return (
            <section className="main-container col2-left-layout">
                <div className="container">
                    <div className="row">



                        <div className="col-sm-9 col-sm-push-3">
                            <article className="col-main">
                                <div className="page-title">
                                    <h2>Send Your Measurement</h2>
                                </div>
                                <div className="static-contain">
                                    <fieldset className="group-select">
                                        <ul>
                                            <li id="billing-new-address-form">
                                                <fieldset>
                                                    <input type="hidden" name="billing[address_id]" value="" id="billing:address_id"/>
                                                        <ul>
                                                            <li>
                                                                <div className="customer-name">
                                                                    <div className="input-box name-firstname">
                                                                        <label for="billing:firstname"> Waist<span className="required">*</span></label>
                                                                        <br/>
                                                                            <input type="text" id="billing:firstname" name="billing[firstname]" value="" title="First Name" className="input-text "/>
                                                                    </div>
                                                                    <div className="input-box name-lastname">
                                                                        <label for="billing:lastname"> Burst <span className="required">*</span> </label>
                                                                        <br/>
                                                                            <input type="text" id="billing:lastname" name="billing[lastname]" value="" title="Last Name" className="input-text"/>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="input-box">
                                                                    <label for="billing:company">Hips</label>
                                                                    <br/>
                                                                        <input type="text" id="billing:company" name="billing[company]" value="" title="Company" className="input-text"/>
                                                                </div>
                                                                <div className="input-box">
                                                                    <label for="billing:email">shoulder <span className="required">*</span></label>
                                                                    <br/>
                                                                        <input type="text" name="billing[email]" id="billing:email" value="" title="Email Address" className="input-text validate-email"/>
                                                                </div>
                                                            </li>


                                                        </ul>
                                                </fieldset>
                                            </li>


                                                <div className="buttons-set">
                                                    <button type="submit" title="Submit" className="button submit"> <span> Submit </span> </button>
                                                </div>
                                        </ul>
                                    </fieldset>
                                </div>
                            </article>

                        </div>
                        <aside className="col-left sidebar col-sm-3 col-xs-12 col-sm-pull-9">

                           {/* <div className="block block-company">
                                <div className="block-title">Company </div>
                                <div className="block-content">
                                    <ol id="recently-viewed-items">
                                        <li className="item odd"><a href="#">About Us</a></li>
                                        <li className="item even"><a href="#">Sitemap</a></li>
                                        <li className="item  odd"><a href="#">Terms of Service</a></li>
                                        <li className="item even"><a href="#">Search Terms</a></li>
                                        <li className="item last"><strong>Contact Us</strong></li>
                                    </ol>
                                </div>
                            </div>*/}
                        </aside>
                    </div>
                </div>
            </section>
        )
    }
}

export default Measure