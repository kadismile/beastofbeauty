import React from 'react'
import {Link} from 'react-router-dom'
const CategoryItem = (props)=>{
    const {category} = props;


    return (


            <li className="nosub">

                <Link
                    to={{
                        pathname: `/category/${dashString(category.name)}`,
                        state: { id: category.id, name:category.name}
                    }} /*onClick={(event) => props.clickCategory(event, category.id)}*/>
                    <i className="fa fa-arrow-right"></i>{category.name}
                </Link>
            </li>

    )
};

function dashString(string) {
    let i = 0, strLength = string.length;
    for(i; i < strLength; i++) {
        string = string.replace(" ", "-");
    }
    return string.toLowerCase()
}

export default CategoryItem