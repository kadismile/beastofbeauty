import * as type from '../_constants/ActionTypes'
import * as authorize from '../_constants/ApiConstants'
import axios from 'axios'
export const cartActions = {


    addToCart(product, productId){
        return {
            type: type.ADD_TO_CART,
            productId,
            product
        }
    },

    prepareToAddToCart(productId){
        return dispatch => {
            let settings = {
                "async": true,
                "crossDomain": true,
                "url": `${authorize.apiUrl}/wp-json/wc/v2/products/${productId}`,
                "method": "GET",
                "headers": {
                    "authorization": authorize.authorization,
                }
            };

            axios(settings).then((response) => {
                dispatch(this.addToCart(response.data, productId))
            }).catch((error) => {
                console.log("ERROR");
            });
        }
    },


    productByIds(id){
        alert(id + ' added')
    },

    productById(id) {
        return dispatch => {

            let settings = {
                "async": true,
                "crossDomain": true,
                "url": `${authorize.apiUrl}/wp-json/wc/v2/products/${id}`,
                "method": "GET",
                "headers": {
                    "authorization": authorize.authorization,
                }
            };

            axios(settings).then((response) => {
                dispatch(this.displayCartProduct(response.data))
            }).catch((error) => {
                console.log("ERROR");
            });
        }

    },



    removeFromCart(productId){
       return {
           type: type.REMOVE_FROM_CART,
           productId
       }
    },

    clearCart(){
        return {
            type: type.CLEAR_CART,
        }
    },



    changeQuantity(value, productId ){
        //console.log('the value is:' + value, 'product id is:' + productId)
        return {
            type: type.CHANGE_QTY,
            value,
            productId
        }
    }




   /* changeQty(productId, qty){
        return dispatch =>{
            {
                //const qtyDiff = qty - getState().cart.quantityById[productId];
                dispatch({
                    type: type.CHANGE_QTY,
                    productId,
                    qtyDiff
                })
            }
        }
    }*/

    /*prepareAddToCart(productId) {
        return dispatch =>{
            //if the id in the cart and quantity is == 10 let the owner be notified that its 10 already
            if (getState().products.byId[productId].inventory > 0) {
                dispatch(addToCartUnsafe(productId))
            }
        }
    },*/


};