import React from 'react'

const ProductPrice = (props)=>{
    const {price} = props;

    let theCurency = props.currency.currency;
    let indexArr = theCurency[props.currency.selected];  // [0] get the value(s) of an index of an array
    let rate = (indexArr.rate);
    let symbol = (indexArr.symbol);

    /*let rate, symbol;
    let theCurency = props.currency.currency;
    let indexArr = props.currency.selected;
    let resultArr = _.at(theCurency, indexArr);
    resultArr.map((curr) => {
        return rate = curr.rate, symbol = curr.symbol
    });*/
        return (

        <div className="item-price">
            <div className="price-box">
                <p className="old-price"><span
                    className="price-label">Regular Price:</span>
                    <span
                        className="price">{symbol}{formatPrice(price * rate) } </span>
                </p>
                <p className="special-price"><span
                    className="price-label">Special Price</span>
                    <span className="price"> {symbol}{formatPrice(price * rate)}  </span>
                </p>
            </div>
        </div>
    )
};
function formatPrice (val) {
    if(val !== ""){
        return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
       /* return  Math.round(val)*/
    }else  {
        return '--'
    }
}
export default ProductPrice