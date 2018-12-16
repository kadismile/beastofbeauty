import React from 'react'
import {Link} from 'react-router-dom'
const Cart = (props)=>{

    const {cart} = props;
    //console.log(cart.addedIds)
    let prices = [];
    cart.shoppingCartProducts.map((data)=>{
        return prices.push(Number( cart.quantityById[data.id] * data.price)); //
    });
    let total = prices.reduce((a,b) => a + b, 0);

    //FORMATING THE PRICE*!/
    let theCurency = props.currency.currency;
    let indexArr = theCurency[props.currency.selected];  // [0] get the value(s) of an index of an array
    let rate = (indexArr.rate);
    let symbol = (indexArr.symbol);

    //console.log(cart.quantityById);



    return (



        <div className="mini-cart">

            <div className="basket visible-xs-block">
                <Link to={{pathname: "/shopping_cart"}}>
                    <span className="price" style={{backgroundColor: '#e65353'}}>{cart.shoppingCartProducts.length}</span>
                </Link>
            </div>


            <div data-toggle="dropdown" data-hover="dropdown" className="basket dropdown-toggle hidden-xs">
                <a href="shopping_cart.html"><span className="price hidden-xs">Shopping Cart</span>
                    <span className="cart_count hidden-xs">
                        <b>{cart.shoppingCartProducts.length} Items/ {symbol} {formatPrice(total  * rate)} {/*{roundUp((total * rate), 1)}*/}</b>
                    </span>
                </a>
            </div>


            <div>
                <div className="top-cart-content hidden-xs">

                    <ul className="mini-products-list" id="cart-sidebar">


                        {

                            cart.shoppingCartProducts.map((data, index) => {
                                let images = data.images;
                                let newImages = (images)[0];
                                return (
                                    <li className="item" key={index}>
                                        <div className="item-inner">
                                            {/* <a href={"/product/"+data.slug} className="product-image"
                                               title={data.name}>
                                                <img alt={data.name} src={newImages.src}/>
                                          </a>*/}
                                            <Link to={{pathname: '/product/'+data.slug+"/"}}
                                                  className="product-image"
                                                  title={data.name}>
                                                <img alt={data.name} src={newImages.src}/>
                                            </Link>
                                            <div className="product-details">
                                                <div className="access">
                                                    <a className="btn-remove1"
                                                       onClick={() => props.removeFromCart(data.id, index)}
                                                       title="Remove This Item" >Remove
                                                    </a>

                                                    <a className="btn-edit" title="Edit item" href="">
                                                        <i className="icon-pencil"></i>
                                                        <span className="hidden">Edit item</span>
                                                    </a>
                                                </div>

                                                <p className="product-name">
                                                    {/* <Link to={{pathname: '/product/' + data.slug}}>
                                                        <b>{data.name}</b>
                                                    </Link>*/}
                                                    {/*<a href={"/product/"+data.slug}><b>{data.name}</b></a>*/}
                                                    <Link to={"/product/"+data.slug}>{data.name}</Link>
                                                </p>
                                                {cart.quantityById[data.id]} x {symbol} { formatPrice((Number(data.price) * rate))/*roundUp(formatPrice(Number(data.price) * rate), 1)*/}





                                            </div>
                                        </div>
                                    </li>



                                )


                            })

                        }


                    </ul>

                    <div className="actions">
                        <Link  to={{pathname: '/checkout/'}}>
                            <button className="btn-checkout" type="button">
                                <span>Check Out</span>
                            </button>
                        </Link>
                        <Link to={{pathname: "/shopping_cart"}} className="view-cart" ><span>View Cart</span></Link>
                    </div>
                </div>
            </div>
        </div>


    )
};
/*function formatPrice (val) {
    if(val !== ""){
        return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        /!* return  Math.round(val)*!/
    }else  {
        return '--'
    }
}*/
function roundUp(num, precision) {
    precision = Math.pow(10, precision)
    return Math.ceil(num * precision) / precision
}

function formatPrice (val) {
    if(val !== ""){
        return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        /* return  Math.round(val)*/
    }else  {
        return '--'
    }
}
export default Cart