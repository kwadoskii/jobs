import React, { Component } from 'react';
import Tag from './Tag';
import Section from './Section';
import { Link } from 'react-router-dom';

class Article extends Component {
    
    TagsL() {
        return this.props.tags.map((tag, i) => <Tag tag={tag} key={i}/>);
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

export default Article;