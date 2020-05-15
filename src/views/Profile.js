import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../container/Navbar';
import NavBarMenu from '../container/NavbarMenu';
import Section from '../container/Section';
import avatar from '../images/avatar.png';
import Modal from '../container/Modal';

class Profile extends Component {
    render() {
        return (
            <div>
                <NavBar class={"navbar navbar-dark fixed-top pt-2 pb-2 pl-4 pr-4"} stylex={{ backgroundColor: 'rgba(9,93,207, 9)' }} imgSize={"35px"} url='/profile'>
                    <NavBarMenu userId = "5ebdd605edd5322c442dc116"/>
                </NavBar>

                <Section class={"bg-c wrapper"}>
                    <Section class={'container p-0'}>

                        {/* Brief profile */}
                        <Section class={"row pt-6"}>
                            <Section class={'col-md-12 p-4 bluex radiusx shadow-sm'}>
                                <Section class={'form-inline'}>
                                    <img src={avatar} alt="profile" className="rounded-circle float-left" width="150px" />
                                    <Section class={'pl-3'}>
                                        <h4 className="font-weight-bold">Gabriel Abonga</h4>
                                        <p>Lagos, Nigeria</p>
                                        <p>gabrielabonga@live.com</p>
                                        <p>+2348020709941</p>
                                    </Section>
                                </Section>
                            </Section>
                        </Section>

                        {/* Profile completeness */}
                        <Section class="row mt-4 p-4 pb-5 bg-white radiusx shadow-sm">
                            <p className="font-weight-bold">Profile completeness</p>
                            <p className="text-muted">Boost the attention you receive from recruiters! Strengthen your profile by adding contact info, social links, and details about your experience and education.</p>
                            <Section class="scrolbar radiusx">
                                <p className="float-rightx font-weight-bold">100%</p>
                            </Section>
                        </Section>

                        {/* Profile experience */}
                        <Section class={"row mt-4 p-4 pb-4 bg-white radiusx shadow-sm"}>
                            <Section class={"col-md-12 p-0"}>
                                <Section class="header">
                                    <p className="float-left font-weight-bold">Experience</p>
                                    <button className="float-right btn font-weight-bold" data-toggle="modal" data-target="#newExperience">+</button>
                                </Section>
                            </Section>

                            {/* Experience Lists */}
                            <Section class={"experience pt-2 pb-2 pl-0"}>
                                <Section class={"dropdown-dividerx mtx"}></Section>
                                <Section class={"row"}>
                                    <Section class={"col-md-2"}>
                                        <p className="p-0">Nov 2018 - Current</p>
                                    </Section>

                                    <Section class={"col-md-7"}>
                                        <p className="font-weight-bold">Implementation and Support Analyst</p>
                                        <p className="small">Neulogic Solutions Limited</p>
                                        <p className="small">Lagos, Nigeria</p>
                                        <p> Provide remote support to clients.
                                            Installation, Maintenance, and Troubleshooting of Oracle
                                            database. Deployment of servers for web and mobile applications.
                                            Setting up the client’s infrastructure to handle Oracle software.
                                            </p>
                                    </Section>

                                    <Section class={"col-md-3"}>
                                        <span className="float-right">
                                            <Link to='/profile'>Edit</Link> &nbsp;
                                            <Link to='/profile'>Delete</Link>
                                        </span>
                                    </Section>
                                </Section>

                                <Section class={"dropdown-dividerx mtx"}></Section>
                                <Section class={"row"} >
                                    <Section class={"col-md-2"}>
                                        <p className="p-0">Oct 2017 - Oct 2018</p>
                                    </Section>

                                    <Section class={"col-md-7"}>
                                        <p className="font-weight-bold">Electrical Engineer (Trainee)</p>
                                        <p className="small">First Aluminium Nigeria PLC</p>
                                        <p className="small">Lagos, Nigeria</p>
                                        <p> Ensured that all electrical machinery and equipment within the factory are in working
                                            condition.
                                            Ensured a seamless 24/7 uninterrupted power supply in the factory.
                                            Successfully liaise with contractors to carry out routine maintenance exercise.
                                            </p>
                                    </Section>

                                    <Section class={"col-md-3"}>
                                        <span className="float-right">
                                            <Link to='/profile'>Edit</Link> &nbsp;
                                            <Link to='/profile'>Delete</Link>
                                        </span>
                                    </Section>
                                </Section>

                                <Section class={"dropdown-dividerx mtx"}></Section>
                                <Section class={"row"} >
                                    <Section class={"col-md-2"}>
                                        <p className="p-0">Oct 2016 - May 2017</p>
                                    </Section>

                                    <Section class={"col-md-7"}>
                                        <p className="font-weight-bold">Network Engineer (Trainee)</p>
                                        <p className="small">ipNX Nigeria Limited</p>
                                        <p className="small">Lagos, Nigeria</p>
                                        <p> Installation, Maintenance, and Troubleshooting of Small/Medium scale networks.
                                            Carry out maintenance exercise at RF base stations.
                                            Successfully migrated Wireless radio users to Optical Fiber.
                                            Successfully design, implement and maintain proactive network performance.
                                        </p>
                                    </Section>

                                    <Section class={"col-md-3"}>
                                        <span className="float-right">
                                            <Link to='/profile'>Edit</Link> &nbsp;
                                            <Link to='/profile'>Delete</Link>
                                        </span>
                                    </Section>
                                </Section>
                            </Section>
                        </Section>

                        {/* Profile education */}
                        <Section class="row mt-4 p-4 pb-4 bg-white radiusx shadow-sm">
                            <Section class="col-md-12 p-0">
                                <Section class="header">
                                    <p className="float-left font-weight-bold">Education</p>
                                    <button className="float-right btn font-weight-bold">+</button>
                                </Section>
                            </Section>

                            <Section class="col-md-12 p-0">
                                <Section class="education pt-2 pb-2 pl-0">
                                    <Section class="dropdown-dividerx mtx"></Section>
                                    <Section class="row">
                                        <Section class="col-md-2">
                                            <p className="p-0">Nov 2011 - Jul 2016</p>
                                        </Section>

                                        <Section class="col-md-7">
                                            <p className="font-weight-bold">University of Nigeria</p>
                                            <p className="small">Electronic Engineering</p>
                                            <p className="small">Bachelor</p>
                                        </Section>

                                        <Section class="col-md-3">
                                            <span className="float-right">
                                                <Link to='/profile'>Edit</Link> &nbsp;
                                                <Link to="/profile">Delete</Link>
                                            </span>
                                        </Section>
                                    </Section>

                                    <Section class="dropdown-dividerx mtx"></Section>
                                    <Section class="row">
                                        <Section class="col-md-2">
                                            <p className="p-0">Oct 2004 - Jun 2010</p>
                                        </Section>

                                        <Section class="col-md-7">
                                            <p className="font-weight-bold">Oluwa Memorial Secondary School</p>
                                            <p className="small">West African Senior School Certificate</p>
                                            <p className="small">Secondary Education</p>
                                        </Section>

                                        <Section class="col-md-3">
                                            <span className="float-right">
                                                <Link to='/profile'>Edit</Link> &nbsp;
                                                <Link to="/profile">Delete</Link>
                                            </span>
                                        </Section>
                                    </Section>
                                </Section>
                            </Section>


                            <Modal id='newExperience' title={"Add Experience"}>
                                <Section class={"form-row"}>
                                    <Section class={"col-md-6"}>
                                        <label htmlFor="title" className="small">Title</label><span className="redx"> *</span>
                                        <input type="text" className="form-control" name="title" />
                                    </Section>
                                    <Section class="col-md-6">
                                        <label htmlFor="company" className="small">Company</label><span className="redx"> *</span>
                                        <input type="text" className="form-control" name="company" />
                                    </Section>
                                </Section>

                                <Section class="form-row mt-2">
                                    <Section class="col-md-12">
                                        <label htmlFor="location" className="small">Location</label><span className="redx"> *</span>
                                        <input type="text" className="form-control" name="location" />
                                    </Section>
                                </Section>

                                <Section class={"form-row mt-2"}>
                                    <Section class={"col-md-12"}>
                                        <label htmlFor="description" className="small">Description</label>
                                        <textarea rows="3" className="form-control" id="description" name="description"></textarea>
                                    </Section>
                                </Section>

                                <Section class={"form-row mt-2"}>
                                    <Section class={"col-md-6"}>
                                        <label htmlFor="from" className="small">From</label><span className="redx"> *</span>
                                        <input type="date" name="from" id="" className="form-control" />
                                    </Section>

                                    <Section class={"col-md-6"}>
                                        <label htmlFor="to" className="small">To</label><span className="redx"> *</span>
                                        <input type="date" name="to" id="" className="form-control" />
                                    </Section>
                                </Section>

                                <Section class={"form-row mt-2"}>
                                    <Section class={"col-md-12"}>
                                        <input type="checkbox" name="workhere" />
                                        <span>I currently work here</span>
                                    </Section>
                                </Section>
                            </Modal>
                        </Section>
                    </Section>
                </Section>
            </div>
        );
    }
}

export default Profile;