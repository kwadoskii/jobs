import React from 'react';
import Section from './Section';

const Modal = (props) => {
    return (
        <div>
            <div className="modal fade" id={ props.id } data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby={`new${props.id}`} aria-hidden="true">
                <div className='modal-dialog modal-dialog-centered modal-lg'  role="document">
                    <Section class={"modal-content"}>
                        <Section class="modal-header">
                            <p className="modal-title" id="exampleModalLabel">{ props.title }</p>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Section>

                        <Section class={"modal-body"}>
                            { props.children }
                        </Section>

                        <Section class={"modal-footer"}>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={ props.handleClick }>{ (props.btnname) ? props.btnname : 'Save Changes' }</button>
                        </Section>
                    </Section>
                </div>
            </div>
        </div>
    );
}

export default Modal;
