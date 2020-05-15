import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../container/Navbar';
import NavBarMenu from '../container/NavbarMenu';
import Section from '../container/Section';
import avatar from '../images/hotel-direct.png';
import avatar2 from '../images/wooden-tree.png';
import Announcement from '../container/Announcement'

class Application extends Component {
    render() {
        return (
            <div>
                 <NavBar class={"navbar navbar-dark fixed-top pt-2 pb-2 pl-4 pr-4"} stylex={{ backgroundColor: 'rgba(9,93,207, 0.9)' }} imgSize={"35px"} url='/applications'>
                    <NavBarMenu />
                </NavBar>

                <Section class='wrapper bg-c'>
                    <Announcement content="NEW: Now you can easily manage your application attachments! Just open application details and check out all the details there."/>

                    <Section class="row radiusx bg-white p-5 shadow-sm mt-3">
                        <Section class="col-md-3">
                            <Section class="col-md-12">
                                <Section class="logosizex"
                                    stylex={{backgroundImage: `url(${avatar})`}}>
                                </Section>
                            </Section>
                        </Section>

                        <Section class="col-md-5">
                            <Link to="/applications/one" className="text-reset"><h5 class="font-weight-bold">Hospitality Manager</h5></Link>
                            <p className="font-weight-thin">Hotel Direct</p>
                            <p className="font-weight-thin">Lagos, Nigeria</p>
                        </Section>

                        <Section class="col-md-4">
                            <p>In review</p>
                        </Section>
                    </Section>

                    <Section class="row radiusx bg-white p-5 shadow-sm mt-3">
                        <Section class="col-md-3">
                            <Section class="col-md-12">
                                <Section class="logosizex"
                                    stylex={{backgroundImage: `url(${avatar2})`}}>
                                </Section>
                            </Section>
                        </Section>

                        <Section class="col-md-5">
                            <Link to="/applications/two" class="text-reset"><h5 class="font-weight-bold">PHP Engineer (Senior and Intermediate)</h5></Link>
                            <p className="font-weight-thin">Wooden Trees</p>
                            <p className="font-weight-thin">Lagos, Nigeria</p>
                        </Section>

                        <Section class="col-md-4">
                            <p>New</p>
                        </Section>
                    </Section>

                    <p className="mt-3 mb-1 p-0">Powered by</p>
                    <p className="mt-0"><span className="font-weight-bold">Smart</span> Recruiters</p>
                </Section>
            </div>
        );
    }
}

export default Application;