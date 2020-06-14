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
import Education                from '../components/Education';


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
                workhere: ''
            },
            strength: 100,
            dataid: '',
            modalAddEduForm: {
                name: '',
                course: '',
                degree: '',
                from: '',
                to: ''
            },
            modalEditEduForm: {
                name: '',
                course: '',
                degree: '',
                from: '',
                to: ''
            }
        }

        this.addExperience = this.addExperience.bind(this);
        this.editExperience = this.editExperience.bind(this);
        this.delExperience = this.delExperience.bind(this);
        this.addEducation = this.addEducation.bind(this);
        this.editEducation = this.editEducation.bind(this);
        this.delEducation = this.delEducation.bind(this);
        this.getId = this.getId.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    async componentDidMount() {
        await axios.get('http://localhost:5000/profile', {
            headers: {
                'auth-token': getJwt()
            }
        })
        .then(({data}) => {
            this.setState( prevState => ({ ...prevState.user, user: data.data, email: data.data.user.email }));
        }).catch(err => console.log(err));
    }

    ExperienceList() {
        return this.state.user.experience.map((experience) => {
            let to = experience.to;
            to = (to === null || to === '') ? 'Present' : '';
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
                        key={experience._id}
                        _id={experience._id} />
        });
    }

    EducationList() {
        return this.state.user.education.school.map((school) => {
            return <Education
                title={school.name}
                company={school.course}
                description={school.degree}
                from={school.from}
                to={school.to}
                small={true}
                dataTargetDel='#delEducation'
                dataTargetEdit='#editEducation'
                getId = {this.getId}
                key={school._id}
                _id={school._id} />
            }        
        );
    }

    getId(e){
        let id = e.target.parentElement.dataset['id'];
        this.setState({ dataid: id });

        if(e.target.name === 'edit'){
            const exp = this.state.user.experience.find(e => {
                return e._id === id;
            });

            if(exp.to === '' || exp.to === null){
                exp.workhere = true;
                exp.to = '';            
            }
            else{
                exp.workhere = false;
                exp.to = exp.to.substring(0, 10);
            }

            this.setState(prevState => ({
                ...prevState.modalEditExpForm,
                modalEditExpForm: {
                    title: exp.title,
                    company: exp.company,
                    location: exp.location,
                    description: exp.description,
                    from: exp.from.substring(0, 10),
                    to: exp.to,
                    workhere: exp.workhere
                }
            }));
        }

        if(e.target.name === 'eduedit'){
            const edu = this.state.user.education.school.find(e => {
                return e._id === id;
            });

            edu.from = edu.from.substring(0, 10);
            edu.to = edu.to.substring(0, 10);

            this.setState(prevState => ({
                ...prevState.modalEditEduForm,
                modalEditEduForm: {
                    ...edu
                }
            }));
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
            },
            modalAddEduForm: {
                name: '',
                course: '',
                degree: '',
                from: '',
                to: ''
            },
            modalEditEduForm : {
                name: '',
                course: '',
                degree: '',
                from: '',
                to: ''
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

    delEducation() {
        const { dataid, user } = this.state;
        if (user) {
            user.education.school = user.education.school.filter(e => {
                return e._id !== dataid;
            });

            this.setState({ user: user, dataid: '' });
            const { education } = this.state.user;

            axios.patch('http://127.0.0.1:5000/profile/' + this.state.user._id, { education }, {
                headers: { 'auth-token': getJwt() }
            })
                .then(({ data }) => {
                    this.setState({ user: data.data, dataid: '' });
                    $('#delEducation').modal('hide');
                })
                .catch(err => console.log(err));
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
        const id = this.state.dataid;
        const { modalEditExpForm, user } = this.state;

        //get the index of the experience that was modified
        // const indx = user.experience.findIndex(e => e._id = id);
        // user.experience[indx] = modalEditExpForm;
        // this.setState({ user: user });
        // console.log(indx)

        //trial 3
        let editedUserExperience = user.experience.map(obj => {
            return obj._id === id ? { ...modalEditExpForm, _id: id } : obj;
        });

        this.setState(prevState => ({
            user: {
                ...prevState.user,
                experience: editedUserExperience
            }, dataid: ''
        }));

        const { experience } = this.state.user;

        axios.patch('http://localhost:5000/profile/' + this.state.user._id, { experience: experience }, { 
            headers: { 'auth-token': getJwt() } })
            .then(({ data }) => {
                $('#editExperience').modal('hide');
                this.setState({dataid: '', user: data.data });
                this.clearModal();
            })
            .catch(err => console.log(err));
    }

    addEducation(e){
        e.preventDefault();
        this.state.user.education.school.push(this.state.modalAddEduForm);
        const { education } = this.state.user;

        axios.patch('http://localhost:5000/profile/'+ this.state.user._id, { education }, {
            headers: { 'auth-token': getJwt() }
        })
        .then(({ data }) => {
            this.setState({ user: data.data });
            $('#newEducation').modal('hide');
            this.clearModal();
        })
        .catch(err => console.log(err));
        console.log('add education');
    }

    async editEducation(e){ //let this async for beta setState
        e.preventDefault();
        const { modalEditEduForm, user, dataid } = this.state;

        let editedEdu = user.education.school.map(obj => {
            return obj._id === dataid ? { ...modalEditEduForm, _id: dataid } : obj;
        });

        await this.setState(prevState => ({
            user: {
                ...prevState.user,
                education: {
                    ...prevState.user.education,
                    school: editedEdu
                }
            }, dataid: ''
        }));

        const { education } = this.state.user;
        console.log(education )
        axios.patch('http://localhost:5000/profile/' + this.state.user._id, { education: education }, { headers: { 'auth-token': getJwt() } })
            .then(({ data }) => {
                this.setState({ user: data.data, dataid: '' });
                this.clearModal();
                $('#editEducation').modal('hide');
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

            if (this.state.modalAddExpForm.workhere) {
                this.setState(prevState => ({
                    modalAddExpForm: { ...prevState.modalAddExpForm, to: '' }
                }))
            }
        }
        else{
            this.setState(prevState => ({
                modalAddExpForm: {
                    ...prevState.modalAddExpForm,
                    [name]: value
                }, 
                modalAddEduForm: {
                    ...prevState.modalAddEduForm,
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
                    [name]: !this.state.modalEditExpForm.workhere,
                    to: ''
                }
            }));
        }
        else{
            this.setState(prevState => ({
                modalEditExpForm: {
                    ...prevState.modalEditExpForm,
                    [name]: value
                },
                modalEditEduForm: {
                    ...prevState.modalEditEduForm,
                    [name]: value
                }
            }));
        }
    }

    render() {
        if(this.state.user.address === undefined){
            var country = '';
            var state =  '';
        } else {
            country = this.state.user.address.country;
            state = this.state.user.address.state;
        }

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
                                        <p>{state  + ',' + country}</p>
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
                                    <button className="float-right btn font-weight-bold" data-toggle='modal' data-target='#newEducation'>+</button>
                                </Section>
                            </Section>

                            <Section class="col-md-12 p-0">
                                <Section class="education pt-2 pb-2 pl-0">
                                    {this.EducationList()}
                                </Section>
                            </Section>
                        </Section>


                        {/* Experience modals */}
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
                                    <input type="text" className="form-control" id="etitle" name="title" value={this.state.modalEditExpForm.title } onChange={this.handleChange2}/>
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


                        {/* Education modals*/}
                        <Modal id='newEducation' title="Add Education" handleClick={this.addEducation} btnname='Save'>
                            <Section class={"form-row"}>
                                <Section class={"col-md-12"}>
                                    <label htmlFor="nname" className="small">University</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" id="nname" name="name" value={this.state.modalAddEduForm.name} onChange={this.handleChange} />
                                </Section>
                            </Section>
                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-6"}>
                                    <label htmlFor="ncourse" className="small">Course</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" id="ncourse" name="course" value={this.state.modalAddEduForm.course} onChange={this.handleChange} />
                                </Section>
                                <Section class="col-md-6">
                                    <label htmlFor="ndegree" className="small">Degree</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" id="ndegree" name="degree" value={this.state.modalAddEduForm.degree} onChange={this.handleChange} />
                                </Section>
                            </Section>
                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-6"}>
                                    <label htmlFor="nefrom" className="small">From</label><span className="redx"> *</span>
                                    <input type="date" id="nefrom" name="from" className="form-control" value={this.state.modalAddEduForm.from} onChange={this.handleChange}/>
                                </Section>

                                <Section class={"col-md-6"} stylex={{ visibility: (this.state.modalAddExpForm.workhere) ? 'hidden' : 'visible' }}>
                                    <label htmlFor="neto" className="small">To</label><span className="redx"> *</span>
                                    <input type="date" name="to" id="neto" className="form-control" value={this.state.modalAddEduForm.to} onChange={this.handleChange}/>
                                </Section>
                            </Section>
                        </Modal>


                        <Modal id='editEducation' title="Edit Education" handleClick={this.editEducation} btnname='Save'>
                            <Section class={"form-row"}>
                                <Section class={"col-md-12"}>
                                    <label htmlFor="ename" className="small">University</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" id="ename" name="name" value={this.state.modalEditEduForm.name} onChange={this.handleChange2} />
                                </Section>
                            </Section>
                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-6"}>
                                    <label htmlFor="ecourse" className="small">Course</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" id="ecourse" name="course" value={this.state.modalEditEduForm.course} onChange={this.handleChange2} />
                                </Section>
                                <Section class="col-md-6">
                                    <label htmlFor="edegree" className="small">Degree</label><span className="redx"> *</span>
                                    <input type="text" className="form-control" id="edegree" name="degree" value={this.state.modalEditEduForm.degree} onChange={this.handleChange2} />
                                </Section>
                            </Section>
                            <Section class={"form-row mt-2"}>
                                <Section class={"col-md-6"}>
                                    <label htmlFor="eefrom" className="small">From</label><span className="redx"> *</span>
                                    <input type="date" id="eefrom" name="from" className="form-control" value={this.state.modalEditEduForm.from} onChange={this.handleChange2}/>
                                </Section>

                                <Section class={"col-md-6"} stylex={{ visibility: (this.state.modalAddExpForm.workhere) ? 'hidden' : 'visible' }}>
                                    <label htmlFor="eeto" className="small">To</label><span className="redx"> *</span>
                                    <input type="date" name="to" id="eeto" className="form-control" value={this.state.modalEditEduForm.to} onChange={this.handleChange2}/>
                                </Section>
                            </Section>
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