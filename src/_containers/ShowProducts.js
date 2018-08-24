import React, { Component } from 'react';
import {connect} from 'react-redux'
import _ from 'lodash'
import $ from 'jquery'
import striptags from 'striptags';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {productActions} from '../_actions/productActions'
import {cartActions} from "../_actions/cartActions";
const loader = <div className="data-loading"> <i className="fa fa-refresh fa-spin"></i> <div style={{marginBottom: '550px'}}></div></div>

class ShowProducts extends Component {

    constructor(props){

        super(props);
        this.state = {
            addTOCart: false,
        };
    }


    addedToCart=(id)=>{
        this.setState({addTOCart: true});
        $("#addToCart").show();
        $("#cartButton").hide();
        $("#itemAdded").show();

        setTimeout(() => {
            $("#addToCart").hide();
        }, 1900);

        this.props.onAddToCart(id);



    };



    componentDidMount(){
        window.scroll(0, 0); //scroll to the top
        setTimeout(() => {
            this.props.onfetchProductBySlug(this.props.match.params.product_name); //fetch product by slug
        }, 1500);
    }

    changeQuantity =(value, productId)=>{
        this.props.onChangeQuantity(Number(value), productId);
    };

    addButton = (id, value) => {
        this.changeQuantity(value+1,id)
    };

    minusButton = (id, value) => {
        this.changeQuantity(value-1,id)
    };

    componentWillReceiveProps(nextProps) {
        let slug;
        if(nextProps.match.url !== this.props.match.url  ) {
            window.scroll(0, 0);
            slug = nextProps.match.params.product_name;
            setTimeout(() => {
                this.props.onfetchProductBySlug(slug)
            }, 1000);
        }

    }



