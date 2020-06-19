import React from 'react';
import Section from './Section';

const Modal = (props) => {
    const size = props.size || 'lg';
    return (
        <div>
            <div className="modal fade" id={ props.id } data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby={`new${props.id}`} aria-hidden="true">
                <div className={`modal-dialog modal-dialog-centered modal-${size}`} role="document">
                    <Section class={"modal-content"}>
                        <Section class="modal-header">
                            <p className="modal-title" id="exampleModalLabel">{ props.title }</p>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Section>

                        <Section class={"modal-body"}>
                            <form action="">
                                {props.children}

                                <Section class={"modal-footer"}>
                                    <Section class='mt-4'>
                                        <button type="button" className="btn btn-secondary fl" data-dismiss="modal">Cancel</button>
                                        <button type="submit" className="btn btn-primary fr" onClick={props.handleClick}>{(props.btnname) ? props.btnname : 'Save'}</button>
                                    </Section>                                    
                                </Section>
                            </form>
                        </Section>
                    </Section>
                </div>
            </div>
        </div>
    );
}

export default Modal;
