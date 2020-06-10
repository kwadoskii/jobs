import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import NavbarMenu from '../components/NavbarMenu'
import Section from '../components/Section'
import Banner from '../components/Banner'
// import bgImage from '../images/proactive-guide-to-getting-hapy-at-work.jpg'

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/posts/' + this.props.match.params.id, )
            .then(post => {
                console.log(post.data);
                console.log(this.props.match.params.id);
                this.setState({ post: post.data })
            })
            .catch(err => console.log(err));
    }

    render() {
        const TagsL = this.state.post.tags ? this.state.post.tags.map((tag, i) => <span className="muted small hashtag pl-3 pr-3 pt-1 pb-1 m-1" key={i}>{tag}</span>) : '';
        
        return (
            <div>
                <Navbar class={"navbar navbar-dark fixed-top pt-2 pb-2 pl-4 pr-4"} stylex={{ backgroundColor: 'rgba(9,93,207, 9)' }} imgSize={"35px"} url='/academy'>
                    <NavbarMenu />
                </Navbar>

                <Section class={"wrapper bg-c"}>
                    <Banner />

                    {/* loop posts here */}
                    <Section class={"row mt-4 bg-white radiusx shadow-sm"}>
                        <Section class={"bg-image article-img"} stylex={{ backgroundImage: `url(${this.state.post.imgurl})` }}></Section>

                        <Section stylex={{ position: 'relative', top: '-7em', padding: '0 0em' }} class="pr-5 pl-5">
                            <Section class="bg-white article radius-sm">
                                <h3>{this.state.post.title}</h3>
                                <Section class="hashtagholder">
                                    {TagsL}
                                </Section>
                            </Section>

                            <Section class="main-article bg-white">
                                <p className="font1-1">
                                    {this.state.post.details}
                                </p>                                

                                <Link to="/academy"><button className="btn mt-2 rounded-pill btlist text-muted">Back to List</button></Link>
                                <p className="mt-3 mb-1 p-0">Powered by</p>
                                <p className="mt-0 font1-1">
                                    <span className="font-weight-bold">Smart</span>Recruiters
                                </p>
                            </Section>
                        </Section>
                    </Section>

                </Section>
            </div>
        );
    }
}

export default Post;
