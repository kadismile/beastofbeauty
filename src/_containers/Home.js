import React, { Component } from 'react';
import {connect} from 'react-redux'
import $ from 'jquery'
import {categoryActions} from '../_actions/categoryActions'
import {productActions} from '../_actions/productActions'
import {cartActions} from '../_actions/cartActions'
import ProductItem from '../_components/Product/ProductItem'
import RevSlider, { Slide, Caption} from 'react-rev-slider';
import {Link} from 'react-router-dom'




const loader = <div className="data-loading" style={{marginTop: '100px'}}> <i className="fa fa-refresh fa-spin"></i> <div style={{marginBottom: '500px'}}></div></div>


class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            addTOCart: false,
            buttonState: '',
            menuDisplay: 'block'
        };

       /* window.onload =()=>{
            document.getElementById('display').style.display = "block";
        };*/


    }

    componentDidMount(){
        document.getElementById('display').style.display = "block";
        $("#addToCart").hide();
        setTimeout(() => {
            this.props.onFetchProducts();
            this.props.onFetchFeaturedProducts(612);
            this.props.onFetchBestsellerProducts(176);
            this.props.onFetchChildren(821);
            this.props.onFetchChannnel(837);
        }, 1000)
    }

    dispalyProduct(slug){

        //alert(slug)
        this.props.history.push({
            pathname: '/product/'+slug,
        });
        //this.props.onfetchProductBySlug(slug)
    }

    dashString=(string)=> {
        let i = 0, strLength = string.length;
        for(i; i < strLength; i++) {
            string = string.replace(" ", "-");
        }
        return string.toLowerCase()
    };

    addedToCart=(id)=>{
        this.setState({buttonState: 'loading'})
        setTimeout(() => {
            this.setState({buttonState: 'success'})
            //this.props.onAddToCart(id)
        }, 2000)

    };




    componentWillMount(){
        this.props.resetProduct();
    }
    render() {

        console.log(this.props.channnel);

       return(

           <div>
               <div id="display">&nbsp;</div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-md-4 col-sm-3 hidden-xs">
                       {/* <div className="side-banner"><img src="assets/images/side-banner.jpg" alt="banner"/></div>*/}
                    </div>
                    <div className="col-md-9 col-sm-9 col-xs-12 home-slider">
                        <div id="thm-slideshow" className="thm-slideshow slider-block">
                            <div id='rev_slider_4_wrapper' className='rev_slider_wrapper fullwidthbanner-container'>
                                <div id='rev_slider_4' className='rev_slider fullwidthabanner'>
                                    <ul>

                                        <RevSlider >


                                                <Slide
                                                    src="assets/images/xmas-promo.png"
                                                    alt="slidebg1"
                                                    data-bgfit="cover"
                                                    data-bgposition="left top"
                                                    data-bgrepeat="no-repeat"
                                                    slideProperties={{
                                                        'data-transition': "random",
                                                        'data-slotamount': "7",
                                                        'data-masterspeed': "1000"
                                                    }}
                                                >

                                                </Slide>



                                          {/*  <Slide
                                                src="assets/images/xmas-promo2.png"
                                                alt="slidebg1"
                                                data-bgfit="cover"
                                                data-bgposition="left top"
                                                data-bgrepeat="no-repeat"
                                                slideProperties={{
                                                    'data-transition': "random",
                                                    'data-slotamount': "7",
                                                    'data-masterspeed': "1000"
                                                }}
                                            >
                                                <Caption
                                                    class="tp-caption skewfromrightshort fadeout"
                                                    data-x="185"
                                                    data-y="224"
                                                    data-speed="500"
                                                    data-start="1200"
                                                    data-easing="Power4.easeOut"
                                                >
                                                    <p style={{color:'red'}}>This is a caption</p>
                                                </Caption>
                                            </Slide>*/}


                                        </RevSlider>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section className="main-container col2-left-layout" style={{marginTop: '20px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-sm-push-3">
                            <div style={{overflow: 'hidden'}}>
                                <div className="figure banner-with-effects effect-sadie1 banner-width  with-button"
                                     style={{backgroundColor: '#ffffff'}}><img src="assets/images/bag-banner.png" alt=""/>
                                    <div className="figcaption">
                                        <div className="banner-content left top"><span style={{
                                            color: '#cccccc',
                                            fontSize: '12px',
                                            letterSpacing: '1px',
                                            fontWeight: 600
                                        }}>ORIGINAL PRODUCTS</span><br/><span style={{fontSize: '24px', color: '#ffffff'}}>Slim, smart and <br
                                                style={{color: '#ffffff', fontSize: '24px'}}/>beautiful</span></div>
                                    </div>
                                    <a href="" style={{color: '#00aeef'}} className="left bottom btn_type_1"
                                       rel="nofollow">Read more</a></div>
                                <div className="figure banner-with-effects effect-sadie1 banner-width  with-button"
                                     style={{backgroundColor: '#ffffff'}}><img src="assets/images/shoes-banner.jpg"
                                                                               alt=""/>
                                    <div className="figcaption">
                                        <div className="banner-content left top"><b><span
                                            style={{color: '#444444', fontSize: '12px', letterSpacing: '1px'}}>COMMING SOON</span></b><br/>
                                            <span style={{color: '#000000', fontSize: '24px', paddingTop: '5px'}}>Men's shoes <br
                                                style={{color: '#000000', fontSize: 24 + 'px'}}/>
                  collection</span></div>
                                    </div>
                                    <a href="" style={{color: '#00aeef'}} className="left bottom btn_type_1"
                                       rel="nofollow">read more</a></div>
                            </div>
                            <div className="content-page">


                                <div className="category-product">
                                    <div className="navbar nav-menu">
                                        <div className="navbar-collapse">
                                            <div className="new_title">
                                                <h2>New Products</h2>
                                            </div>
                                            <ul className="nav navbar-nav">
                                                <li className="">
                                                    <a data-toggle="tab" href="#tab-3" className="active">
                                                        View All
                                                    </a>

                                                </li>
                                            </ul>
                                        </div>


                                    </div>
                                    <div className="product-bestseller">
                                        <div className="product-bestseller-content">
                                            <div className="product-bestseller-list">
                                                <div className="tab-container">

                                                    <div className="tab-panel active" id="tab-1">
                                                        <div className="category-products">
                                                            <ul className="products-grid">

                                                                {
                                                             ( this.props.products === undefined) ? (loader ) :
                                                                 //document.getElementById('display').style.display = "block";
                                                                 <ProductItem
                                                                    products={this.props.products.slice(16)} //props of product to child
                                                                    currency={this.props.currency} //props of currency to child
                                                                    dispalyProduct={this.dispalyProduct}
                                                                    addingToCart={this.addedToCart}
                                                                    cart={this.props.cart}
                                                                    buttonstate={this.state.buttonState}
                                                                    //productTitle={this.productTitle.bind(this)} //props for title to child
                                                                />


                                                                }


                                                            </ul>
                                                        </div>
                                                    </div>




                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="offer-banner"><a href="/category/children"><img alt="Banner" src="assets/images/children-banner.jpg"/></a></div>

                            <div className="content-page">


                                <div className="category-product">
                                    <div className="navbar nav-menu">
                                        <div className="navbar-collapse">
                                            <div className="new_title">
                                                <h2>Children</h2>
                                            </div>
                                            <ul className="nav navbar-nav">
                                                <li className="">
                                                    <a data-toggle="tab" href="/category/children" className="active">
                                                        View All
                                                    </a>

                                                </li>
                                            </ul>
                                        </div>


                                    </div>
                                    <div className="product-bestseller">
                                        <div className="product-bestseller-content">
                                            <div className="product-bestseller-list">
                                                <div className="tab-container">

                                                    <div className="tab-panel active" id="tab-1">
                                                        <div className="category-products">
                                                            <ul className="products-grid">

                                                                {
                                                                    ( this.props.children === undefined) ? (loader ) :
                                                                        //document.getElementById('display').style.display = "block";
                                                                        <ProductItem
                                                                            products={this.props.children.slice(7)} //props of product to child
                                                                            currency={this.props.currency} //props of currency to child
                                                                            dispalyProduct={this.dispalyProduct}
                                                                            addingToCart={this.addedToCart}
                                                                            cart={this.props.cart}
                                                                            buttonstate={this.state.buttonState}
                                                                            //productTitle={this.productTitle.bind(this)} //props for title to child
                                                                        />


                                                                }


                                                            </ul>
                                                        </div>
                                                    </div>




                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="content-page">


                                <div className="category-product">
                                    <div className="navbar nav-menu">
                                        <div className="navbar-collapse">
                                            <div className="new_title">
                                                <h2>Channel</h2>
                                            </div>
                                            <ul className="nav navbar-nav">
                                                <li className="">
                                                    <a data-toggle="tab" href="/category/channel" className="active">
                                                        View All
                                                    </a>

                                                </li>
                                            </ul>
                                        </div>


                                    </div>
                                    <div className="product-bestseller">
                                        <div className="product-bestseller-content">
                                            <div className="product-bestseller-list">
                                                <div className="tab-container">

                                                    <div className="tab-panel active" id="tab-1">
                                                        <div className="category-products">
                                                            <ul className="products-grid">

                                                                {
                                                                    ( this.props.channnel === undefined) ? (loader ) :
                                                                        //document.getElementById('display').style.display = "block";
                                                                        <ProductItem
                                                                            products={this.props.channnel} //props of product to child
                                                                            currency={this.props.currency} //props of currency to child
                                                                            dispalyProduct={this.dispalyProduct}
                                                                            addingToCart={this.addedToCart}
                                                                            cart={this.props.cart}
                                                                            buttonstate={this.state.buttonState}
                                                                            //productTitle={this.productTitle.bind(this)} //props for title to child
                                                                        />


                                                                }


                                                            </ul>
                                                        </div>
                                                    </div>




                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <aside className="col-left sidebar col-sm-3 col-xs-12 col-sm-pull-9">
                            <div>
                                {/*<div className="sideoffer-banner">

                                    <a href="" title="Side Offer Banner">

                                        <img className="hidden-xs" src="assets/images/custom-slide1.jpg"
                                             alt="Side Offer Banner"/></a>


                                </div>*/}
                            </div>
                          {/*  <div className="hot-deal">
                                <ul className="products-grid">
                                    <li className="right-space two-height item">
                                        <div className="item-inner">
                                            <div className="item-img">
                                                <div className="item-img-info">
                                                    <a href="" title="Retis lapen casen"
                                                        className="product-image">
                                                        <img src="assets/images/product12.jpg" alt="Retis lapen casen"/> </a>
                                                    <div className="hot-label hot-top-left">Hot Deal</div>
                                                    <div className="box-hover">
                                                        <ul className="add-to-links">
                                                            <li><a className="link-quickview"
                                                                   href="quick_view.html">.</a></li>
                                                            <li><a className="link-wishlist" href="wishlist.html">.</a>
                                                            </li>
                                                            <li><a className="link-compare" href="compare.html">.</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="box-timer">
                                                        <div className="countbox_1 timer-grid">.</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="info-inner">
                                                    <div className="item-title"><a href="product_detail.html"
                                                                                   title="Retis lapen casen"> Retis
                                                        lapen casen </a></div>
                                                    <div className="item-content">
                                                        <div className="rating">
                                                            <div className="ratings">
                                                                <div className="rating-box">
                                                                    <div className="rating"
                                                                         style={{width: 80 + '%'}}></div>
                                                                </div>
                                                                <p className="rating-links"><a href="">1 Review(s)</a>
                                                                    <span className="separator">|</span> <a href="">Add
                                                                        Review</a></p>
                                                            </div>
                                                        </div>
                                                        <div className="item-price">
                                                            <div className="price-box"><span className="regular-price"> <span
                                                                className="price">$125.00</span> </span></div>
                                                        </div>
                                                        <div className="action">
                                                            <button data-original-title="Add to Cart" title=""
                                                                    type="button" className="button btn-cart"><span>Add to Cart</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>*/}



                            {/*<div className="featured-add-box">
                                <div className="featured-add-inner"><a href=""> <img
                                    src="assets/images/bottom_banner.jpg" alt="f-img"/></a>
                                    <div className="banner-content">
                                        <div className="banner-text">Electronic's</div>
                                        <div className="banner-text1">20% off</div>
                                        <p>limited time offer</p>
                                        <a href="" className="view-bnt">Shop now</a></div>
                                </div>
                            </div>*/}

                            <div>
                                <div className="our-features-box">
                                    <div className="row">
                                        <div className="col-lg-12 space">
                                            <div className="feature-box first"><span className="fa fa-truck"></span>
                                                <div className="content">
                                                    <h3>Immediate Delivery</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 space">
                                            <div className="feature-box"><span className="fa fa-headphones"></span>
                                                <div className="content">
                                                    <h3>24 hrs Help Center</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 space">
                                            <div className="feature-box"><span className="fa fa-share"></span>
                                                <div className="content">
                                                    <h3>Easy RETURNS</h3>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </aside>


                    </div>
                </div>
            </section>

        </div>
       )

    }


}

function mapStateToProps(state) {

    return{

        products: state.product.product,
        best_seller: state.product.best_seller,
        children: state.product.children,
        channnel: state.product.channnel,
        featured_product: state.product.featured_product,
        product_id: state.product.id,
        currency: state.currency,
        auth: state.auth,
        cart: state.cart,
    }
}

function matchDispatchToProps(dispatch){
    return {

        onAllCategory(){
            dispatch(categoryActions.prepareCategory())
        },

        resetProduct(){
            dispatch(productActions.ResetProducts())
        },

        onfetchProductBySlug(slug){
            dispatch(productActions.productBySlug(slug));
        },

        onFetchProducts(){
            dispatch(productActions.prepareSomeProducts())
        },

        onFetchBestsellerProducts(id){
            dispatch(productActions.BestsellerProductCategory(id));
        },

        onFetchChildren(id){
            dispatch(productActions.ChildrenProductCategory(id));
        },

        onFetchChannnel(id){
            dispatch(productActions.ChannnelProductCategory(id));
        },

        onFetchFeaturedProducts(id){
            dispatch(productActions.FeatureProductCategory(id));
        },

        onAddToCart(id){
            dispatch(cartActions.prepareToAddToCart(id))
        }

    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);