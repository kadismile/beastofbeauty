import React from 'react'
import CategoryItem from './CategoryItem'




const CategoryList = (props) => {


    return (

        <div className="col-md-3 col-xs-12 col-sm-3">
            <div className="mega-container visible-lg visible-md visible-sm">
                <div className="navleft-container">
                    <div className="mega-menu-title">
                        <h3><i className="fa fa-navicon"></i> Select Category</h3>
                    </div>
                    <div className="mega-menu-category" id="display" style={{display: props.menuDisplay}}>
                        <ul className="nav">
                            {

                                props.categories.map((category, index) => {
                                return (

                                    <CategoryItem
                                        category={category}
                                        key={index}
                                        clickCategory={props.clickCategory}
                                    />
                                )
                                })
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;

