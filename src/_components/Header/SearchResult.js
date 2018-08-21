import React, { Component } from 'react';
import {connect} from 'react-redux'
import ProductItem from '../Product/ProductItem'
import {productActions} from '../../_actions/productActions'
import {cartActions} from '../../_actions/cartActions'
const loader = <div className="data-loading"> <i className="fa fa-refresh fa-spin"></i> <div style={{marginBottom: '550px'}}></div></div>

class SearchResult extends Component {


    componentDidMount(){

        setTimeout(() => {
            this.props.onsearchProduct(this.props.searchTerm)
        }, 1500);

    }

    addedToCart=(id)=>{
        //alert('this ' + id + ' has been added to the cart')
        this.props.onAddToCart(id)
    };

    render(){
        console.log(this.props.product);
        return(
            ( this.props.products === undefined || this.props.products.length === 0) ? (loader ) :


            <div>
                <section className="main-container col2-left-layout">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9 col-sm-push-3">



                                <div className="page-title">
                                    <h6 className="page-heading">
                                     Your Search Results for "<span className="page-heading-title">{this.props.searchTerm}</span>"
                                    </h6>


                                </div>


                                { (this.props.products.length === 0 ) ? ('<h1> No Record Found </h1>') :
                                    <article className="col-main">

                                        <div className="category-products">
                                            <ul className="products-grid">

                                                    <ProductItem
                                                        products={this.props.products.product} //props of product to child
                                                        currency={this.props.currency} //props of currency to child
                                                        selected={this.props.selected}
                                                        addingToCart={this.addedToCart}
                                                    />

                                            </ul>
                                        </div>

                                    </article>
                                }



                            </div>

                        </div>
                    </div>
                </section>

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
        currency: state.currency,
        searchcurrency: state.currency
    }
}

function matchDispatchToProps(dispatch){
    return {

         onsearchProduct(param){
            dispatch(productActions.searchProduct(param))
        },

        resetProduct(){
            dispatch(productActions.ResetProducts())
        },

        onAddToCart(id){
            dispatch(cartActions.prepareToAddToCart(id))
        }

    }
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchResult);