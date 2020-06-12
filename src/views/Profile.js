import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import NavBar from '../components/Navbar';
import NavBarMenu from '../components/NavbarMenu';
import Section from '../components/Section';
import avatar from '../images/avatar.png';
import Modal from '../components/Modal';
import $ from 'jquery';
import { getJwt } from '../helper/jwt';

var id = '';

const Experience = (props) => {
    function getId(e){
        if(e){
            console.log(e.target.dataset['id']);
            id = e.target.dataset['id'];
        }
    }

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
                        <Link to='/profile' data-id={props._id} data-toggle="modal" data-target={props.dataTargetEdit} >Edit</Link> &nbsp;
                        <Link to='/profile' data-id={props._id} data-toggle="modal" data-target={props.dataTargetDel} onClick={getId}>Delete</Link>
                    </span>
                </Section>
            </Section>
        </div>
    );
}


class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: {
                name: {
                    firstname: '',
                    lastname: ''
                },
                phone: '',
                address: {
                    state: '',
                    country: ''
                },
                experience: [],
                education: { school: [] }
            },
            email: '',
            modalInput: {
                title: '',
                company: '',
                location: '',
                description: '',
                from: '',
                to: '',
                workhere: false
            }
        }

        this.delExperience = this.delExperience.bind(this);
        this.delEducation = this.delEducation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addExperience = this.addExperience.bind(this);
    }

    async componentWillMount() {

        await axios.get('http://localhost:5000/profile', {
            headers: {
                'auth-token': getJwt()
            }
        })
        .then(response => {
            this.setState({ user: response.data.data, email: response.data.data.user.email })
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
                dataTargetDel='#delExperience'
                dataTargetEdit='#editExperience'
                key={experience._id}
                _id={experience._id} />
        });
    }

    EducationList() {
        return this.state.user.education.school.map((school, i) => {
                return <Experience
                    title={school.name}
                    company={school.course}
                    description={school.degree}
                    from={school.from}
                    to={school.to}
                    small={true}
                    dataTarget='#delEducation'
                    key={school._id}
                    _id={school._id} />
            }        
        );
    }

    async delExperience(){
        let user = this.state.user;
        if(user){
            user.experience = user.experience.filter(e => {
            return e._id !== id;
            });

            this.setState({ user: user});
            const { experience } = this.state.user;
            axios.patch('http://localhost:5000/profile/' + this.state.user._id, { experience }, {
                headers: {
                    'auth-token': getJwt()
                }
            })
            .then(async res => {
                await this.setState({ user: res.data.data });
                $('#delExperience').modal('hide');
            })
            .catch(err => console.log(err));
            console.log(this.state.user)
        }        
    }

    delEducation(){
        let user = this.state.user;
        if(user){
            user.education.school = user.education.school.filter(e => {
                return e._id !== id;
            });
            
            this.setState({ user: user});
            console.log(user.education.school)
            $('#delEducation').modal('hide');      
        }        
    }

    addExperience(e){
        e.preventDefault();
            this.state.user.experience.push(this.state.modalInput);
            const { experience } = this.state.user;

            axios.patch('http://localhost:5000/profile/' + this.state.user._id, { experience }, {
                headers: {
                    'auth-token': getJwt()
                }
            })
            .then(res => {
                this.setState({ user: res.data.data });
                $('#newExperience').modal('hide');
            })
            .catch(err => console.log(err));        
    }

    handleChange(e){
        const { value, name } = e.target;
        if(e.target.type === 'checkbox'){
            this.setState(prevState => ({
                modalInput: {
                    ...prevState.modalInput,
                    [name]: !this.state.modalInput.workhere
                }
            }));
        }
        else{
            this.setState(prevState => ({
                modalInput: {
                    ...prevState.modalInput,
                    [name]: value
                }
            }));
        }
        
        console.log(this.state.modalInput.workhere)
    }

    render() {
        return (
            <div>
                <NavBar class={"navbar navbar-dark fixed-top pt-2 pb-2 pl-4 pr-4"} stylex={{ backgroundColor: 'rgba(9,93,207, 9)' }} imgSize={"35px"} url='/profile'>
                    <NavBarMenu />
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
                                        <p>{this.state.email}</p>
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
                        </Section>

                        <Modal id='newExperience' title={"Add Experience"} handleClick={this.addExperience} btnname="Save">
                            <Section class={"form-row"}>
                                <Section class={"col-md-6"}>
                                    <label htmlFor="title" className="small">Title</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" name="title" value={this.state.modalInput.title} onChange={this.handleChange}/>
                                </Section>
                                <Section class="col-md-6">
                                    <label htmlFor="company" className="small">Company</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" name="company" value={this.state.modalInput.company} onChange={this.handleChange}/>
                                </Section>
                            </Section>

                            <Section class="form-row mt-2">
                                <Section class="col-md-12">
                                    <label htmlFor="location" className="small">Location</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" name="location" value={this.state.modalInput.location} onChange={this.handleChange}/>
                                </Section>
                            </Section>

                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-12"}>
                                    <label htmlFor="description" className="small">Description</label>
                                    <textarea rows="3" className="form-control" id="description" name="description" value={this.state.modalInput.description} onChange={this.handleChange}></textarea>
                                </Section>
                            </Section>

                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-6"}>
                                    <label htmlFor="from" className="small">From</label><span className="redx"> *</span>
                                    <input type="date" name="from" className="form-control" value={this.state.modalInput.from} onChange={this.handleChange}/>
                                </Section>

                                <Section class={"col-md-6"}>
                                    <label htmlFor="to" className="small">To</label><span className="redx"> *</span>
                                    <input type="date" name="to" id="" className="form-control" value={this.state.modalInput.to} onChange={this.handleChange}/>
                                </Section>
                            </Section>

                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-12"}>
                                    <input type="checkbox" name="workhere" id='idi' checked={this.state.modalInput.workhere} onChange={this.handleChange} />
                                    <span>I currently work here</span>
                                </Section>
                            </Section>
                        </Modal>

                        <Modal id='editExperience' title={"Edit Experience"} handleClick={this.editExperience} btnname="Save Changes">
                            <Section class={"form-row"}>
                                <Section class={"col-md-6"}>
                                    <label htmlFor="title" className="small">Title</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" name="title" value={this.state.modalInput.title} onChange={this.handleChange}/>
                                </Section>
                                <Section class="col-md-6">
                                    <label htmlFor="company" className="small">Company</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" name="company" value={this.state.modalInput.company} onChange={this.handleChange}/>
                                </Section>
                            </Section>

                            <Section class="form-row mt-2">
                                <Section class="col-md-12">
                                    <label htmlFor="location" className="small">Location</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" name="location" value={this.state.modalInput.location} onChange={this.handleChange}/>
                                </Section>
                            </Section>

                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-12"}>
                                    <label htmlFor="description" className="small">Description</label>
                                    <textarea rows="3" className="form-control" id="description" name="description" value={this.state.modalInput.description} onChange={this.handleChange}></textarea>
                                </Section>
                            </Section>

                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-6"}>
                                    <label htmlFor="from" className="small">From</label><span className="redx"> *</span>
                                    <input type="date" name="from" className="form-control" value={this.state.modalInput.from} onChange={this.handleChange}/>
                                </Section>

                                <Section class={"col-md-6"}>
                                    <label htmlFor="to" className="small">To</label><span className="redx"> *</span>
                                    <input type="date" name="to" id="" className="form-control" value={this.state.modalInput.to} onChange={this.handleChange}/>
                                </Section>
                            </Section>

                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-12"}>
                                    <input type="checkbox" name="workhere" id='idi' checked={this.state.modalInput.workhere} onChange={this.handleChange} />
                                    <span>I currently work here</span>
                                </Section>
                            </Section>
                        </Modal>

                        <Modal id='delExperience' title="Delete Experience" handleClick={this.delExperience} btnname='Delete'>
                            <p>Sure to delete?</p>
                        </Modal>
                        <Modal id='delEducation' title="Delete Education" handleClick={this.delEducation} btnname='Delete'>
                            <p>Sure to delete?</p>
                        </Modal>
                    </Section>
                </Section>
            </div>
        );
    }
}

export default Profile;