import React, { Component } from 'react';
import axios from 'axios';
import Section from './Section';
import Button from './Button';
import avatar from '../images/avatar.png';
import { host, headers } from '../helper/config';
import { Link } from 'react-router-dom';
import { removeJwt } from '../helper/jwt';


class NavbarMenu extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: {
                firstname: '',
                lastname: ''
            },
            email: ''
        }

        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut(){
        removeJwt();
        // this.props.history.push('/signin');
    }

    componentDidMount(){
        axios.get(host +'/profile', headers)
            .then(({ data }) => {
                const { name, user } = data.data;
                this.setState({ name: name, email: user.email })
            }).catch(err => console.log(err));
    }

    render() {
        return (
            <Section class="form-inline">
                <Section class="btn-group">
                    <button type="button" className="btn dropdown-toggle mb-1" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false" style = {{ color: 'white' }}>
                        <img src={avatar} alt="avatar" className="rounded-circle rounded mr-2" width="36px" height="36px" />
                            MENU
                    </button>
                    <Section class={"dropdown-menu dropdown-menu-right"} stylex={{'fontSize': '1.1rem', 'minWidth': '21rem'}}>
                        <Section class={"pt-2 pl-4 pr-4 pb-2"}>
                            <h5>{this.state.name.firstname + " " + this.state.name.lastname}</h5>
                            <p>{this.state.email}</p>
                            <Link to="/profile">
                                <Button class="col-12 btn btn-primary rounded-pill" name={'My SmartProfile'} />
                            </Link>
                            <Section style={{'borderTop': '1px solid #e9ecef', 'height': 0, 'marginTop': '0.7rem', 'overflow': 'hidden'}} />
                            <Link className="dropdown-item" to={ "/applications"}>My Applications</Link>
                            <Section class="dropdown-divider" />
                            <Link className="dropdown-item" to="/academy">SmartAcademy</Link>
                            <Section class="dropdown-divider" />
                            <Link className="dropdown-item" to={ "/setting"}>Settings</Link>
                            <Section class="dropdown-divider" />
                            <Link className="dropdown-item" to="/signin" onClick={this.handleSignOut}>Sign out</Link>
                        </Section>
                    </Section>
                </Section>
            </Section>
        );
    }
}

export default NavbarMenu;