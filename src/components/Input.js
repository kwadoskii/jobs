import React from 'react';

const Input = (props) => {
    const [state, setState] = React.useState({
        [props.name]: ''
    });

    function handleChange(e){
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });

        console.log(value)
    }

    if(!props.isTextarea){
        return (
            <input type={props.type} className={ props.class ? " " :  "form-control" } name={props.name} value={state[props.name]} onChange={handleChange}/>
        );
    }
    else{
        return (
            <textarea rows="3" className="form-control" name={props.name} value={state[props.name]} onChange={handleChange}></textarea>
        );
    }
    
}

export default Input;