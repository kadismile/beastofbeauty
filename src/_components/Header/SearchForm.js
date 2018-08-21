import React from 'react'

const SearchForm = (props) =>{

    
    return (
        <div className="col-lg-7 col-md-6 col-sm-6 col-xs-3 hidden-xs category-search-form">
            <div className="search-box">
                <form onSubmit={props.formSubmitted}>

                    <input id="search" type="text" name="q"

                           onChange={(event) => props.searchTermChanged(event.target.value)}
                           value={props.searchTerm}
                           placeholder="Search entire store here..."
                           className="searchbox" maxLength="128"
                    />
                    <button type="submit" title="Search" className="search-btn-bg" id="submit-button"></button>
                </form>
            </div>
        </div>
    )
};
//onChange={(event) => props.formParam(event.target.value)}
export default SearchForm