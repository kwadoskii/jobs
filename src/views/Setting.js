import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'
import NavbarMenu from '../components/NavbarMenu';
import Section from '../components/Section';
import Modal from '../components/Modal';
import lock from '../images/lock.png';
import globe from '../images/globe.png';
import upload from '../images/upload.png';
import idcard from '../images/idcard.png';
import { host, headers } from '../helper/config';
import Axios from 'axios';
import $ from 'jquery';

class Setting extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentp: '',
            password: '',
            password2: '',
            error: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }
    
    handleOnChange({ target: { value, name } }) {
        this.setState({
            [name]: value
        });
    }

    clearForm(){
        this.setState({
            currentp: '',
            password: '',
            password2: '',
            error: ''
        });
    }

    exportData(e){
        e.preventDefault();
        
        //export profile to user as a download
        fetch(host + '/profile/download', headers())
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'profile.json';
					a.click();
				});
		});
    }

    changePassword(e){
        const { password, password2, currentp } = this.state;
        if(password !== password2){
            this.setState({ error: 'pw does not match'});
            e.preventDefault();
            return;            
        }
        if(password === '' || password2 === '' || currentp === ''){
            this.setState({ error: 'Fill all fields'}); 
            e.preventDefault();
            return;        
        }
        
        e.preventDefault();
        Axios.patch(host + '/users/changepassword', { password, currentp }, headers())
            .then(({ data }) => {
                this.clearForm();
                $('#changepassword').modal('hide');
                localStorage.removeItem('auth-token');
                this.props.history.push('/signin');
            }).catch(err => console.log(err));        
    }

    render() {
        return (
            <div>
                <Navbar class={"navbar navbar-dark fixed-top pt-2 pb-2 pl-4 pr-4"} stylex={{ backgroundColor: 'rgba(9,93,207, 9)' }} imgSize={"35px"} url='/setting'>
                    <NavbarMenu />
                </Navbar>

                <Section class={"bg-c wrapper p-5"}>
                    {/* Change password */}
                    <Section class={"radiusx bg-white p-4 pl-0 shadow-sm"}>
                        <Section class={"row p-2"}>
                            <Section class={"col-md-1 align-middle"}>
                                <img src={lock} alt="lock" width="30px" />
                            </Section>

                            <Section class={"col-md-11"}>
                                <Link to="/setting" className={"font1-1 p-0 m-0"} data-toggle="modal" data-target="#changepassword">Change my password</Link>
                            </Section>
                        </Section>
                    </Section>

                    {/* Change Language */}
                    <Section class={"radiusx bg-white p-4 pl-0 shadow-sm mt-4"}>
                        <Section class={"row p-2"}>
                            <Section class={"col-md-1 align-middle"}>
                                <img src={globe} alt="world" width="30px" />
                            </Section>

                            <Section class={"col-md-4"}>
                                <p className="font1-1 p-0 m-0">Change language</p>
                            </Section>

                            <Section class={"col-md-7"}>
                                <select name="lang" id="lang" className="form-control">
                                    <option value="English">English</option>
                                    <option value="German">German</option>
                                    <option value="Latin">Latin</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Spanish">Spanish</option>
                                </select>
                            </Section>
                        </Section>
                    </Section>

                    {/* Export Profile */}
                    <Section class={"radiusx bg-white p-4 pl-0 shadow-sm mt-4"}>
                        <Section class={"row p-2"}>
                            <Section class={"col-md-1 align-middle"}>
                                <img src={upload} alt="upload" width="30px" />
                            </Section>

                            <Section class={"col-md-11"}>
                                <p className="font1-1 p-0 m-0">Export my SmartProfile data</p>
                                <Section class={"mt-2"}>
                                    <Link to="" className="font1-1 p-0" onClick={this.exportData}>Export as JSON</Link>
                                </Section>
                            </Section>
                        </Section>
                    </Section>

                    {/* Delete account */}
                    <Section class="radiusx bg-white p-4 pl-0 shadow-sm mt-4">
                        <Section class="row p-2">
                            <Section class="col-md-1 align-middle">
                                <img src={idcard} alt="upload" width="30px" />
                            </Section>

                            <Section class={"col-md-11"}>
                                <p className="font1-1 p-0 m-0">Manage your account</p>
                                <Section class={"mt-2"}>
                                    <Link to="/setting" className="font1-1 p-0" data-toggle="modal" data-target="#sureToDeleteAcc">Delete my SmartRecruiters account</Link>
                                </Section>
                            </Section>
                        </Section>
                    </Section>
                </Section>


                {/* change password modal */}
                <Modal id="changepassword" title={"Change password"} handleClick={this.changePassword} btnname="Save" size='sm'>
                    <Section class={"form-row"}>
                        <p className="text-muted">{this.state.error}</p>
                        <Section class={"col-md-12"}>
                            <label htmlFor="currentp" className="small">Current password</label><span className="redx"> *</span>
                            <input type="password" className="form-control" name="currentp" value={this.state.currentp} onChange={this.handleOnChange} required />
                        </Section>
                    </Section>
                    <Section class={"form-row"}>
                        <Section class="col-md-12 mt-2">
                            <label htmlFor="password" className="small">New password</label><span className="redx"> *</span>
                            <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleOnChange} required />
                        </Section>
                    </Section>
                    <Section class={"form-row"}>
                        <Section class="col-md-12 mt-2">
                            <label htmlFor="password2" className="small">Confirm password</label><span className="redx"> *</span>
                            <input type="password" className="form-control" name="password2" value={this.state.password2} onChange={this.handleOnChange} required />
                        </Section>
                    </Section>
                </Modal>


                {/* delete account modal */}
                <Modal id="sureToDeleteAcc" title="Delete Account?" btnname="Delete" size='sm'>
                    <Section class="row p-2" stylex={{margin: "auto", justifyContent: "center"}}>
                        <p className="text-center">Sure to delete account?</p>
                    </Section>
                </Modal>
            </div>
        );
    }
}

export default Setting;