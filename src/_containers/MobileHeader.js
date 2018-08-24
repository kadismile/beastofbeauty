import React, {Component} from 'react'
import {connect} from 'react-redux'
import {categoryActions} from '../_actions/categoryActions'
import {Link} from 'react-router-dom'


const loader = <div className="data-loading"> <i className="fa fa-refresh fa-spin"></i> </div>
class MobileHeader extends Component{

    componentDidMount(){
        setTimeout(() => {
            this.props.onAllCategory();
        }, 1500);

    }

    render(){

        return(<div>
                <div id="mobile-menu" style={{position: 'fixed'}}>
                    <ul>
                        <li>
                            <div className="mm-search">

                            </div>
                        </li>





                    </ul>

                    <div className="top-links">
                        <ul className="links">
                            {
                                ( this.props.category === undefined) ? (loader ) :
                                this.props.category.map((category, index) => {
                                    return (
                                        <li key={index}>
                                            <Link
                                                to={{
                                                    pathname: `/category/${dashString(category.name)}`,
                                                    state: { id: category.id, name:category.name}
                                                }}>
                                                {category.name}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

function dashString(string) {
    let i = 0, strLength = string.length;
    for(i; i < strLength; i++) {
        string = string.replace(" ", "-");
    }
    return string.toLowerCase()
}

function mapStateToProps(state) {
    return{
        category: state.categories.cats,
    }
}

function matchDispatchToProps(dispatch){
    return {

        onAllCategory(){
            dispatch(categoryActions.prepareCategory())
        },

        onclickCategory(id){
            dispatch(categoryActions.retrieveProductCategory(id))
        },


    }
}
export default connect(mapStateToProps, matchDispatchToProps)(MobileHeader);