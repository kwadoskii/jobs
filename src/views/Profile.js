import React, { Component }     from 'react';
import axios                    from 'axios';
import NavBar                   from '../components/Navbar';
import NavBarMenu               from '../components/NavbarMenu';
import Section                  from '../components/Section';
import avatar                   from '../images/avatar.png';
import Modal                    from '../components/Modal';
import Experience               from '../components/Experience';
import $                        from 'jquery';
import { getJwt }               from '../helper/jwt';


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
            modalAddExpForm: {
                title: '',
                company: '',
                location: '',
                description: '',
                from: '',
                to: '',
                workhere: false
            },
            modalEditExpForm: {
                title: '',
                company: '',
                location: '',
                description: '',
                from: '',
                to: '',
                workhere: false
            },
            strength: 55,
            dataid: ''
        }

        this.delExperience = this.delExperience.bind(this);
        this.delEducation = this.delEducation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.addExperience = this.addExperience.bind(this);
        this.editExperience = this.editExperience.bind(this);
        this.getId = this.getId.bind(this);
    }

    async componentDidMount() {
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
        return this.state.user.experience.map((experience, i) => {
            let to = experience.to;
            if (to == null) {
                to = 'Current';
            }
            return <Experience
                        title={experience.title}
                        company={experience.company}
                        description={experience.description}
                        location={experience.location}
                        from={experience.from}
                        to={to}
                        small={false}
                        dataTargetDel='#delExperience'
                        dataTargetEdit='#editExperience'
                        getId = {this.getId}
                        key={i}
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

    getId(e){
        // let id = e.target.parent.find.dataset['id'];
        let id = e.target.parentElement.dataset['id'];

        this.setState({dataid: id});

        if(e.target.name === 'edit'){
            const exp = this.state.user.experience.filter(e => {
                return e._id === id;
            });

            if(exp[0].to === null){
                exp[0].workhere = true;
                exp[0].to = exp[0].from;
            }
            else{
                exp[0].workhere = false;
            }

            this.setState({
                modalEditExpForm: {
                    title: exp[0].title,
                    company: exp[0].company,
                    location: exp[0].location,
                    description: exp[0].description,
                    from: exp[0].from.substring(0, 10),
                    to: exp[0].to.substring(0, 10),
                    workhere: exp[0].workhere
                }
            });
        }
    }

    clearModal(){
        this.setState({
            modalAddExpForm: {
                title: '',
                company: '',
                location: '',
                description: '',
                from: '',
                to: '',
                workhere: false
            },
            modalEditExpForm: {
                title: '',
                company: '',
                location: '',
                description: '',
                from: '',
                to: '',
                workhere: false
            }
        });
    }    

    async delExperience(){
        let id = this.state.dataid;
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
                await this.setState({ user: res.data.data, dataid: ''});
                $('#delExperience').modal('hide');
            })
            .catch(err => console.log(err));
        }        
    }

    delEducation(){
        let id;
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
        this.state.user.experience.push(this.state.modalAddExpForm);
        const { experience } = this.state.user;

        axios.patch('http://localhost:5000/profile/' + this.state.user._id, { experience }, {
            headers: {
                'auth-token': getJwt()
            }
        })
        .then(res => {
            this.setState({ user: res.data.data });
            $('#newExperience').modal('hide');
            this.clearModal();
        })
        .catch(err => console.log(err));        
    }

    editExperience(){
        const { modalEditExpForm, user } = this.state;

        //get the index of the experience that was modified
        const indx = user.experience.findIndex(e => e._id = this.state.dataid);
        user.experience[indx] = modalEditExpForm;
        console.log(indx)
        // $('#editExperience').modal('hide');

        axios.patch('http://localhost:5000/profile/' + this.state.user._id, {experience: user.experience }, { 
            headers: { 'auth-token': getJwt() } })
            .then(({ data }) => {
                $('#editExperience').modal('hide');
                this.setState({dataid: '', experience: data.data.experience });
                this.clearModal();
            })
            .catch(err => console.log(err));
    }

    handleChange(e){
        const { value, name } = e.target;
        if(e.target.type === 'checkbox'){
            this.setState(prevState => ({
                modalAddExpForm: {
                    ...prevState.modalAddExpForm,
                    [name]: !this.state.modalAddExpForm.workhere,
                }
            }));
            if (this.state.modalAddExpForm.workhere) { this.setState({ modalAddExpForm: { to: null } }) }
        }
        else{
            this.setState(prevState => ({
                modalAddExpForm: {
                    ...prevState.modalAddExpForm,
                    [name]: value
                }
            }));
        }        
    }

    handleChange2(e){
        const { value, name } = e.target;
        if(e.target.type === 'checkbox'){
            this.setState(prevState => ({
                modalEditExpForm: {
                    ...prevState.modalEditExpForm,
                    [name]: !this.state.modalEditExpForm.workhere
                }
            }));
            if (this.state.modalEditExpForm.workhere) { this.setState({ modalEditExpForm: { to: null } }) }
        }
        else{
            this.setState(prevState => ({
                modalEditExpForm: {
                    ...prevState.modalEditExpForm,
                    [name]: value
                }
            }));
        }
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
                            <Section class="scrolbar radiusx" stylex={{ width: `${this.state.strength}%` }}>
                                <p className="float-rightx font-weight-bold">{this.state.strength}%</p>
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
                                    <label htmlFor="ntitle" className="small">Title</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" id="ntitle" name="title" value={this.state.modalAddExpForm.title} onChange={this.handleChange}/>
                                </Section>
                                <Section class="col-md-6">
                                    <label htmlFor="ncompany" className="small">Company</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" id="ncompany" name="company" value={this.state.modalAddExpForm.company} onChange={this.handleChange}/>
                                </Section>
                            </Section>

                            <Section class="form-row mt-2">
                                <Section class="col-md-12">
                                    <label htmlFor="nlocation" className="small">Location</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" id="nlocation" name="location" value={this.state.modalAddExpForm.location} onChange={this.handleChange}/>
                                </Section>
                            </Section>

                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-12"}>
                                    <label htmlFor="ndescription" className="small">Description</label>
                                    <textarea rows="3" className="form-control" id="ndescription" name="description" value={this.state.modalAddExpForm.description} onChange={this.handleChange}></textarea>
                                </Section>
                            </Section>

                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-6"}>
                                    <label htmlFor="nfrom" className="small">From</label><span className="redx"> *</span>
                                    <input type="date" id="nfrom" name="from" className="form-control" value={this.state.modalAddExpForm.from} onChange={this.handleChange}/>
                                </Section>

                                <Section class={"col-md-6"} stylex={{ visibility: (this.state.modalAddExpForm.workhere) ? 'hidden' : 'visible' }}>
                                    <label htmlFor="nto" className="small">To</label><span className="redx"> *</span>
                                    <input type="date" name="to" id="nto" className="form-control" value={this.state.modalAddExpForm.to} onChange={this.handleChange}/>
                                </Section>
                            </Section>

                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-12"}>
                                    <input type="checkbox" name="workhere" className='mr-2' checked={this.state.modalAddExpForm.workhere} onChange={this.handleChange} />
                                    <span>I currently work here</span>
                                </Section>
                            </Section>
                        </Modal>

                        <Modal id='editExperience' title={"Edit Experience"} handleClick={this.editExperience} btnname="Save Changes">
                            <Section class={"form-row"}>
                                <Section class={"col-md-6"}>
                                    <label htmlFor="etitle" className="small">Title</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" id="etitle" name="title" value={this.state.modalEditExpForm.title} onChange={this.handleChange2}/>
                                </Section>
                                <Section class="col-md-6">
                                    <label htmlFor="ecompany" className="small">Company</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" id="ecompany" name="company" value={this.state.modalEditExpForm.company} onChange={this.handleChange2}/>
                                </Section>
                            </Section>

                            <Section class="form-row mt-2">
                                <Section class="col-md-12">
                                    <label htmlFor="elocation" className="small">Location</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" id="elocation" name="location" value={this.state.modalEditExpForm.location} onChange={this.handleChange2}/>
                                </Section>
                            </Section>

                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-12"}>
                                    <label htmlFor="edescription" className="small">Description</label>
                                    <textarea rows="3" className="form-control" id="edescription" name="description" value={this.state.modalEditExpForm.description} onChange={this.handleChange2}></textarea>
                                </Section>
                            </Section>

                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-6"}>
                                    <label htmlFor="efrom" className="small">From</label><span className="redx"> *</span>
                                    <input type="date" id="efrom" name="from" className="form-control" value={this.state.modalEditExpForm.from} onChange={this.handleChange2}/>
                                </Section>

                                <Section class={"col-md-6"} stylex={{ visibility: (this.state.modalEditExpForm.workhere) ? 'hidden' : 'visible' }}>
                                    <label htmlFor="eto" className="small">To</label><span className="redx"> *</span>
                                    <input type="date" id="eto" name="to" className="form-control" value={this.state.modalEditExpForm.to} onChange={this.handleChange2}/>
                                </Section>
                            </Section>

                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-12"}>
                                    <input type="checkbox" name="workhere" className="mr-2" checked={this.state.modalEditExpForm.workhere} onChange={this.handleChange2} />
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