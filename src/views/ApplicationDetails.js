import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import NavbarMenu from '../components/NavbarMenu'
import Section from '../components/Section'
import avatar from '../images/avatar.png';
import thumb from '../images/thumb.png';
import { getJwt} from '../helper/jwt';
import Axios from 'axios';

class ApplicationDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            application: {
                vacancy: {
                    company: {
                        address: {
                            state: '',
                            country: ''
                        },
                        name: '',
                        logolink: '',
                        description: '',
                    },
                    title: ''
                }
            },
            profile: {
                name: {
                    firstname: '',
                    lastname: ''
                },
                coverLetter: ''
            }
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/users/application/' + this.props.match.params.id, { headers: { 'auth-token': getJwt() } })
            .then(({data}) => {
                this.setState({ application: data.data })
                Axios.get('http://localhost:5000/profile/' + data.data.user, { headers: { 'auth-token': getJwt() } })
                    .then(({ data: { data } }) => {
                        this.setState(prevState => ({
                            ...prevState,
                            profile: {
                                ...prevState.profile,
                                name: {
                                    ...prevState.profile.name,
                                    firstname: data.name.firstname,
                                    lastname: data.name.lastname
                                },
                                coverLetter: data.coverletter
                            }}));
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));        
    }   
    
    
    render() {
        return (
            <div>
                <Navbar class={"navbar navbar-dark fixed-top pt-2 pb-2 pl-4 pr-4"} stylex={{ backgroundColor: 'rgba(0,0,0, 0.4)' }} imgSize={"35px"}>
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
                                                stylex={{ backgroundImage: `url(http://localhost:5000/${this.state.application.vacancy.company.logolink})` }}>
                                            </Section>
                                        </Section>

                                        <Section class="col-8">
                                            <Link to="/jobDetails">
                                                <h4>{this.state.application.vacancy.title}</h4>
                                            </Link>
                                            <p>{`${this.state.application.vacancy.company.name} - ${this.state.application.vacancy.company.address.state}, ${this.state.application.vacancy.company.address.country}`}</p>
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
                                        {this.state.application.vacancy.company.description}
                                    </p>
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
                                        <strong className="pl-2">{`${this.state.profile.name.firstname} ${this.state.profile.name.lastname}`}</strong>
                                    </Section>
                                    <Section class="float-right">
                                        <p>{`{20 Apr 2020}`}</p>
                                    </Section>
                                </Section>

                                <Section class="dropdown-dividerx"></Section>

                                <Section class="coverLetter">
                                    {this.state.profile.coverLetter}
                                </Section>

                            </Section>
                        </Section>

                        <Section class="row mt-4">
                            <Section class="col-md-12 radiusx bg-white p-4 shadow-sm">
                                <img src={thumb} alt="interest" />
                                <span className="pl-4">You expressed interest in <Link to="/jobDetails">{this.state.application.vacancy.title}</Link>.</span>
                            </Section>
                        </Section>

                        <Section class="footer mt-2">
                            <Section class="center">
                                <p className="text-center m-0 text-reset"><small>SMARTRECRUITERS <Link to='/applications' className="text-reset">PRIVACY POLICY</Link>  AND <Link to='/applications' className="text-reset">TERMS OF USE</Link></small></p>
                                <p className="text-center m-0"><small>No longer interested in being considered? <Link to='/applications' className="text-reset">View options</Link></small></p>
                            </Section>
                        </Section>
                    </Section>
                </Section>
            </div>
        );
    }
}

export default ApplicationDetails;