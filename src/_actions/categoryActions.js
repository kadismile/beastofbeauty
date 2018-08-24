import * as authorize from '../_constants/ApiConstants'
import * as type from '../_constants/ActionTypes'
import axios from 'axios'


export const categoryActions = {

//https://localhost/mama-ankara/wp-json/wc/v1/products?category=${data}&&per_page=12
    allCategory(categories){
        return {
          type: type.ALL_CATEGORY,
                 categories
        }
    },

    prepareCategory(){
        return dispatch => {

            let settings = {
                "async": true,
                "crossDomain": true,
                "url": `${authorize.apiUrl}/wp-json/wc/v2/products/categories`,
                "method": "GET",
                "headers": {
                    "authorization": authorize.authorization
                }
            };
            axios(settings).then((response) => {
                dispatch(this.allCategory(response.data))
            }).catch((error) => {
                console.log(error);
            });

        }
    },



    

};