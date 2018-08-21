import React, { Component } from 'react';
import $ from 'jquery'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PaystackButton from 'react-paystack';
import {categoryActions} from '../_actions/categoryActions'
import {cartActions} from "../_actions/cartActions";
const loader = <div className="data-loading"> <i className="fa fa-refresh fa-spin"></i> </div>

class ShoppingCart extends Component {
    constructor (props) {
        super();
        this.state = {
            loading: true,
            //quantity: 0,
        };
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1200); // simulates an async action, and hides the spinner
        $("#minusButton").prop( "disabled", true );
    }

    callback = (response) => {
        console.log(response); // card charged successfully, get reference here
        this.props.history.push({
            pathname: '/category/hats/'
        });
    };

    close = () => {
        console.log("Payment closed");
    };

    changeQuantity =(value, productId)=>{
        this.props.onChangeQuantity(Number(value), productId);
        this.setState({quantity:Number(value)})
    };

    removeFromCart=(productId, index)=>{
        //alert(productId);
        this.props.onremoveFromCart(productId, index);
    };

    clearCart=()=>{
        this.props.onClearCart()
    };

    addButton = (id, value) => {

        this.changeQuantity(value+1,id)

    };

    minusButton = (id, value) => {
        this.changeQuantity(value-1,id)
    };

    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;

    }
    render(){
        const {cart, currency} = this.props;

        let prices = [];
        this.props.cart.shoppingCartProducts.map((data)=>{
           return prices.push(Number( cart.quantityById[data.id] * data.price)); //
        });
        let total = prices.reduce((a,b) => a + b, 0);

        /*FORMATING THE PRICE*/
        let theCurency = currency.currency;
        let indexArr = theCurency[currency.selected];  // [0] get the value(s) of an index of an array
        let rate = (indexArr.rate);
        let symbol = (indexArr.symbol);

        const { loading } = this.state;
        //console.log(this.state.quantity);
        return(
            loading  ? loader :
                <section className="main-container col1-layout">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-xs-12">
                                <article className="col-main">
                                    <div className="cart">
                                        <div className="page-title">
                                            <h2>Shopping Cart</h2>
                                        </div>


                                        <div className="table-responsive hidden-xs">

                                            <input type="hidden" value="Vwww7itR3zQFe86m" name="form_key"/>
                                            <fieldset>
                                                <table className="data-table cart-table" id="shopping-cart-table">
                                                    <colgroup>
                                                        <col width="1"/>
                                                        <col/>
                                                        <col width="1"/>
                                                        <col width="1"/>
                                                        <col width="1"/>
                                                        <col width="1"/>
                                                        <col width="1"/>
                                                    </colgroup>
                                                    <thead>
                                                    <tr className="first last">
                                                        <th rowSpan="1">&nbsp;</th>
                                                        <th rowSpan="1"><span className="nobr">Product Name</span></th>
                                                        <th rowSpan="1"></th>
                                                        <th colSpan="1" className="a-center hidden-xs"><span className="nobr">Unit Price</span></th>
                                                        <th className="a-center" rowSpan="1">Qty</th>
                                                        <th colSpan="1" className="a-center hidden-xs">Subtotal</th>
                                                        <th className="a-center" rowSpan="1">&nbsp;</th>
                                                    </tr>
                                                    </thead>

                                                    <tbody>

                                                    {
                                                        this.props.cart.shoppingCartProducts.map((data, index) => {
                                                            let newImages = (data.images)[0];
                                                            return(
                                                                <tr className="first odd" key={index}>

                                                                    <td className="image">
                                                                        <Link to={{ pathname: '/product/'+data.slug}}
                                                                              className="product-image"
                                                                              title={data.name}
                                                                        > <img width="75" alt="Sample Product" src={newImages.src}/>
                                                                        </Link>
                                                                    </td>

                                                                    <td>
                                                                        <h2 className="product-name">
                                                                            <Link to={{ pathname: '/product/'+data.slug}}>
                                                                                {data.name}
                                                                            </Link>
                                                                        </h2>




                                                                    </td>
                                                                    <td className="a-center"><a
                                                                        title="Edit item parameters"
                                                                        className="edit-bnt"
                                                                        href="/">.</a>
                                                                    </td>
                                                                    <td className="a-right hidden-xs">
                                                                        <span className="cart-price">
                                                                            <span className="price">{symbol}{ Number(data.price * rate)}</span>
                                                                        </span>
                                                                    </td>

                                                                    <td className="a-center movewishlist">

                                                                        <div className="add-to-box hidden-xs">
                                                                            <div className="add-to-cart">

                                                                                <div className="pull-left">
                                                                                    <div className="custom">

                                                                                    <button id="minusButton"
                                                                                            disabled={(cart.quantityById[data.id] === 1  ? true : false)}
                                                                                            className="reduced items-count"
                                                                                            onClick={()=>this.minusButton(data.id, cart.quantityById[data.id])}
                                                                                            type="button"><i className="fa fa-minus">&nbsp;</i>
                                                                                    </button>

                                                                                    <input
                                                                                        maxLength="12" className="input-text qty"
                                                                                        min="1"
                                                                                        max="5"
                                                                                        onChange={(event) => this.changeQuantity((event.target.value), data.id)}
                                                                                        title="Qty"
                                                                                        type="number"
                                                                                        size="10"
                                                                                        value={cart.quantityById[data.id]}
                                                                                        name="cart[15945][qty]"
                                                                                    />


                                                                                    <button  disabled={(cart.quantityById[data.id] === 12  ? true : false)}
                                                                                             className="increase items-count"
                                                                                             onClick={()=>this.addButton(data.id, cart.quantityById[data.id])}
                                                                                             type="button"><i className="fa fa-plus">&nbsp;</i>
                                                                                    </button>




                                                                                    </div>
                                                                                </div>


                                                                            </div>
                                                                        </div>


                                                                    </td>

                                                                    <td className="a-right movewishlist hidden-xs"><span
                                                                        className="cart-price"> <span className="price">{symbol} { roundUp (Number(data.price * rate * cart.quantityById[data.id]), 1) }</span> </span>
                                                                    </td>
                                                                    <td className="a-center last hidden-xs">
                                                                        <a className="button remove-item"
                                                                            onClick={() => this.removeFromCart(data.id, index)}
                                                                            title="Remove item"><span><span>Remove item</span></span><i style={{fontSize: '12px', color:'red'}}>remove</i>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            )

                                                        })
                                                    }


                                                    </tbody>
                                                </table>
                                            </fieldset>

                                        </div>





                                        {/* Mobile View*/}

                                            <aside className="col-left sidebar visible-xs-block">

                                                <div role="complementary" className="widget_wrapper13" id="secondary">
                                                    <div className="popular-posts widget widget__sidebar wow bounceInUp animated" id="recent-posts-4">
                                                        <div className="widget-content">
                                                            <ul className="posts-list unstyled clearfix">
                                                                {
                                                                    this.props.cart.shoppingCartProducts.map((data, index) => {
                                                                        let newImages = (data.images)[0];
                                                                        return (

                                                                    <li>
                                                                        <figure className="featured-thumb pull-left" style={{marginRight: '8px'}}>
                                                                            <Link to={{ pathname: '/product/'+data.slug}}
                                                                                  className="product-image"
                                                                                  title={data.name}
                                                                            > <img width="75" alt="Sample Product" src={newImages.src}/>
                                                                            </Link>
                                                                        </figure>

                                                                             <h2 className="product-name" style={{marginBottom:'0px'}}>
                                                                                <Link to={{ pathname: '/product/'+data.slug}}>
                                                                                    {data.name}
                                                                                </Link>

                                                                            </h2>
                                                                        <span
                                                                            className="cart-price">
                                                                            <span className="price"> <b>{symbol} { roundUp (Number(data.price * rate * cart.quantityById[data.id]), 1) }</b></span>
                                                                        </span>

                                                                        <a className="pull-right remove-item"
                                                                           onClick={() => this.removeFromCart(data.id, index)}
                                                                           title="Remove item"><i style={{fontSize: '12px', color:'red'}}>remove</i>
                                                                        </a>
                                                                        <div className="add-to-box ">
                                                                            <div className="add-to-cart">

                                                                                <div className="pull-left">
                                                                                    <div className="custom">

                                                                                        <button id="minusButton"
                                                                                                disabled={(cart.quantityById[data.id] === 1  ? true : false)}
                                                                                                className="reduced items-count"
                                                                                                onClick={()=>this.minusButton(data.id, cart.quantityById[data.id])}
                                                                                                type="button"><i className="fa fa-minus">&nbsp;</i>
                                                                                        </button>

                                                                                        <input
                                                                                            maxLength="12" className="input-text qty"
                                                                                            min="1"
                                                                                            max="5"
                                                                                            onChange={(event) => this.changeQuantity((event.target.value), data.id)}
                                                                                            title="Qty"
                                                                                            type="number"
                                                                                            size="10"
                                                                                            value={cart.quantityById[data.id]}
                                                                                            name="cart[15945][qty]"
                                                                                        />


                                                                                        <button  disabled={(cart.quantityById[data.id] === 12  ? true : false)}
                                                                                                 className="increase items-count"
                                                                                                 onClick={()=>this.addButton(data.id, cart.quantityById[data.id])}
                                                                                                 type="button"><i className="fa fa-plus">&nbsp;</i>
                                                                                        </button>




                                                                                    </div>
                                                                                </div>


                                                                            </div>
                                                                        </div>
                                                                        <br/>
                                                                        <br/>
                                                                        <hr/>


                                                                    </li>
                                                                        )


                                                                    })}

                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>
                                            </aside>













                                        <div className="cart-collaterals row">
                                            <div className="col-sm-4">
                                                <div className="shipping">
                                                    <h3>Estimate Shipping and Tax</h3>
                                                    <div className="shipping-form">
                                                        <form id="shipping-zip-form" method="post" action="#estimatePost/">
                                                            <p>Enter your destination to get a shipping estimate.</p>
                                                            <ul className="form-list">
                                                                <li>
                                                                    <label className="required" htmlFor="country"><em>*</em>State</label>
                                                                    <div className="input-box">
                                                                        <select title="Country" className="validate-select" id="country" name="country_id">
                                                                            <option value=""> </option>
                                                                            <option value="Abj">Abuja</option>
                                                                            <option value="lag">Lagos</option>
                                                                            <option value="Ph">Porthacourt</option>
                                                                            <option value="Kd">Kaduna</option>

                                                                        </select>
                                                                    </div>
                                                                </li>

                                                                <li>
                                                                    <label htmlFor="postcode">Zip/Postal Code</label>
                                                                    <div className="input-box">
                                                                        <input type="text" value="" name="estimate_postcode" id="postcode" className="input-text validate-postcode"/>
                                                                    </div>
                                                                </li>
                                                            </ul>


                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="discount">
                                                    <h3>Discount Codes</h3>
                                                    <form method="post" action="#couponPost/" id="discount-coupon-form">
                                                        <label htmlFor="coupon_code">Enter your coupon code if you have one.</label>
                                                        <input type="hidden" value="0" id="remove-coupone" name="remove"/>
                                                        <input type="text" value="" name="coupon_code" id="coupon_code" className="input-text fullwidth"/>
                                                        <button value="Apply Coupon"  className="button coupon " title="Apply Coupon" type="button"><span>Apply Coupon</span></button>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="totals col-sm-4">
                                                <h3>Shopping Cart Total</h3>
                                                <div className="inner">
                                                    <table className="table shopping-cart-table-total" id="shopping-cart-totals-table">
                                                        <colgroup>
                                                            <col/><col width="1"/>
                                                        </colgroup>
                                                        <tfoot>
                                                        <tr>
                                                            <td colSpan="1" className="a-left" ><strong>Grand Total</strong></td>
                                                            <td className="a-right" ><strong><span className="price">{symbol}{roundUp((total * rate), 1)}</span></strong></td>
                                                        </tr>
                                                        </tfoot>
                                                        <tbody>
                                                        <tr>
                                                            <td colSpan="1" className="a-left" > Subtotal </td>
                                                            <td className="a-right" ><span className="price">{symbol}{roundUp((total * rate), 1)}</span></td>

                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    <ul className="checkout">
                                                        <li>
                                                            {/*<form >
                                                            <script src="https://js.paystack.co/v1/inline.js"></script>
                                                            <button className="button btn-proceed-checkout" type="button" onClick={payWithPaystack}> <span>Pay With Paystack</span> </button>
                                                        </form>
*/}

                                                            {( roundUp((total * rate), 1) === 0 ? '' : <PaystackButton
                                                                text="Make Payment"
                                                                class="button btn-proceed-checkout"
                                                                callback={this.callback}
                                                                close={this.close}
                                                                disabled={false} /*disable payment button*/
                                                                embed={false} /*payment embed in your app instead of a pop up*/
                                                                reference={this.getReference()}
                                                                email={'brianking319@gmail.com'}
                                                                amount={156}
                                                                paystackkey={'pk_test_df0edb580d86d436298dbdfcf210312b73a87ee9'}
                                                            /> )}

                                                        </li>
                                                        <br/>

                                                    </ul>
                                                </div>


                                            </div>
                                        </div>


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

        selected: state.currency.selected,
        searchTerm: state.product.searchTerm,
        cartCurrency: state.currency,
        cart: state.cart,
        currency: state.currency
    }
}

function matchDispatchToProps(dispatch){
    return {

        onAllCategory(){
            dispatch(categoryActions.prepareCategory())
        },

        onremoveFromCart(productId, index){
            dispatch(cartActions.removeFromCart(productId, index))
        },

        onChangeQuantity(value, productId){
            dispatch(cartActions.changeQuantity(value, productId))
        },

        onClearCart(){
            dispatch(cartActions.clearCart())
        }
    }
}

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



export default connect(mapStateToProps, matchDispatchToProps)(ShoppingCart)