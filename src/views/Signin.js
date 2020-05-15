import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Navbar from '../container/Navbar';
import Section from '../container/Section';
import landingbg from '../images/landing-background.png';
import landingpr from '../images/landing-primary.png';
// import Button from '../container/Button';
import SiginInput from '../container/SiginInput'
import SignupInput from '../container/SignupInput'
import ForgotPwInput from '../container/ForgotPwInput'

function FormType(props){
    if(props.type === 0){
        return (
            <SiginInput 
                handleSignUp = { props.handleSignUp } 
                handleForgotPW = { props.handleForgotPW } 
                />
        );
    }
    if(props.type === 2){
        return (
            <ForgotPwInput
                handleSignIn = { props.handleSignIn }
                handleSignUp = { props.handleSignUp }
                />
        );
    }
    if(props.type === 1){
        return (
            <SignupInput
                handleSignIn = { props.handleSignIn }
                handleForgotPW = { props.handleForgotPW }
            />
        );
    }
    else 
    return (
        <h2>None</h2>
    );
}

class Signin extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            loginType: 0,
            logName: [
                'Login',
                'Signup',
                'Forgot password'
            ]
        }

        this.signin = this.signin.bind(this);
        this.signup = this.signup.bind(this);
        this.forgotPW = this.forgotPW.bind(this);
    }

    signin() {
        this.setState({ loginType: 0});
    }

    signup() {
        this.setState({ loginType: 1});
    }

    forgotPW() {
        this.setState({ loginType: 2});
    }

    

    render() {
        let style = {
            'backgroundColor': 'cornflowerblue',
            'backgroundImage': `url(${landingbg})`,
            'backgroundRepeat': 'no-repeat',
            'backgroundSize': 'cover'
        }

        let style2 = {
            'backgroundImage': `url(${landingpr})`,
            'backgroundSize': 'contain',
            'backgroundRepeat': 'no-repeat',
            'minHeight': '425px',
            'maxWidth': '100%',
            'backgroundPosition': '50%'
        }

        return (
            <div>
                <Section class={'pb-5'} stylex={style}>
                    <Navbar class={"navbar navbar-dark pt-2 pb-2 pl-4 pr-4"} stylex={{backgroundColor: `rgba(9,93,207, 0)`}} afontsize={{'fontSize': '2em'}} imgSize={"45px"} url='/signin'/>
                    <Section class={'row mt-4 mr-0 ml-0 pr-5 pl-5'}>
                        <Section class={'col-md-6'}>
                            <Section stylex={style2}></Section>
                            <Section class={'row text-white font1-1'}>
                                <h2 className="mt-3 mb-4 font-weight-bolder">Welcome to SmartRecruiters!</h2>
                                <p className="">We’ve simplified your job search! With your account, you can:</p>

                                <ul>
                                    <li className="mb-1"><span className="font-weight-bolder">TRACK</span> your job applications</li>
                                    <li className="mb-1"><span className="font-weight-bolder">COMMUNICATE</span> directly with the hiring team</li>
                                    <li className="mb-1"><span className="font-weight-bolder">UPDATE</span> your SmartProfile to put your best foot forward</li>
                                    <li className="mb-1"><span className="font-weight-bolder">CONTROL</span> your data and privacy settings</li>
                                </ul>

                            </Section>
                        </Section>

                        <Section class={'col-md-6'}>
                            <Section class={'offset-md-2 col-md-9 holder radiusx bg-white shadow-smx pt-5 pb-5 pl-4 pr-4'}>
                                <h3>{this.state.logName[this.state.loginType]}</h3>

                                <Section class={"form mt-5 pr-3 pl-3"}>
                                    <FormType 
                                    handleSignUp = { this.signup }
                                    handleForgotPW = { this.forgotPW }
                                    handleSignIn = { this.signin }
                                    type = { this.state.loginType } />
                                </Section>
                            </Section>
                        </Section>
                    </Section>
                </Section>
            </div>
        );
    }
}

export default Signin;
