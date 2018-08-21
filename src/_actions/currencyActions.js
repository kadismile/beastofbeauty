import * as type from '../_constants/ActionTypes'

export const currencyActions = {

    fetchProducts(products){
        return {
            type: type.FETCH_PRODUCTS,
            products
        }
    },


    selectCurrency(val){

            switch (val) {
                case 0:
                    return {
                        type: type.CASE_NAIRA,
                        val
                    };

                case 1:
                    return {
                        type: type.CASE_DOLLAR,
                        val
                    };

                case 2:
                    return {
                        type: type.CASE_EURO,
                        val
                    };


                case 3:
                    return {
                        type: type.CASE_POUND,
                        val
                    };

                default:
                    return {
                        type: type.CASE_NAIRA,
                        val
                    };

            }


    }




};