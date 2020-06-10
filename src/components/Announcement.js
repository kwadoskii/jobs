import React from 'react';
import Section from './Section'

const Announcement = (props) => {
    return (
        <div>
            <Section class="row radiusx bg-darkx pt-4 pb-4 pl-3 shadow-sm mb-4">
                <Section class="col-md-12">
                    <p className="m-0">{props.content}</p>
                </Section>
            </Section>
        </div>
    );
}

export default Announcement;
