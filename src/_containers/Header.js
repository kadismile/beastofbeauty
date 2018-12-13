import React, { Component } from 'react';
import CategoryList from '../_components/Header/CategoryList'
import SearchForm from '../_components/Header/SearchForm'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {categoryActions} from '../_actions/categoryActions'
import {currencyActions} from '../_actions/currencyActions'
import {productActions} from '../_actions/productActions'
import ChooseCurrency from '../_components/Header/ChooseCurrency';
import Cart from '../_components/Header/Cart';
import {cartActions} from "../_actions/cartActions";
import {authActions} from "../_actions/authActions";

//const loader = <div className="data-loading"> <i className="fa fa-refresh fa-spin"></i> </div>

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuDisplay: 'block'
        }
    }
    componentDidMount(){
        setTimeout(() => {
            this.props.onAllCategory();
        }, 1500);

    }


    removeFromCart=(productId, index)=>{
       this.props.onremoveFromCart(productId, index);
    };



    formSubmited = (event)=> {
        event.preventDefault();


        setTimeout(() => {
            this.props.onsearchProduct(this.props.searchTerm);
        }, 1500);


            this.props.history.push({
                pathname: '/search/'+this.props.searchTerm,
                 state: {
                    search: this.props.searchTerm,
                    products: this.props.products,
                    currency: this.props.searchcurrency,
                    selected: this.props.selected
                }
            });


    };


    clickCurrency =(event, val) =>{
        return this.props.onclickCurrency(val);
    };

    render (){
        const authenticated  = this.props.auth.isAuthenticated;
        const user  = this.props.auth;
        //console.log(authenticated );
        return (

           <div>

               <div className="top-banners hidden-xs">
                   <div className="banner"> {authenticated ? <span>{user.username}</span> : ''} purchase products above &#x20A6;200,000 and:
                       <span> Save 5% </span> this weekend! </div>
               </div>

               <header className="hidden-xs hidden-md">
                   <div className="header-container hidden-xs">
                       <div className="container">
                           <div className="row">

                               <div className="col-xs-12 col-sm-4 col-md-6 col-lg-6 pull-left" hidden={true}>
                                   <div className="dropdown block-language-wrapper">


                                   </div>

                                   { ( this.props.currency === undefined) ? ('') :
                                       <ChooseCurrency
                                           currency={this.props.currency}
                                           selected={this.props.selected}
                                           clickCurrency={this.clickCurrency}
                                       />
                                   }



                               </div>

                               <div className="col-xs-12 col-sm-8 col-md-6 col-lg-6 pull-right hidden-xs">
                                   <div className="toplinks">
                                       <div className="links">
                                           <div className="myaccount">
                                               {
                                                   (authenticated === true ?<Link to={{pathname: "/my-account"}} >
                                                       <span className="hidden-xs"><span className="hidden-xs">My Account</span></span>
                                                   </Link> : '')

                                               }
                                           </div>
                                           <div className="check"><a title="Checkout" href="shoppingCart.php"><span className="hidden-xs">Checkout</span></a> </div>
                                           <div className="login">
                                               {
                                                   (authenticated === false ? <Link to={{pathname: "/login"}} ><span className="hidden-xs">Login</span></Link> :
                                                           <a href="" onClick={()=> {this.props.onLogout(1)}}>Log Out</a>
                                                   )

                                               }
                                           </div>
                                       </div>
                                   </div>

                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="container">
                       <div className="row">
                           <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 logo-block">

                               <div className="logo hidden-xs">

                                   <Link title="Beast Of Beauty"
                                         to={{
                                             pathname: '/',
                                         }}>
                                       <img alt="Magento Commerce" src={require('../assets/images/logo1.png')}
                                       style={{marginTop: -5 + 'px',marginBottom: 0 + 'px', width: 66 + '%'}}/>
                                   </Link>

                               </div>

                           </div>

                           {/* SEARCH COMPONENT*/
                               /* SEARCH COMPONENT*/}
                           <SearchForm
                               formSubmitted={this.formSubmited.bind(this)}
                               //formParam={this.formParam.bind(this)}
                               searchTermChanged={this.props.onsearchTermChanged}
                               //searchTerm={this.props.searchTerm}
                           />



                           <div className="col-lg-2 col-md-3 col-sm-3 col-xs-12 card_wishlist_area hidden-xs">
                               <div className="mm-toggle-wrap">
                                   <div className="mm-toggle"><i className="fa fa-align-justify"></i><span className="mm-label">Menu</span> </div>
                               </div>

                               <div className="top-cart-contain">

                                <Cart
                                     cart={this.props.cart}
                                     currency={this.props.cartCurrency}
                                     selected={this.props.selected}
                                     removeFromCart={this.removeFromCart}
                                     cartProducts={this.props.cart/*.shoppingCartProducts.slice(1)*/}
                                     className="hidden-xs"
                                 />

                                   <div id="ajaxconfig_info" style={{display:'none'}}> <a href="/">.</a>
                                       <input value="" type="hidden"/>
                                       <input id="enable_module" value="1" type="hidden"/>
                                       <input className="effect_to_cart" value="1" type="hidden"/>
                                       <input className="title_shopping_cart" value="Go to shopping cart" type="hidden"/>
                                   </div>
                               </div>

                           </div>
                       </div>
                   </div>
                   <nav className="hidden-xs">
                       <div className="nav-container">

                    {

                      ( this.props.category === undefined) ? ('') :
                          <CategoryList
                              categories={this.props.category}
                              /*clickCategory={this.clickCategory.bind(this)}*/
                              product={this.props.products}
                              menuDisplay={this.state.menuDisplay}

                          />
                   }




                           <div className="our-features-box hidden-xs">
                               <div className="features-block">
                                   <div className="col-lg-9 col-md-9 col-xs-12 col-sm-9 offer-block">
                                       <Link to={{pathname: "/"}} > Home </Link>
                                       <Link
                                           to={{pathname: `/category/women`, state: { id: 819, name:'women'}}} >
                                           Women
                                       </Link>
                                       <Link
                                           to={{pathname: `/category/men`, state: { id: 820, name:'men'}}} >
                                           Men
                                       </Link>
                                       <Link
                                           to={{pathname: `/category/children`, state: { id: 821, name:'children'}}} >
                                           Children
                                       </Link>
                                       <Link to={{pathname: "/shopping_cart"}} > View Cart</Link>

                                       {/*<Link style={{backgroundColor: '#883912'}} to={{pathname: "/measure-me"}} >Measure Me</Link>*/}

                                       <span>Order online or call us (+234) 080 8287 2859</span>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </nav>
               </header>








               <header className="visible-xs">
                   <div className="header-container">
                       <div className="container">
                           <div className="row">

                               <div className="col-xs-12 col-sm-4 col-md-6 col-lg-6 pull-left" hidden={true}>
                                   <div className="dropdown block-language-wrapper">


                                   </div>

                                   { ( this.props.currency === undefined) ? ('') :
                                       <ChooseCurrency
                                           currency={this.props.currency}
                                           selected={this.props.selected}
                                           clickCurrency={this.clickCurrency}
                                       />
                                   }



                               </div>

                               <div className="col-xs-12 col-sm-8 col-md-6 col-lg-6 pull-right hidden-xs">
                                   <div className="toplinks">
                                       <div className="links">
                                           <div className="myaccount">
                                               {
                                                   (authenticated === true ?<Link to={{pathname: "/my-account"}} >
                                                       <span className="hidden-xs"><span className="hidden-xs">My Account</span></span>
                                                   </Link> : '')

                                               }
                                           </div>
                                           <div className="check"><a title="Checkout" href="shoppingCart.php"><span className="hidden-xs">Checkout</span></a> </div>
                                           <div className="login">
                                               {
                                                   (authenticated === false ? <Link to={{pathname: "/login"}} ><span className="hidden-xs">Login</span></Link> :
                                                           <a href="" onClick={()=> {this.props.onLogout(1)}}>Log Out</a>
                                                   )

                                               }
                                           </div>
                                       </div>
                                   </div>

                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="container">
                       <div className="row" style={{marginRight: '-15px', marginLeft: '-15px'}}>


                           {/* SEARCH COMPONENT*/
                               /* SEARCH COMPONENT*/}
                           <SearchForm
                               formSubmitted={this.formSubmited.bind(this)}
                               //formParam={this.formParam.bind(this)}
                               searchTermChanged={this.props.onsearchTermChanged}
                               //searchTerm={this.props.searchTerm}
                           />




















                           {/* ############mobile header goes here ##########*/}
                           {/* ############mobile header goes here ##########*/}
                           {/* ############mobile header goes here ##########*/}
                           {/* ############mobile header goes here ##########*/}
                           {/* ############mobile header goes here ##########*/}
                           {/* ############mobile header goes here ##########*/}
                           {/* ############mobile header goes here ##########*/}
                           <div className="col-lg-2 col-md-3 col-sm-3 col-xs-12 card_wishlist_area visible-xs-block"
                           style={{position: 'fixed',zIndex: 1000}}>
                               <div className="mm-toggle-wrap">
                                   <div className="mm-toggle"><i className="fa fa-align-justify"></i><span className="mm-label">Menu</span> </div>
                               </div>
                               <Link title="Beast Of Beauty"
                                     to={{
                                         pathname: '/'
                                     }}>
                                   <img alt="Magento Commerce" src={require('../assets/images/logo1.png')}
                                        style={{
                                            marginTop: 2 + 'px',
                                            marginBottom: 0 + 'px',
                                            width: '36%',
                                            marginLeft: '113px'
                                        }}/>
                               </Link>
                               <div className="top-cart-contain visible-xs">

                                   <Cart
                                       cart={this.props.cart}
                                       currency={this.props.cartCurrency}
                                       selected={this.props.selected}
                                       removeFromCart={this.removeFromCart}
                                       cartProducts={this.props.cart/*.shoppingCartProducts.slice(1)*/}
                                   />

                                   <div id="ajaxconfig_info" style={{display:'none'}}> <a href="/">.</a>
                                       <input value="" type="hidden"/>
                                       <input id="enable_module" value="1" type="hidden"/>
                                       <input className="effect_to_cart" value="1" type="hidden"/>
                                       <input className="title_shopping_cart" value="Go to shopping cart" type="hidden"/>
                                   </div>
                               </div>

                               <div className="mm-search" style={{marginTop: '2px'}}>
                                   <form  onSubmit={this.formSubmited.bind(this)}>
                                       <div className="input-group" style={{marginLeft: '19px',marginRight: '16px'}}>
                                           <input type="text"
                                                  onChange={(event) => this.props.onsearchTermChanged(event.target.value)}
                                                  className="form-control simple"
                                                  placeholder="Search here..."
                                                  value={this.props.searchTerm}
                                                  style={{
                                                      height: '31px',
                                                      fontSize:'13px'
                                                  }}
                                           />
                                           <div className="input-group-btn">
                                               <button className="btn btn-default" type="submit"><i className="fa fa-search"></i> </button>
                                           </div>
                                       </div>
                                       <span style={{textAlign: "center", fontSize: '11px', paddingLeft: '20px'}}>Order online or call us (+234) 080 8287 2859</span>
                                   </form>

                               </div>

                           </div>
                           {/* mobile header ends here */}
                           {/* mobile header ends here */}
                           {/* mobile header ends here */}
                           {/* mobile header ends here */}
                           {/* mobile header ends here */}
                           {/* mobile header ends here */}
                           {/* mobile header ends here */}
                           {/* mobile header ends here */}
                           {/* mobile header ends here */}
                           {/* mobile header ends here */}
                           {/* mobile header ends here */}


                       </div>
                   </div>




                   <nav className="hidden-xs">
                       <div className="nav-container">

                           {

                               ( this.props.category === undefined) ? ('') :
                                   <CategoryList
                                       categories={this.props.category}
                                       /*clickCategory={this.clickCategory.bind(this)}*/
                                       product={this.props.products}

                                   />
                           }




                           <div className="our-features-box hidden-xs">
                               <div className="features-block">
                                   <div className="col-lg-9 col-md-9 col-xs-12 col-sm-9 offer-block">
                                       <Link to={{pathname: "/"}} > Home </Link>
                                       <a href="/category/hats">Clothes</a>
                                       <a href="/category/hats">Bags</a>
                                       <a href="complains.php">Headwraps</a>
                                       <Link to={{pathname: "/shopping_cart"}} > View Cart</Link>
                                       {/*<Link style={{backgroundColor: '#883912'}} to={{pathname: "/measure-me"}} >Measure Me</Link>*/}

                                       <span>Order online or call us (+234) 080 8287 2859</span>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </nav>
               </header>

           </div>
       )

}
}

function mapStateToProps(state) {
    return{
        category: state.categories.cats,
        products: state.product,
        selected: state.currency.selected,
        searchTerm: state.product.searchTerm,
        display:state.product.display,
        currency: state.currency.currency,
        cartCurrency: state.currency,
        searchcurrency: state.currency,
        cart: state.cart,
        auth: state.auth
    }
}

function matchDispatchToProps(dispatch){
    return {

        onAllCategory(){
            dispatch(categoryActions.prepareCategory())
        },

        onclickCategory(id){
            dispatch(categoryActions.retrieveProductCategory(id))
        },

        onclickCurrency(val){
            dispatch(currencyActions.selectCurrency(val))
        },

        onsearchProduct(param){
            dispatch(productActions.searchProduct(param))
        },

        onsearchTermChanged(searchTerm){
            dispatch(productActions.searchTermChanged(searchTerm))
        },
        resetProduct(){
            dispatch(productActions.ResetProducts())
        },

        onremoveFromCart(productId, index){
            dispatch(cartActions.removeFromCart(productId, index))
        },

        oncartItemNos(index, id){
            dispatch(cartActions.cartItemNos(id))
        },

        onLogout(id){
            dispatch(authActions.logoOut(id))
        }



    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Header);