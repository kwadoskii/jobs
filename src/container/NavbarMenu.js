import React, { Component } from 'react';
import axios from 'axios';
import Section from './Section';
import Button from './Button';
import avatar from '../images/avatar.png';
import { Link } from 'react-router-dom';

class NavbarMenu extends Component {
    state = {
        user: {
            name: {
                firstname: '',
                lastname: ''
            },
            email: ''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/'+this.props.userId)
        // axios.get('http://localhost:5000/users/5ebdd605edd5322c442dc116')
            .then(user => {
                // console.log(user.data)
                this.setState({ user: user.data })
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
                            <h5>{this.state.user.name.firstname + " " + this.state.user.name.lastname}</h5>
                            <p>{this.state.user.email}</p>
                            <Link to={ "/profile/"}>
                                <Button class="col-12 btn btn-primary rounded-pill" name={'My SmartProfile'} />
                            </Link>
                            <Section style={{'borderTop': '1px solid #e9ecef', 'height': 0, 'marginTop': '0.7rem', 'overflow': 'hidden'}} />
                            <Link className="dropdown-item" to={ "/applications"}>My Applications</Link>
                            <Section class="dropdown-divider" />
                            <Link className="dropdown-item" to="/academy">SmartAcademy</Link>
                            <Section class="dropdown-divider" />
                            <Link className="dropdown-item" to={ "/setting"}>Settings</Link>
                            {/* <Link className="dropdown-item" to={ "/setting/" + this.state.user._id }>Settings</Link> */}
                            <Section class="dropdown-divider" />
                            <Link className="dropdown-item" to="/signin">Logout</Link>
                        </Section>
                    </Section>
                </Section>
            </Section>
        );
    }
}

export default NavbarMenu;
