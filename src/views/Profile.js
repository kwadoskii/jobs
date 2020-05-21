import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import NavBar from '../container/Navbar';
import NavBarMenu from '../container/NavbarMenu';
import Section from '../container/Section';
import avatar from '../images/avatar.png';
import Modal from '../container/Modal';


const Experience = (props) => {
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
                    <span className="float-right">
                        <Link to='/profile'>Edit</Link> &nbsp;
                        <Link to='/profile'>Delete</Link>
                    </span>
                </Section>
            </Section>
        </div>
    );
}


class Profile extends Component {
    state = {
        user: {
            name: {},
            email: '',
            phone: '',
            address: {},
            experience: [],
            education: { school: [] }
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/5ec6c2604122631efc492d72')
            .then(user => {
                this.setState({ user: user.data })
            }).catch(err => console.log(err));
    }

    ExperienceList() {
        return this.state.user.experience.map((experience) => {
            if (experience.to == null) {
                experience.to = 'Current';
            }
            return <Experience
                title={experience.title}
                company={experience.company}
                description={experience.description}
                location={experience.location}
                from={experience.from}
                to={experience.to}
                small={false}
                key={experience._id}
                _id={experience._id} />
        });
    }

    EducationList() {
        // if (this.state.user.education.school) {
        return this.state.user.education.school.map((school, i) => {
                console.log(school)
                return <Experience
                    title={school.name}
                    company={school.course}
                    description={school.degree}
                    from={school.from}
                    to={school.to}
                    small={true}
                    key={school._id}
                    _id={school._id} />
            }        
        );
        // }
    }

    render() {
        // this.state.user.name.firstname
        // this.state.user.education[0] = (this.state.user.education === undefined) ? '' : this.state.user.education[0];
        return (
            <div>
                <NavBar class={"navbar navbar-dark fixed-top pt-2 pb-2 pl-4 pr-4"} stylex={{ backgroundColor: 'rgba(9,93,207, 9)' }} imgSize={"35px"} url='/profile'>
                    <NavBarMenu userId="5ec6c2604122631efc492d72" />
                </NavBar>

                <Section class={"bg-c wrapper"}>
                    <Section class={'container p-0'}>

                        {/* Brief profile */}
                        <Section class={"row pt-6"}>
                            <Section class={'col-md-12 p-4 bluex radiusx shadow-sm'}>
                                <Section class={'form-inline'}>
                                    <img src={avatar} alt="profile" className="rounded-circle float-left" width="150px" />
                                    <Section class={'pl-3'}>
                                        <h4 className="font-weight-bold">{this.state.user.name.firstname + " " + this.state.user.name.lastname}</h4>
                                        <p>{`${this.state.user.address.state}, ${this.state.user.address.country}`}</p>
                                        <p>{this.state.user.email}</p>
                                        <p>{this.state.user.phone}</p>
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
                            <Section class={"experience pt-2 pb-2 pl-0 container"}>
                                {/* <Section class={"dropdown-dividerx mtx"}></Section> */}
                                {this.ExperienceList()}
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
                                    {this.EducationList()}
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