import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import NavbarMenu from '../components/NavbarMenu';
import Section from '../components/Section';
import Banner from '../components/Banner';
import Article from '../components/Article';
import { getJwt } from '../helper/jwt';
import bgimage from '../images/proactive-guide-to-getting-hapy-at-work.jpg' //leave for now to allow image render well


class Academy extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/posts', { headers: { 'auth-token': getJwt() } })
            .then((res) => {
                this.setState({ posts: res.data });
            })
            .catch(err => console.log(err));
    }

    AcademyList() {
        return this.state.posts.map((post) => {
            return <Article
                imgurl={post.imgurl}
                title={post.title}
                tags={post.tags}
                details={post.details}
                id={post._id}
                key={post._id}
            />
        });
    }

    render() {
        return (
            <div>
                <Navbar class={"navbar navbar-dark fixed-top pt-2 pb-2 pl-4 pr-4"} stylex={{ backgroundColor: 'rgba(9,93,207, 9)' }} imgSize={"35px"} url='/academy'>
                    <NavbarMenu />
                </Navbar>

                <Section class={"wrapper bg-c"}>

                    <Section class="container">
                        <Banner />

                        <Section class={"row"}>
                            <h5 className="font-weight-normal mt-3">Articles</h5>
                        </Section>

                        {/* articles */}
                        {this.AcademyList()}

                        <Section class={"row radiusx bg-white p-4 shadow-sm mt-4"}>
                            <p className="text-muted font1-1">As of today, SmartAcademy is available in English only. If you are waiting for a translated version of these resources, please let us know by clicking on the button below:</p>
                            <Link to='/academy'><button className="btn btn-primary rounded-pill">I'm interested in seeing articles in other languages</button></Link>
                        </Section>

                        <p className="mt-3 mb-1 p-0">Powered by</p>
                        <p className="mt-0"><span className="font-weight-bold">Smart</span> Recruiters</p>
                    </Section>
                </Section>
            </div>
        );
    }
}

export default Academy;