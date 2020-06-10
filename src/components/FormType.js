import React from 'react';
import SiginInput from './SiginInput'
import SignupInput from './SignupInput'
import ForgotPwInput from './ForgotPwInput'

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

export default FormType;