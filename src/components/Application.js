import React from 'react';
import { Link } from 'react-router-dom';
import Section from './Section';
import fs from 'fs';

const Application = (props) => {
    const img = props.companyImg ? props.companyImg : "ddd";
    return (
        <Section class="row radiusx bg-white p-5 shadow-sm mt-3">
            <Section class="col-md-3">
                <Section class="col-md-12">
                    <Section class="logosizex"
                        stylex={{ backgroundImage: `url(http://localhost:5000/${img})` }}
                        >
                    </Section>
                </Section>
            </Section>

            <Section class="col-md-5">
                <Link to={`/applications/${props.id}`} className="text-reset"><h5 className="font-weight-bold">{props.title}</h5></Link>
                <p className="font-weight-thin">{props.companyName}</p>
                <p className="font-weight-thin">{`${props.state}, ${props.country}`}</p>
            </Section>

            <Section class="col-md-4">
                <p>{props.status}</p>
            </Section>
        </Section>
    );
}

export default Application;