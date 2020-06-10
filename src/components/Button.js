import React from 'react';

const Button = (props) => {
    return (
        <button 
            className={props.class} 
            type={props.type}
            onClick={props.onClick}
            >{props.name}
        </button>
    );
}

export default Button;