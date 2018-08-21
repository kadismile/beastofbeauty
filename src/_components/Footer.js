import React from 'react'

const Footer = () =>{
    
    return (
        <div>

            <footer className="footer">
                <div className="newsletter-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="newsletter">
                                    <form>
                                        <div>
                                            <h4><span>newsletter</span></h4>
                                            <input type="text" placeholder="Enter your email address" className="input-text" title="Sign up for our newsletter" id="newsletter1" name="email"/>
                                                <button className="subscribe" title="Subscribe" type="submit"><span>Subscribe</span></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <div className="social">
                                    <ul>
                                        <li className="fb"><a href="/">.</a></li>
                                        <li className="tw"><a href="/">.</a></li>
                                        <li className="googleplus"><a href="/">.</a></li>
                                        <li className="rss"><a href="/">.</a></li>
                                        <li className="pintrest"><a href="/">.</a></li>
                                        <li className="linkedin"><a href="/">.</a></li>
                                        <li className="youtube"><a href="/">.</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="payment-accept"> <img src="assets/images/payment-1.png" alt=""/>
                                    <img src="assets/images/payment-2.png" alt=""/>
                                        <img src="assets/images/payment-3.png" alt=""/>
                                            <img src="assets/images/payment-4.png" alt=""/> </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-xs-12 coppyright">
                                © 2018 the Ankarea Hub. All Rights Reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>






            
        </div>
    ) 
};


export default Footer;