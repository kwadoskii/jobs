import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Section from './Section'
import Button from './Button'

class SiginInput extends Component {
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
                    <input type="password" className="form-control" name="password" />
                </Section>

                <Link to="/profile">
                    <Button class={"btn btn-primary mt-5 p-2 col-12 rounded-pill font-weight-bold"} name='Sign in' />
                </Link>

                <Section class="mt-3">
                    <p className="text-center font1-1 m-0 linkx" onClick={ this.props.handleSignUp }>Get started now</p>
                    <p className="text-center font1-1 mt-1 linkx" onClick={ this.props.handleForgotPW }>Forgot password?</p>
                    {/* <p className="text-center font1-1 m-0"><Link to="" onClick={this.signup }>Get started now</Link></p>
                    <p className="text-center font1-1 mt-1"><Link to="/" onClick={this.forgotPW }>Forgot password</Link></p> */}
                </Section>
            </div>
        );
    }
}

export default SiginInput;
