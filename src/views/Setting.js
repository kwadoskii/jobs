import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'
import NavbarMenu from '../components/NavbarMenu'
import Section from '../components/Section'
import Modal from '../components/Modal'
import lock from '../images/lock.png'
import globe from '../images/globe.png'
import upload from '../images/upload.png'
import idcard from '../images/idcard.png'

class Setting extends Component {
    render() {
        return (
            <div>
                <Navbar class={"navbar navbar-dark fixed-top pt-2 pb-2 pl-4 pr-4"} stylex={{ backgroundColor: 'rgba(9,93,207, 9)' }} imgSize={"35px"} url='/setting'>
                    <NavbarMenu userId="5ec6c2604122631efc492d72"/>
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
                                    <Link to="/setting" className="font1-1 p-0">Export as JSON</Link>
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

                <Modal id="changepassword" title={"Change password"}>
                    <Section class={"form-row"}>
                        <Section class={"col-md-12"}>
                            <label htmlFor="currentpassword" className="small">Current password</label><span className="redx"> *</span>
                            <input type="password" className="form-control" name="currentpassword" />
                        </Section>
                        <Section class="col-md-12">
                            <label htmlFor="newpassword" className="small">New password</label><span className="redx"> *</span>
                            <input type="password" className="form-control" name="newpassword" />
                        </Section>
                        <Section class="col-md-12">
                            <label htmlFor="confirmpassword" className="small">Confirm password</label><span className="redx"> *</span>
                            <input type="password" className="form-control" name="confirmpassword" />
                        </Section>
                    </Section>
                </Modal>

                <Modal id="sureToDeleteAcc" title="Delete Account?">
                    <Section class="row p-1">
                        <p className="text-center">Sure to delete account?</p>
                    </Section>

                    {/* <Section class={"modal-footer"}>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </Section> */}
                </Modal>
            </div>
        );
    }
}

export default Setting;