    render() {
        console.log(this.props.match)
        let product, myimages;
        _.map(this.props.products, (data) =>{
            return product = data;
        });
        const image = [
            _.map(product.images, (data) =>{
                return {original: data.src}
            })
        ];
            _.map(image, (data) =>{
                return myimages = data
            });

        const {cart} = this.props;
        //console.log(this.state.itemAdded);
        return (
            (this.props.match.params.product_name !== this.props.slugTerm) ? (loader ) :


                <section className="main-container col1-layout">
                    <div className="container">

                            <div className="row">

                                <div className="breadcrumbs">
                                    <ul>
                                        <li className="home"> <a href="index.html" title="Go to Home Page">Home</a> <span>/</span> </li>
                                        <li className="category1599"> <a href="grid.html" title="">Women</a> <span>/ </span> </li>
                                        <li className="category1600"> <a href="grid.html" title="">Styliest Bag</a> <span>/</span> </li>
                                        <li className="category1601"> <strong>Clutch Handbags</strong> </li>
                                    </ul>
                                </div>

                                <div className=" col-md-12 col-sm-12 col-xs-12 product-view">
                                    <div className="product-essential">

                                        <div className="product-img-box col-sm-4 wow bounceInRight animated">
                                            <div className="new-label new-top-left"> New </div>

                                            <ImageGallery
                                                items={myimages}
                                                originalClass={"cloud-zoom"}
                                                showThumbnails={false}
                                                autoPlay={true}
                                                showFullscreenButton={false}
                                            />

                                            <div className="clear"></div>
                                        </div>
                                        <div className="product-shop col-sm-8 wow bounceInLeft animated">

                                            <div className="product-name">
                                                <h1 style={{fontSize: '20px'}}>{product.name}</h1>
                                                <div className="price-block">
                                                    <div className="price-box">
                                                        <p className="old-price"> <span className="price-label">Regular Price:</span> <span className="price"> $315.99 </span> </p>
                                                        <p className="special-price"> <span className="price-label">Special Price</span> <span className="price"> ${formatNumber(product.regular_price) } </span> </p>

                                                    </div>

                                                </div>
                                            </div>

                                            <p className="availability in-stock">Availability:  {(product.instock) ? <span style={{color: 'red'}}>Not In stock</span> : <span>In stock</span> }</p>
                                            <div className="add-to-box">
                                                <div className="add-to-cart">
                                                    {(cart.quantityById[product.id] === undefined ? '': <label>Quantity:</label> ) }
                                                    <div className="pull-left">
                                                        <div className="custom pull-left">

                                                            {

                                                                (cart.quantityById[product.id] === undefined ? <button className="button btn-cart" id="cartButton" onClick={() => {this.addedToCart(product.id)} }  type="button"><span> Add to Cart</span></button> :

                                                                        <div>

                                                                            <button disabled={(cart.quantityById[product.id] === 1  ? true : false)}
                                                                                    className="reduced items-count"
                                                                                    onClick={()=>this.minusButton(product.id, cart.quantityById[product.id])}
                                                                                    type="button"><i className="fa fa-minus">&nbsp;</i>
                                                                            </button>

                                                                            <input
                                                                                maxLength="12" className="input-text qty"
                                                                                min="1"
                                                                                max="10"
                                                                                onChange={(event) => this.changeQuantity((event.target.value), product.id)}
                                                                                title="Qty"
                                                                                type="number"
                                                                                size="10"
                                                                                value={cart.quantityById[product.id]}
                                                                                name="cart[15945][qty]"
                                                                            />


                                                                            <button  disabled={(cart.quantityById[product.id] === 10  ? true : false)}
                                                                                     className="increase items-count"
                                                                                     onClick={()=>this.addButton(product.id, cart.quantityById[product.id])}
                                                                                     type="button"><i className="fa fa-plus">&nbsp;</i>
                                                                            </button>
                                                                        </div>
                                                                )


                                                            }
                                                        </div>
                                                    </div>

                                                    {/*<label id="addToCart" style={{fontSize: '11px', marginLeft: '20px', marginTop: '10px'}}> Adding to cart ...</label>*/}
                                                    { ( this.state.addTOCart === true ? <button className="button btn-cart" id="addToCart"><span> Adding to cart ...</span></button> : '')}
                                                </div>
                                            </div>


                                            <div className="short-description">
                                                <h2>Quick Overview</h2>
                                                <p>{striptags(product.short_description)}</p>
                                            </div>








                                                <div className="social">
                                                <ul>
                                                    <li className="fb"><a href="">.</a></li>
                                                    <li className="tw"><a href="">.</a></li>
                                                    <li className="googleplus"><a href="">.</a></li>
                                                    <li className="rss"><a href="">.</a></li>
                                                    <li className="pintrest"><a href="">.</a></li>
                                                    <li className="linkedin"><a href="">.</a></li>
                                                    <li className="youtube"><a href="">.</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="product-collateral">
                                        <div className="col-sm-12 wow bounceInUp animated">
                                            <ul id="product-detail-tab" className="nav nav-tabs product-tabs">
                                                <li className="active"> <a href="#product_tabs_description" data-toggle="tab"> Product Description </a> </li>
                                            </ul>
                                            <div id="productTabContent" className="tab-content">
                                                <div className="tab-pane fade in active" id="product_tabs_description">
                                                    <div className="std">
                                                        <p>{striptags(product.description)}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* <div className="col-sm-12">
                                            <div className="box-additional">
                                                <div className="related-pro wow bounceInUp animated">
                                                    <div className="slider-items-products">
                                                        <div className="new_title center">
                                                            <h2>Related Products</h2>
                                                        </div>
                                                        <div id="related-products-slider" className="product-flexslider hidden-buttons">
                                                            <div className="slider-items slider-width-col4">


                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="sale-label sale-top-right">Sale</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html"> <img src="products-images/product3.jpg" className="img-responsive" alt="a" /> </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a href="#l" title=" Sample Product"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box">
                                                                                        <p className="special-price"> <span className="price"> $45.00 </span> </p>
                                                                                        <p className="old-price"> <span className="price-sep">-</span> <span className="price"> $50.00 </span> </p>
                                                                                    </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>



                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="new-label new-top-right">New</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html"> <img src="products-images/product2.jpg" className="img-responsive" alt="a" /> </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a href="#l" title=" Sample Product"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box"> <span className="regular-price"> <span className="price">$422.00</span> </span> </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>



                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="sale-label sale-top-right">Sale</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html"> <img alt="a" className="img-responsive" src="products-images/product4.jpg"/> </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a title=" Sample Product" href="product_detail.html"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box"> <span className="regular-price"> <span className="price">$50.00</span> </span> </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="sale-label sale-top-right">Sale</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html"> <img alt="a" className="img-responsive" src="products-images/product1.jpg"/> </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a title=" Sample Product" href="product_detail.html"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box">
                                                                                        <p className="special-price"> <span className="price"> $45.00 </span> </p>
                                                                                        <p className="old-price"> <span className="price-sep">-</span> <span className="price"> $50.00 </span> </p>
                                                                                    </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="sale-label sale-top-right">Sale</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html">
                                                                            <img alt="a" className="img-responsive"  src={require('../../assets/images/products/product6.jpg')} />
                                                                        </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a title=" Sample Product" href="product_detail.html"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box">
                                                                                        <p className="special-price"> <span className="price"> $45.00 </span> </p>
                                                                                        <p className="old-price"> <span className="price-sep">-</span> <span className="price"> $50.00 </span> </p>
                                                                                    </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="new-label new-top-right">New</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html"> <img alt="a" className="img-responsive" src="products-images/product7.jpg"/> </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a title=" Sample Product" href="product_detail.html"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box"> <span className="regular-price"> <span className="price">$422.00</span> </span> </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="sale-label sale-top-right">Sale</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html"> <img alt="a" className="img-responsive" src="products-images/product8.jpg"/> </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a title=" Sample Product" href="product_detail.html"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box"> <span className="regular-price"> <span className="price">$50.00</span> </span> </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="sale-label sale-top-right">Sale</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html"> <img alt="a" className="img-responsive" src="products-images/product9.jpg"/> </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a title=" Sample Product" href="product_detail.html"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box">
                                                                                        <p className="special-price"> <span className="price"> $45.00 </span> </p>
                                                                                        <p className="old-price"> <span className="price-sep">-</span> <span className="price"> $50.00 </span> </p>
                                                                                    </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="upsell-pro wow bounceInUp animated">
                                                    <div className="slider-items-products">
                                                        <div className="new_title center">
                                                            <h2>Upsell Products</h2>
                                                        </div>
                                                        <div id="upsell-products-slider" className="product-flexslider hidden-buttons">
                                                            <div className="slider-items slider-width-col4">


                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="sale-label sale-top-right">Sale</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html"> <img src="products-images/product13.jpg" className="img-responsive" alt="a" /> </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a href="#l" title=" Sample Product"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box">
                                                                                        <p className="special-price"> <span className="price"> $45.00 </span> </p>
                                                                                        <p className="old-price"> <span className="price-sep">-</span> <span className="price"> $50.00 </span> </p>
                                                                                    </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="new-label new-top-right">New</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html"> <img src="products-images/product14.jpg" className="img-responsive" alt="a" /> </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a href="#l" title=" Sample Product"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box"> <span className="regular-price"> <span className="price">$422.00</span> </span> </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="sale-label sale-top-right">Sale</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html">
                                                                            <img alt="a" className="img-responsive"  src={require('../../assets/images/products/product3.jpg')} />
                                                                        </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a title=" Sample Product" href="product_detail.html"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box"> <span className="regular-price"> <span className="price">$50.00</span> </span> </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="sale-label sale-top-right">Sale</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html"> <img alt="a" className="img-responsive" src="products-images/product16.jpg"/> </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a title=" Sample Product" href="product_detail.html"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box">
                                                                                        <p className="special-price"> <span className="price"> $45.00 </span> </p>
                                                                                        <p className="old-price"> <span className="price-sep">-</span> <span className="price"> $50.00 </span> </p>
                                                                                    </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="sale-label sale-top-right">Sale</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html"> <img alt="a" className="img-responsive" src="products-images/product17.jpg"/> </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a title=" Sample Product" href="product_detail.html"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box">
                                                                                        <p className="special-price"> <span className="price"> $45.00 </span> </p>
                                                                                        <p className="old-price"> <span className="price-sep">-</span> <span className="price"> $50.00 </span> </p>
                                                                                    </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="new-label new-top-right">New</div>
                                                                        <div className="product-image-area">
                                                                        <a className="product-image" title="Sample Product" href="product_detail.html">
                                                                            <img alt="a" className="img-responsive"  src={require('../../assets/images/products/product4.jpg')} />
                                                                        </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a title=" Sample Product" href="product_detail.html"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box"> <span className="regular-price"> <span className="price">$422.00</span> </span> </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="sale-label sale-top-right">Sale</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html">
                                                                            <img alt="a" className="img-responsive"  src={require('../../assets/images/products/product5.jpg')} />
                                                                        </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a title=" Sample Product" href="product_detail.html"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box"> <span className="regular-price"> <span className="price">$50.00</span> </span> </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="item">
                                                                    <div className="col-item">
                                                                        <div className="sale-label sale-top-right">Sale</div>
                                                                        <div className="product-image-area"> <a className="product-image" title="Sample Product" href="product_detail.html"> <img alt="a" className="img-responsive" src="products-images/product20.jpg"/> </a>
                                                                            <div className="hover_fly"> <a className="exclusive ajax_add_to_cart_button" href="" title="Add to cart">
                                                                                <div><i className="icon-shopping-cart"></i><span>Add to cart</span></div>
                                                                            </a> <a className="quick-view" href="quick_view.html">
                                                                                <div><i className="icon-eye-open"></i><span>Quick view</span></div>
                                                                            </a> <a className="add_to_compare" href="compare.html">
                                                                                <div><i className="icon-random"></i><span>Add to compare</span></div>
                                                                            </a> <a className="addToWishlist wishlistProd_5" href="wishlist.html" >
                                                                                <div><i className="icon-heart"></i><span>Add to Wishlist</span></div>
                                                                            </a> </div>
                                                                        </div>
                                                                        <div className="info">
                                                                            <div className="info-inner">
                                                                                <div className="item-title"> <a title=" Sample Product" href="product_detail.html"> Sample Product </a> </div>

                                                                                <div className="item-content">
                                                                                    <div className="ratings">
                                                                                        <div className="rating-box">
                                                                                            <div className="rating"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="price-box">
                                                                                        <p className="special-price"> <span className="price"> $45.00 </span> </p>
                                                                                        <p className="old-price"> <span className="price-sep">-</span> <span className="price"> $50.00 </span> </p>
                                                                                    </div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="clearfix"> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>*/}

                                    </div>
                                </div>
                            </div>
                    </div>
                </section>
        );
    }


};


function mapStateToProps(state) {
    return{
        category: state.categories.cats,
        slugTerm: state.product.slugTerm,
        products: state.product.product,
        selected: state.currency.selected,
        searchTerm: state.product.searchTerm,
        currency: state.currency,
        cart: state.cart,
    }
}

function matchDispatchToProps(dispatch){
    return {


        resetProduct(){
            dispatch(productActions.ResetProducts())
        },
        onfetchProductBySlug(slug){
            dispatch(productActions.productBySlug(slug));
        },

        onChangeQuantity(value, productId){
            dispatch(cartActions.changeQuantity(value, productId))
        },

        onAddToCart(id){
            dispatch(cartActions.prepareToAddToCart(id))
        }
    }
}

function formatNumber (val) {
    if(_.isString(val)){
        return val
    }else if(_.isUndefined(val)) {
        return ''
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(ShowProducts);