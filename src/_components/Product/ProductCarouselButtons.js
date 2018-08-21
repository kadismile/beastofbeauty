import React from 'react'
import _ from 'lodash'
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css';
import ProductPrice from '../Product/ProductPrice'
const ProductCarouselButtons = (props)=>{

    const options = {
        items: 3,
        navText: ['<a class="flex-next"></a>', '<a class="flex-prev"></a>'],
        nav: true,
        loop: false,
        rewind: true,
        autoplay: true,
        navigation: !0,
        slideSpeed: 500,
        pagination: !1,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:props.itemnumber,
                nav:true,
                loop:false
            }
        }
    };

    return (
        <div id="new-arrivals-slider" className="product-flexslider hidden-buttons">
            <div className="home-block-inner"></div>
            <div className="slider-items slider-width-col4 products-grid block-content">
                <OwlCarousel options={options}>
                    {_.map(props.products, (data,key) => {
                        let sources = _.values(data.images)[0];
                       return(<div className="item">
                                   <div className="item-inner">
                                       <div className="item-img">
                                           <div className="item-img-info">
                                               <a className="product-image"
                                                  title="Retis lapen casen"
                                                  href="product_detail.html">
                                                   <img alt="Retis lapen casen"
                                                        src="assets/images/product10.jpg"/> </a>
                                               <div className="new-label new-top-left">new</div>
                                               <div className="box-hover">
                                                   <ul className="add-to-links">
                                                       <li><a className="link-quickview"
                                                              href="quick_view.html"></a></li>
                                                       <li><a className="link-wishlist"
                                                              href="wishlist.html"></a></li>
                                                       <li><a className="link-compare"
                                                              href="compare.html"></a></li>
                                                   </ul>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="item-info">
                                           <div className="info-inner">
                                               <div className="item-title"><a title="Retis lapen casen"
                                                                              href="product_detail.html">
                                                   Retis lapen casen </a></div>
                                               <div className="rating">
                                                   <div className="ratings">
                                                       <div className="rating-box">
                                                           <div style={{width: 80 + '%'}}
                                                                className="rating"></div>
                                                       </div>
                                                       <p className="rating-links"><a href="">1
                                                           Review(s)</a> <span
                                                           className="separator">|</span> <a href="">Add
                                                           Review</a></p>
                                                   </div>
                                               </div>
                                               <div className="item-content">
                                                   <div className="item-price">
                                                       <div className="price-box"><span
                                                           className="regular-price"> <span
                                                           className="price">$245.00</span> </span>
                                                       </div>
                                                   </div>
                                                   <div className="action">
                                                       <button className="button btn-cart"
                                                               type="button" title=""
                                                               data-original-title="Add to Cart"><span>Add to Cart</span>
                                                       </button>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>)

                        })
                    }
                </OwlCarousel>

            </div>
        </div>
    )
}

export default ProductCarouselButtons