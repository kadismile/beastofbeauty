import React, { Component } from 'react';
import {connect} from 'react-redux'
import ProductItem from '../Product/ProductItem'
import {productActions} from '../../_actions/productActions'
import {cartActions} from '../../_actions/cartActions'
const loader = <div className="data-loading"> <i className="fa fa-refresh fa-spin"></i> <div style={{marginBottom: '550px'}}></div></div>

class SearchResult extends Component {


    componentDidMount(){
        window.scroll(0, 0);
        //this.props.resetProduct();
        setTimeout(() => {
            this.props.onsearchProduct(this.props.searchTerm)
        }, 1500);

    }
    componentWillReceiveProps(nextProps) {

        if(nextProps.match.url !== this.props.match.url) {

            window.scroll(0, 0);

            setTimeout(() => {
                this.props.onsearchProduct(this.props.searchTerm)
            }, 1500);
        }

    }
    addedToCart=(id)=>{
        //alert('this ' + id + ' has been added to the cart')
        this.props.onAddToCart(id)
    };

    render(){
        console.log(this.props.products.product);
        return(
            (this.props.products.product.length === 0 ) ? (loader ) :

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



                                { (this.props.products.product.length === 0 ) ? ('No Record Found') :
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