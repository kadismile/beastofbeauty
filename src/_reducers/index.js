import { combineReducers } from 'redux'
import product  from './productReducer'
import categories  from './categoryReducer'
import currency  from './currencyReducer'
import cart  from './cartReducer'
import auth  from './authReducer'


export default combineReducers({
    product,
    categories,
    currency,
    cart,
    auth
})




