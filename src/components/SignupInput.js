import React, { Component } from 'react';
import { Redirect }         from 'react-router-dom';
import Section              from './Section';
import Button               from './Button';
import Axios                from 'axios';
import { getJwt} from '../helper/jwt';


class SignupInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            password2: '',
            error: '',
            redirect: false
        };

        this.handleSingUp = this.handleSingUp.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSingUp(e) {
        e.preventDefault();
        const { email, password, password2 } = this.state;

        if (password === password2) {
            // Sign up new user
            Axios.post('http://localhost:5000/signup', { email, password })
                .then(({data}) => {
                    if(data.status === 'error'){
                        this.setState({ error: data.data.error });
                    }
                    else{
                        //if signup is successful sign the user in
                        // Axios.get('http://localhost:5000/profile', { headers: { 'auth-token': getJwt() } })
                        //     .then(res => console.log(res))
                        //     .catch(err => console.log(err));
                        Axios.post('http://localhost:5000/signin', { email, password })
                            .then(({ data }) => {
                                localStorage.setItem('auth-token', data.data.token);
                                this.setState({ redirect: true })
                            }).catch(err => console.log(err));
                    }
                }).catch(err => console.log(err));
        }
        else
            this.setState({error: 'Password mismatch'});
    }

    render() {
        //redirects to profile of the new user
        if(this.state.redirect){
            return <Redirect to='/profile' />
        }

        return (
            <div>
                <form>                
                    <p className="text-muted">{this.state.error}</p>
                    <Section class={"form-row input-group-lg"}>
                        <label htmlFor="email" className=" text-muted">Email</label>
                        <input type="email" className="form-control" name="email" onChange={this.handleOnChange} value={this.state.email} required/>
                    </Section>

                    <Section class={"form-row input-group-lg mt-3"}>
                        <label htmlFor="password" className={"text-muted"}>Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.handleOnChange} value={this.state.password} required/>
                    </Section>

                    <Section class={"form-row input-group-lg mt-3"}>
                        <label htmlFor="password2" className={"text-muted"}>Confirm password</label>
                        <input type="password" className="form-control" name="password2" onChange={this.handleOnChange} value={this.state.password2} required/>
                    </Section>

                    <Button class={"btn btn-primary mt-5 p-2 col-12 rounded-pill font-weight-bold"} name='Sign Up' type={'submit'} onClick={this.handleSingUp} />

                    <Section class="mt-3">
                        <p className="text-center font1-1 m-0 linkx" onClick={this.props.handleSignIn}>Back to Login</p>
                        <p className="text-center font1-1 mt-1 linkx" onClick={this.props.handleForgotPW}>Forgot password?</p>
                    </Section>
                </form>
            </div>
        );
    }
}

export default SignupInput;