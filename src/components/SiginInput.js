import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Section from './Section'
import Button from './Button'
import Axios from 'axios';

class SiginInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
            redirect: false,
            authUser: ''
        }

        this.handleOnchange = this.handleOnchange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleOnchange(e){
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSignIn(e){
        e.preventDefault();
        const { email, password } = this.state;

        Axios.post('http://localhost:5000/signin', { email, password })
            .then(({ data }) => {
                if(data.data.token){
                    localStorage.setItem('auth-token', data.data.token);
                    this.setState({ redirect: true });
                }
                if(data.status === 'error'){
                    this.setState({ error: data.data.error });
                }
            }).catch(err => console.log(err));
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={{
                pathname: '/profile',
                 }}/>
        }
        
        return (
            <div>
                <form>
                    <p className="text-muted">{this.state.error}</p>
                    <Section class={"form-row input-group-lg"}>
                        <label htmlFor="email" className=" text-muted">Email</label>
                        <input type="email" className="form-control" name="email" onChange={this.handleOnchange} value={this.state.email} required />
                    </Section>

                    <Section class={"form-row input-group-lg mt-3"}>
                        <label htmlFor="password" className={"text-muted"}>Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.handleOnchange} value={this.state.password} required />
                    </Section>

                    <Button class={"btn btn-primary mt-5 p-2 col-12 rounded-pill font-weight-bold"} name='Sign in' type={'submit'} onClick={this.handleSignIn} />

                    <Section class="mt-3">
                        <p className="text-center font1-1 m-0 linkx" onClick={this.props.handleSignUp}>Get started now</p>
                        <p className="text-center font1-1 mt-1 linkx" onClick={this.props.handleForgotPW}>Forgot password?</p>
                    </Section>
                </form>
            </div>
        );
    }
}

export default SiginInput;