import React from 'react';
import Section from './Section';

const Attachments = (props) => {
    return (
        <Section class="row attachmentHolder mt-2" >
            <Section class="col-8">
                <Section class="attachment"><p>{props.filename}</p></Section>
            </Section>
            <Section class="col-4" >
                <Section class="btn" stylex={{ padding: 0, float: 'right' }}>
                    <p className='linkx' onClick={props.handleOnClick} data-id= {props.id}>Delete</p>
                </Section>
            </Section>
        </Section>
    );
}

export default Attachments;