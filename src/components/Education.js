import React        from 'react';
import Section      from './Section';
import { Link }     from 'react-router-dom';

const School = (props) => {
    return (
        <div>
            <Section class={"dropdown-dividerx mtx"}></Section>
            <Section class={"row"}>
                <Section class={"col-md-2"}>
                    <p className="p-0">{props.from.substring(0, 7)} - {props.to.substring(0, 7)}</p>
                </Section>

                <Section class={"col-md-7"}>
                    <p className="font-weight-bold">{props.title}</p>
                    <p className="small">{props.company}</p>
                    <p className="small">{props.location}</p>
                    <p className={props.small ? 'small' : ""}> {props.description}
                    </p>
                </Section>

                <Section class={"col-md-3"}>
                    <span className="float-right" data-id={props._id}>
                        <Link to='' name='eduedit' data-toggle="modal" data-target={props.dataTargetEdit} onClick={props.getId} >Edit</Link> &nbsp;
                        <Link to='' name ='del' data-toggle="modal" data-target={props.dataTargetDel} onClick={props.getId}>Delete</Link>
                    </span>
                </Section>
            </Section>
        </div>
    );
}

export default School;