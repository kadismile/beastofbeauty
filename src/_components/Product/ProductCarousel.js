import React from 'react'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css';
import ProductPrice from '../Product/ProductPrice'
const ProductCarousel = (props)=>{

    const {products, currency, dispalyProduct, selected, addToCart} = props;
    /*const options = {
        items: 3,
        navText: ['<a class="flex-next"></a>', '<a class="flex-prev"></a>'],
        nav: true,
        loop: false,
        rewind: true,
        autoplay: true,
        navigation: !0,
        slideSpeed: props.speed,
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
    };*/


    console.log(addToCart)

    return (
        <div id={props.id} className="product-flexslider hidden-buttons">
           {/* <div className="slider-items slider-width-col4 products-grid block-content">

                <OwlCarousel options={options}>

                        {_.map(props.products, (data,key) => {
                            let sources = (data.images)[0];
                        return (
                                <div className="item" key={key}>
                        <div className="item-inner">
                            <div className="item-img">
                                <div className="item-img-info">
                                    <a className="product-image" title="Retis lapen casen"
                                       onClick={(event) => props.dispalyProduct(data.slug)}>
                                        <img src={sources.src} className="img-responsive" alt={data.name} />
                                    </a>


                                    <Link
                                        className="product-image" title={data.name}
                                        to={{
                                            pathname: '/product/' + data.slug
                                        }}><img src={sources.src} className="img-responsive" alt={data.name} />
                                    </Link>

                                    <div className="new-label new-top-left">new</div>

                                </div>
                            </div>

                            <div className="item-info">
                                <div className="info-inner">
                                    <div className="item-title">
                                        <a
                                        title={data.name}
                                        onClick={(event) => props.dispalyProduct(data.slug)}>
                                            {data.name}
                                        </a>

                                        <Link
                                            title={data.name}
                                            to={{
                                                pathname: '/product/' + data.slug
                                            }}>{data.name}
                                        </Link>
                                    </div>

                                    <div className="item-content">


                                        <div className="item-price">
                                            <div className="price-box"><span
                                                className="regular-price"> <span
                                                className="price">$88.00</span> </span>
                                            </div>
                                        </div>

                                        <ProductPrice
                                            price={data.price}
                                            sale_price={data.sale_price}
                                            currency={props.currency}
                                            selected={props.selected}
                                        />


                                        <div className="action">

                                            <button className="button btn-cart"
                                                    type="button" title=""
                                                    data-original-title="Add to Cart"
                                                    onClick={() => this.props.addingToCart(data.id)}
                                            >
                                                <span>Add to Cart</span>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                                )
                        })
                    }
                </OwlCarousel>


            </div>*/}
        </div>
    )
}

export default ProductCarousel