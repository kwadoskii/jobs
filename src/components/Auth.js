import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getJwt } from '../helper/jwt';
import Axios from 'axios';

class Auth extends Component {
    constructor(props) {
        super(props);
            
        this.state = {
            auth: undefined
        };
    }
    

    componentDidMount() {
        const jwt = getJwt();
        if (!jwt)
            return this.props.history.push('/');
        if(jwt)
            // console.log(jwt)
            Axios.get('http://localhost:5000/auth', { headers: { 'auth-token': jwt } })
                .then(({ data }) => {
                    if (data.status === 'success')
                        this.setState({ auth: data.data.user });
                    if (data.status === 'error')
                        this.setState({ auth: undefined });
                }).catch(err => {
                    localStorage.removeItem('auth-token');
                    this.props.history.push('/');
                })

    }

    render() {
        if (this.state.auth === undefined) {
            return (
                <div>
                    
                </div>
            );
        }
        
        return (
                <div>
                    {this.props.children}
                </div>
            );      
            
    }
}

export default withRouter(Auth);