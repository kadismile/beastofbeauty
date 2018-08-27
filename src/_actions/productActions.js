import * as type from '../_constants/ActionTypes'
import * as authorize from '../_constants/ApiConstants'
import axios from 'axios'
export const productActions = {

    fetchProducts(products, id){
        return {
            type: type.FETCH_PRODUCTS,
            products,
            id
        }
    },

    displayProduct(products){
        return {
            type: type.DISPLAY_PRODUCT,
            products
        }
    },

    displayCartProduct(product){
        return {
            type: type.DISPLAY_CART_PRODUCT,
            product
        }
    },


    fetchBestSeller(products, id){
        return {
            type: type.BEST_SELLER,
            products,
            id
        }
    },

    fetchFeaturedProducts(products, id){
        return {
            type: type.FEATURED_PRODUCT,
            products,
            id
        }
    },

    fetchSomeProducts(products){
        return {
            type: type.FETCH_SOME_PRODUCTS,
            products,
        }
    },
    fetchSearchProducts(products){
        return {
            type: type.SEARCH_PRODUCTS,
            products,
        }
    },

    ResetProducts(products){
        return {
            type: type.RESET_PRODUCTS,
            products,
        }
    },

    retrieveProductCategory(id){

        return dispatch  => {
            let settings = {
                "async": true,
                "crossDomain": true,
                "url": `${authorize.apiUrl}/wp-json/wc/v2/products?category=${id}&&per_page=20`,
                "method": "GET",
                "headers": {
                    "authorization": authorize.authorization
                }
            };
            axios(settings).then((response) => {
                dispatch(this.fetchProducts(response.data, id))
            }).catch((error) => {
                console.log(error);
            });
        }
    },



    searchTermChanged(searchTerm) {
        return {
            type: type.SEARCH_TERM_CHANGED,
            searchTerm
        };
    },
    searchProduct(searchTerm) {
    return dispatch => {

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": `${authorize.apiUrl}/wp-json/wc/v2/products?search=${searchTerm}`,
            "method": "GET",
            "headers": {
                "authorization": authorize.authorization
            }
        };

        axios(settings).then((response) => {
            dispatch(this.fetchSearchProducts(response.data))
        }).catch((error) => {
            console.log("ERROR");
        });
    }

},

    prepareSomeProducts() {
    return dispatch => {

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": `${authorize.apiUrl}/wp-json/wc/v1/products?order=asc&&per_page=20`,
            "method": "GET",
            "headers": {
                "authorization": authorize.authorization
            }
        };

        axios(settings).then((response) => {
            dispatch(this.fetchSomeProducts(response.data))
        }).catch((error) => {
            console.log("ERROR");
        });
    }

},






    BestsellerProductCategory(id){

        return dispatch  => {
            let settings = {
                "async": true,
                "crossDomain": true,
                "url": `${authorize.apiUrl}/wp-json/wc/v2/products?category=${id}&&per_page=20`,
                "method": "GET",
                "headers": {
                    "authorization": authorize.authorization
                }
            };
            axios(settings).then((response) => {
                dispatch(this.fetchBestSeller(response.data, id))
            }).catch((error) => {
                console.log("ERROR");
            });
        }
    },
    FeatureProductCategory(id){

        return dispatch  => {
            let settings = {
                "async": true,
                "crossDomain": true,
                "url": `${authorize.apiUrl}/wp-json/wc/v2/products?category=${id}&&per_page=20`,
                "method": "GET",
                "headers": {
                    "authorization": authorize.authorization
                }
            };
            axios(settings).then((response) => {
                dispatch(this.fetchFeaturedProducts(response.data, id))
            }).catch((error) => {
                console.log("ERROR");
            });
        }
    },

    productBySlug(slug) {
    return dispatch => {

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": `${authorize.apiUrl}/wp-json/wc/v2/products?slug=${slug}`,
            "method": "GET",
            "headers": {
                "authorization": authorize.authorization
            }
        };

        axios(settings).then((response) => {
            dispatch(this.displayProduct(response.data))
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
                    "authorization": authorize.authorization
                }
            };

            axios(settings).then((response) => {
                dispatch(this.displayCartProduct(response.data))
            }).catch((error) => {
                console.log("ERROR");
            });
        }

    }


};