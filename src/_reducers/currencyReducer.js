import * as type from '../_constants/ActionTypes'
const OPTIONS = [
    { val: 0, label: '₦ - Naira', symbol:'₦', rate:1 },
    { val: 1, label: "$ - Dollar", symbol:'$', rate:141 },
    { val: 2, label: "€ - Euro", symbol:'€', rate: 164 },
    { val: 3, label: "£ - Pound", symbol:'£',rate: 172 },
];

const initialState = {
    currency: OPTIONS,
    selected: 0,
};



export default function currencyReducer(state=initialState, action){

    switch(action.type) {

       case type.CASE_NAIRA:
       case type.CASE_DOLLAR:
       case type.CASE_EURO:
       case type.CASE_POUND:
            return {
                ...state,
                selected: action.val
            };

        default: return state
    }
}