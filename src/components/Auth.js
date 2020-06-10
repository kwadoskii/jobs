import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Auth extends Component {
    componentDidMount(){
        let token = localStorage.getItem('auth-token');
        if(!token) 
            return this.props.history.push('/');
        else
            this.setState({
                loading: false
            });
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(Auth);