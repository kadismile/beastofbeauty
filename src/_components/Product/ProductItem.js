import React from 'react'
import {Link} from 'react-router-dom'
import ProductImage from './ProductImage'
import ProductPrice from './ProductPrice'


const ProductItem = (props)=> {
    const {products, currency, selected} = props;

            //console.log(buttonstate)

        return (products.map((product, key)=> {

            return (

                <li className="item col-lg-3 col-md-4 col-sm-4 col-xs-6" key={key}>
                    <div className="item-inner" >


                        {/*<a onClick={(event) => props.dispalyProduct(product.slug)}>
                            <ProductImage images={product.images} dispalyProduct />
                        </a>*/}
                        <Link
                            to={{
                                pathname: '/product/' + product.slug
                            }}>
                            <ProductImage images={product.images} dispalyProduct />
                        </Link>


                        <div className="item-info">
                            <div className="info-inner">
                                <div className="item-title">

                                    <Link
                                        to={{
                                            pathname: '/product/' + product.slug
                                        }}>{product.name}
                                    </Link>

                                </div>
                                <div className="item-content">

                                    <ProductPrice
                                        price={product.price}
                                        sale_price={product.sale_price}
                                        currency={currency}
                                        selected={selected}
                                    />




                                    <div className="action">
                                        {/*<button className="button btn-cart"
                                                type="button" title=""
                                                id="addToCart"
                                                data-original-title="Add to Cart"
                                                onClick={() => props.addingToCart(product.id)}
                                        >
                                            <span>Buy Now</span>
                                        </button>*/}

                                        <Link
                                            to={{pathname: '/product/' + product.slug}} className="button btn-cart">
                                            Buy Now
                                        </Link>

                                    </div>


                                    <div className="action">

                                    {/*{ ( added === true ? <button className="button btn-cart" id={"addToCart"+product.id}><span> Adding to cart ...</span></button> : '')}*/}

                                    </div>




                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            )
        }))


};

export default ProductItem