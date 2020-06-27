import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import NavbarMenu from '../components/NavbarMenu'
import Section from '../components/Section'
import avatar from '../images/avatar.png';
import logo from '../images/hotel-direct.png';
import thumb from '../images/thumb.png';

class ApplicationDetails extends Component {
    render() {
        return (
            <div>
                <Navbar class={"navbar navbar-dark fixed-top pt-2 pb-2 pl-4 pr-4"} stylex={{ backgroundColor: 'rgba(0,0,0, 0.4)' }} imgSize={"35px"} url='/applications/one'>
                    <NavbarMenu />
                </Navbar>

                <Section stylex={{ position: 'relative', paddingTop: '36px', backgroundColor: 'rgb(52,50,46)', height: ' 281px', top: '0em' }}>
                    <Section class="">
                        <Section class="container containerx shadow-sm">
                            <Section class="row">
                                <Section class="col-12">
                                    <Section class="row">
                                        <Section class="col-4">
                                            <Section class="col-12 logosizex"
                                                stylex={{ backgroundImage: `url(${logo})` }}>
                                            </Section>
                                        </Section>

                                        <Section class="col-8">
                                            <Link to="/jobDetails">
                                                <h4>PHP Engineer (Senior and Intermediate)</h4>
                                            </Link>
                                            <p>Hotel Direct - Lagos, Nigeria</p>
                                        </Section>
                                    </Section>
                                </Section>
                            </Section>
                        </Section>
                    </Section>
                </Section>

                <Section class="bg-c">
                    <Section class="container-md">
                        <Section class="row ptx pb-5">
                            <Section class="col-md-7 m-2 radiusx bg-white shadow-sm">
                                <Section class="p-4">
                                    <h5 className="pb-4">Company Description</h5>
                                    <p className="companyDesc">
                                        Our partner Axxess, is the fastest growing home health technology company in USA. At Axxess,
                                        we do
                                        business differently, by empowering you to build the technology to create mind-blowing,
                                        first-to-market, superior products - leading healthcare into the future. We build the best
                                        because
                                        we only hire the best.
                                    </p>

                                    <p>
                                        We are an open, agile environment, where transparent conversation ignites collaboration with
                                        a team
                                        of great thinkers. Everyone freely contributes, ideas override egos, and the best idea
                                        always wins.
                                        We embrace new technologies and pride ourselves on sustainable and quality code. In our
                                        world,
                                        opportunity paired with imagination is limitless and we build what others can only hope to
                                        dream.
                                        We’ve created an atmosphere allowing you to produce your best work, by catering to the
                                        creative.
                                    </p>
                                    <p>This is a full-time, salaried role, based in our Lagos, Nigeria office.</p>
                                </Section>
                            </Section>
                            <Section class="m-2 fill radiusx bg-white shadow-sm">
                                <Section class="p-4">
                                    <Section>
                                        <h5 className="float-left">Attachment</h5>
                                        <button type="button" className="float-right btn btn-outline-primary">Add</button>
                                    </Section>
                                    <Section class="dropdown-dividerx"></Section>
                                    <Section class="row attachmentHolder mt-2">
                                        <Section class="col-8">
                                            <Section class="attachment">Gabriel's Resume WO 20_APR_20.pdf</Section>
                                        </Section>
                                        <Section class="col-4">
                                            <Section class="btn"><Link to="">Delete</Link></Section>
                                        </Section>
                                    </Section>
                                    <Section class="row attachmentHolder mt-2">
                                        <Section class="col-8">
                                            <Section class="attachment">Gabriel's Resume WO 20_APR_20.pdf</Section>
                                        </Section>
                                        <Section class="col-4">
                                            <Section class="btn"><Link to="">Delete</Link></Section>
                                        </Section>
                                    </Section>
                                </Section>
                            </Section>
                        </Section>

                        <Section class="row bg-white p-4 radiusx shadow-sm">
                            <Section class="col-md-12">
                                <Section class="imageholder">
                                    <Section class="float-left">
                                        <img src={avatar} alt="avatar" className="rounded-circle" width="35px" height="35px" />
                                        <strong className="pl-2">Gabriel Abonga</strong>
                                    </Section>
                                    <Section class="float-right">
                                        <p>20 Apr 2020</p>
                                    </Section>
                                </Section>

                                <Section class="dropdown-dividerx"></Section>

                                <Section class="coverLetter">
                                    <p>
                                        My name is Gabriel Abonga, a graduate of the University of Nigeria, Nsukka, with
                                        Second Class Honors Upper Division in Electronic Engineering.
                                    </p>

                                    <p>
                                        I wish to apply for the position of PHP Engineer currently being advertised in your firm. I
                                        believe the knowledge I have acquired through my course work and the skills I picked up over
                                        my course of working in the Information Technology industry makes me an ideal candidate for
                                        this opening.
                                    </p>

                                    <p>
                                        I am interested in this position as it appeals directly to my passion for working in a
                                        fast-paced information technology environment. As a developer this role appears directly to
                                        me, I equally write PHP, HTML, CSS, SCSS, Javascript, React, SQL, NO-SQL and JQuery.
                                    </p>

                                    <p>
                                        In addition to my degree qualification, I also took a course towards public management where
                                        I got a certification from the Chartered Institute of Public Managers of Nigeria.
                                    </p>

                                    <p>
                                        Thank you for I believe you would acknowledge my request.
                                    </p>
                                </Section>

                            </Section>
                        </Section>

                        <Section class="row mt-4">
                            <Section class="col-md-12 radiusx bg-white p-4 shadow-sm">
                                <img src={thumb} alt="interest" />
                                <span className="pl-4">You expressed interest in <Link to="/applications/one">PHP Engineer (Senior and Intermediate)</Link>.</span>
                            </Section>
                        </Section>

                        <Section class="footer mt-2">
                            <Section class="center">
                                <p className="text-center m-0 text-reset"><small>SMARTRECRUITERS <Link to='/applications/one' className="text-reset">PRIVACY POLICY</Link>  AND <Link to='/applications/one' className="text-reset">TERMS OF USE</Link></small></p>
                                <p className="text-center m-0"><small>No longer interested in being considered? <Link to='/applications/one' className="text-reset">View options</Link></small></p>
                            </Section>
                        </Section>
                    </Section>
                </Section>
            </div>
        );
    }
}

export default ApplicationDetails;
