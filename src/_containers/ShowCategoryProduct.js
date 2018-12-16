import React, { Component } from 'react';
import {connect} from 'react-redux'
import ProductItem from '../_components/Product/ProductItem'
import {cartActions} from '../_actions/cartActions'
import {productActions} from '../_actions/productActions'
const loader = <div className="data-loading" style={{marginTop: '100px'}}> <i className="fa fa-refresh fa-spin"></i> <div style={{marginBottom: '500px'}}></div></div>

class ShowCategoryProduct extends Component {



    constructor(props) {
        super(props);
        this.state = {
            product_id: this.props.location.state.id
        }
    }

    componentDidMount(){
        setTimeout(() => {
            window.scroll(0, 0);
            this.props.onclickCategory(this.props.location.state.id);
        }, 1500);

    }

    addedToCart=(id)=>{
        //alert('this ' + id + ' has been added to the cart')
        this.props.onAddToCart(id)
    };

    componentWillMount(){
        this.props.resetProduct();
    }

    /*productTitle =(title) =>{
      return alert(title)
    };*/

    dashString = (string)=> {
        let i = 0, strLength = string.length;
        for(i; i < strLength; i++) {
            string = string.replace("-", " ");
        }
        return string.toUpperCase()
    };

   componentWillReceiveProps(nextProps) {

        if(nextProps.match.url !== this.props.match.url) {


            this.setState({
                product_id: nextProps.product_id
            });

                window.scroll(0, 0);

            this.id = nextProps.location.state.id;
            setTimeout(() => {
                this.props.onclickCategory(this.id)
                this.props.resetProduct()
            }, 1500);
        }

    }



  render(){

      console.log(this.props.location.state.id);

      return(
          ( this.props.products === undefined) ? (loader ) :
          <div>
                  <section className="main-container col2-left-layout">
                      <div className="container">
                          <div className="row">
                              <div className="col-sm-9 col-sm-push-3">



                                  <div className="page-title">
                                      <br/>
                                      <h2 className="page-heading">
                                          <span className="page-heading-title">{this.dashString(this.props.match.params.cat_name)}</span>

                                      </h2>
                                  </div>

                                  <article className="col-main">

                                      <div className="category-products">
                                          <ul className="products-grid">

                                             <ProductItem
                                                 products={this.props.products} //props of product to child
                                                 currency={this.props.currency} //props of currency to child
                                                 addingToCart={this.addedToCart}
                                                 //productTitle={this.productTitle.bind(this)} //props for title to child
                                             />
                                          </ul>
                                      </div>

                                  </article>

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
        products: state.product.product,
        product_id: state.product.id,
        currency: state.currency

    }
}

function matchDispatchToProps(dispatch){
    return {

        onclickCategory(id){
            dispatch(productActions.retrieveProductCategory(id))
        },

        resetProduct(){
            dispatch(productActions.ResetProducts())
        },

        onAddToCart(id){
            dispatch(cartActions.prepareToAddToCart(id))
        }

    }
}

export default connect(mapStateToProps, matchDispatchToProps)(ShowCategoryProduct)
