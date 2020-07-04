import React from 'react';
import { host } from '../helper/config';
import { Link } from 'react-router-dom';
import Section from './Section';

const Application = (props) => {
    const img = props.companyImg ? props.companyImg : "ddd";
    return (
        <Section class="row radiusx bg-white p-5 shadow-sm mt-3">
            <Section class="col-md-3">
                <Section class="col-md-12">
                    <Section class="logosizex"
                        stylex={{ backgroundImage: `url(${host}/${img})` }}
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
                <span className="badge badge-success p-2 pl-3 pr-3">{props.status}</span>                
            </Section>
        </Section>
    );
}

export default Application;