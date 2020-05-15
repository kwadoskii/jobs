import React from 'react';

const Button = (props) => {
    return (
        <button className={props.class}>{props.name}</button>
    );
}

export default Button;