import React from 'react'

const ChooseCurrency = (props)=> {
    /*const {currencies} = props.currency;*/
    const {selected} = props.selected;

          return (


        <span>
           <div className="dropdown block-currency-wrapper">
               <a role="button" data-toggle="dropdown" data-target="" className="block-currency dropdown-toggle" href="">
                   Choose Currency <span className="caret"></span></a>
               <ul className="dropdown-menu" role="menu">
                   {props.currency.map( (currency, key) => {
                       return (<li key={key} role="presentation">
                           <a onClick={(event) => props.clickCurrency(event, currency.val)} > {currency.label} </a>
                       </li>)
                   }) }

               </ul>
           </div>
              <div className="welcome-msg"> Prices Will be displayed in <span style={{color:'#fdd922', fontWeight:'bold'}}>{currency(props.selected)} </span>  </div>
        </span>
          );


    function currency(currency = selected) {

        switch(currency) {

            case 0: {
                return ('Naira')
            }

            case  1: {
                return ('Dollars')
            }

            case 2:{
                return ('Euros')
            }

            case 3: {
                return ('Pounds')
            }


            default: return ''
        }


    }
};



export default ChooseCurrency