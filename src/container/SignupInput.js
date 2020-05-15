import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Section from './Section'
import Button from './Button'

class SignupInput extends Component {
    // constructor(props){
    //     super(props);
    // }

    render() {
        return (
            <div>
                <Section class={"form-row input-group-lg"}>
                    <label htmlFor="email" className=" text-muted">Email</label>
                    <input type="email" className="form-control" name="email" />
                </Section>

                <Section class={"form-row input-group-lg mt-3"}>
                    <label htmlFor="password" className={"text-muted"}>Password</label>
                    <input type="password" className="form-control" name="password1" />
                </Section>

                <Section class={"form-row input-group-lg mt-3"}>
                    <label htmlFor="password" className={"text-muted"}>Confirm password</label>
                    <input type="password" className="form-control" name="password2" />
                </Section>

                <Link to="/profile">
                    <Button class={"btn btn-primary mt-5 p-2 col-12 rounded-pill font-weight-bold"} name='Sign Up' />
                </Link>

                <Section class="mt-3">
                    <p className="text-center font1-1 m-0 linkx" onClick={ this.props.handleSignIn }>Back to Login</p>
                    <p className="text-center font1-1 mt-1 linkx" onClick={ this.props.handleForgotPW }>Forgot password?</p>
                </Section>
            </div>
        );
    }
}

export default SignupInput;
