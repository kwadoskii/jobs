import React from 'react';

const Tag = (props) => {
    return (
        <span className="muted hashtag pl-3 pr-3 pt-2 pb-2 m-1">{props.tag}</span>
    )
}

export default Tag;