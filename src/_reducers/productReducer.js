import * as type from '../_constants/ActionTypes'


const initialState = {
    product: [],
    id: 0,
    searchTerm: '',
    best_seller:[],
    featured_product:[],
    slugTerm:'',
    cartProducts:[]



};





//REDUCER
export default function todoReducer(state = initialState, action){

    switch(action.type) {

        case type.FETCH_PRODUCTS:
            {
            return {
                ...state,
                product: action.products,
                id: action.id,

            }
        }


        case type.DISPLAY_CART_PRODUCT:{
            return{
                ...state,
                cartProducts: action.product
            }
        }

        case type.DISPLAY_PRODUCT:
        {
            let term ;
            action.products.map( (product) => {
                return term = product.slug
            });
            return {
                ...state,
                product: action.products,
                slugTerm: term,

            }
        }

        case type.FEATURED_PRODUCT:
        {
            return {
                ...state,
                featured_product: action.products,
                id: action.id,

            }
        }

        case type.BEST_SELLER:
        {
            return {
                ...state,
                best_seller: action.products,
                id: action.id,

            }
        }

        case type.SEARCH_TERM_CHANGED: {
            return {
                ...state,
                searchTerm: action.searchTerm,

            };
        }
        case type.SEARCH_PRODUCTS:
        case type.FETCH_SOME_PRODUCTS:{
            return {
                ...state,
                product: action.products,


            }
        }
        case type.RESET_PRODUCTS: {
            return {
                ...state,
                product: action.products,


            }
        }


        default: return state
    }
}