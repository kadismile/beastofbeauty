import React from 'react'

const ProductImage = (props)=>{
    const {images} = props;
    let newImages = (images)[0];
            return (
                <div className="item-img">
                <div className="item-img-info">
                   <img src={newImages.src} alt="Retis lapen casen"/>
                    <div className="new-label new-top-left">New</div>
                </div>
              </div>
            )

};

export default ProductImage