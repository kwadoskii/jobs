import React, { Component } from 'react';
import NavBar from '../components/Navbar';
import NavBarMenu from '../components/NavbarMenu';
import Section from '../components/Section';
import Announcement from '../components/Announcement';
import { host, headers } from '../helper/config';
import Axios from 'axios';
import ApplicationC from '../components/Application';

class Application extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            anouncement: '',
            application: []
        }
    }

    componentDidMount() {
        Axios.get(host + '/settings/anouncement/latest')
            .then(({ data: { data: { anouncement } } }) => {
                this.setState({ anouncement: anouncement.title });
            })
            .catch(err => console.log(err));

        Axios.get(host + '/users/application', headers())
            .then(({ data: { data } }) => {
                this.setState({ application: data });
            })
            .catch(err => console.log(err));
    }

    ApplicationList () {
        const { application } = this.state;

        if (application.length > 0) {
            return application.map((application) => {
                // console.log(application.vacancy.company.logo.data.data.map(e => {return e}).join('').toString('base64'))
                return (
                    <ApplicationC
                        title={application.vacancy.title}
                        companyName={application.vacancy.company.name}
                        state={application.vacancy.company.address.state}
                        country={application.vacancy.company.address.country}
                        status={application.status}
                        companyImg={application.vacancy.company.logolink}
                        id={application._id}
                        key={application._id}
                    />)
            });
        }
    }
    
    
    render() {
        return (
            <div>
                 <NavBar class={"navbar navbar-dark fixed-top pt-2 pb-2 pl-4 pr-4"} stylex={{ backgroundColor: 'rgba(9,93,207, 0.9)' }} imgSize={"35px"} url='/applications'>
                    <NavBarMenu />
                </NavBar>

                <Section class='wrapper bg-c'>
                    <Announcement content={`NEW: ${this.state.anouncement}`} />

                    {this.ApplicationList()}

                    <p className="mt-3 mb-1 p-0">Powered by</p>
                    <p className="mt-0"><span className="font-weight-bold">Smart</span> Recruiters</p>
                </Section>
            </div>
        );
    }
}

export default Application;