import React from 'react';

const Section = (props) => {
    return (
        <div className={props.class} style={props.stylex}>
            {props.children}
        </div>
    );
}

export default Section;