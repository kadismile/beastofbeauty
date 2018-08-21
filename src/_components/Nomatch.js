import React, { Component } from 'react';
class Nomatch extends Component {





    render(){
        const nomatch  = this.props.match.url;


        return (
            <div>
                <h1>No URL matches   <span style={{color: 'blue'}}>{nomatch}</span>  </h1>
            </div>
        );
    }

}

export default Nomatch;
