import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Section from './Section'
import Button from './Button'

class ForgotPwInput extends Component {
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

                <Link to="/profile">
                    <Button class={"btn btn-primary mt-5 p-2 col-12 rounded-pill font-weight-bold"} name='Retrieve password' />
                </Link>

                <Section class="mt-3">
                    <p className="text-center font1-1 m-0 linkx" onClick={ this.props.handleSignIn }>Back to Login</p>
                    <p className="text-center font1-1 mt-1 linkx" onClick={ this.props.handleSignUp }>Back to Sign up</p>
                </Section>
            </div>
        );
    }
}

export default ForgotPwInput;
