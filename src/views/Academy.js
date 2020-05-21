import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../container/Navbar'
import NavbarMenu from '../container/NavbarMenu'
import Section from '../container/Section'
import Banner from '../container/Banner'
import bgimage from '../images/proactive-guide-to-getting-hapy-at-work.jpg'
// import bgimage2 from '../images/graduating-soon-get-ready-for-working-world.jpg'


class Article extends Component {

    TagsL() {
        return this.props.tags.map((tag, i) => <Tags tag={tag} key={i}/>);
    }
  
    render() {
        const shorten = this.props.details ? this.props.details.substring(0, 275) + '...' : '';
        return (
            <div>
                <Section class={"row radiusx bg-white p-4 shadow-sm mt-2"}>
                    <Section class={"col-md-12 p-4 bg-image"} stylex={{ 'backgroundImage': `url(${this.props.imgurl})` }}></Section>
                    <Section class={"mt-3"}>
                        <Link to={"/academy/" + this.props.id} className="text-reset"><h3>{this.props.title}</h3></Link>
                        <p className="text-muted font1-1">{shorten}</p>

                        <Section class={"hashtagholder pb-4"}>
                            {this.TagsL()}
                        </Section>
                    </Section>
                </Section>
            </div>
        );
    }
}

const Tags = (props) => {
    return (
        <span className="muted small hashtag pl-3 pr-3 pt-1 pb-1 m-1">{props.tag}</span>
    )
}

class Academy extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/posts')
            .then((res) => {
                this.setState({posts: res.data});
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    AcademyList(){
        return this.state.posts.map((post) => {
            return <Article 
                imgurl = {post.imgurl}
                title = {post.title}
                tags = {post.tags}
                details = {post.details}
                id = {post._id} />
        });
    }

    render() {
        return (
            <div>
                <Navbar class={"navbar navbar-dark fixed-top pt-2 pb-2 pl-4 pr-4"} stylex={{ backgroundColor: 'rgba(9,93,207, 9)' }} imgSize={"35px"} url='/academy'>
                    <NavbarMenu />
                </Navbar>
                
                <Section class={"wrapper bg-c"}>
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
            </div>
        );
    }
}

export default Academy;