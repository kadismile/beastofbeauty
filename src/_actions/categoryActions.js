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
                "url": `https://localhost/mama-ankara/wp-json/wc/v2/products/categories`,
                "method": "GET",
                "headers": {
                    "authorization": "Basic Y2tfODg5OWUyZjY2NTg3YTExZDZiMWIwNjQxODlmNmU0MTI3NmY1NTM4YTpjc18wYjcwOGY1YWY2YjZiNzRhMjc4MGY1M2FiNDliMTlmNTI2ZTI0ZjJi",
                }
            };
            axios(settings).then((response) => {
                dispatch(this.allCategory(response.data))
            }).catch((error) => {
                console.log("ERROR");
            });

        }
    },



    

};