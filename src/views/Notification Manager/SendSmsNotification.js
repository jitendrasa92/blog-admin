import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Label, FormGroup } from 'reactstrap';
import Modal from "react-responsive-modal";
import Helper from '../../constants/helper';
import apiUrl from '../../constants/apiPath';
import Loader from '../Comman Page/Loader';
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../Comman Page/TextValidator';
import _ from "lodash";
import moment from "moment";
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});


const SmsNotification = () => {

    const [visible, setVisibale] = useState(false);
    const [message, setMessage] = useState('');
    const [token] = useState(JSON.parse(localStorage.getItem('userData'))[1].accessToken);
    const [type, setType] = useState('all');
    const [mobile, setMobile] = useState('');

    const onSend = async e => {
        setVisibale(true)
        let postJson = { message: message, type: type, mobile: mobile };
        let path = apiUrl.send_Sms_Notification;
        const fr = await Helper.post(postJson, path, token);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.status) {
                Toast.fire({
                    type: "success",
                    title: res.message,
                })
                emapty();
                setVisibale(false);
            } else {
                setVisibale(false);
                Toast.fire({
                    type: "error",
                    title: res.message,
                });
            }
        } else {
            setVisibale(false);
            Toast.fire({
                type: "error",
                title: res.message,
            });
        }
    }


    const handleType = (value) => {
        setType(value)
    }

    const emapty = () => {
        setMessage('');
        setMobile('');
        setType('all');
    }
    return (
        <div className="animated fadeIn loader-outer">
            <Loader className="overlay-loader" visible={visible} />
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-list"></i> Sms Notification
                      </CardHeader>
                        <CardBody>
                            <ValidatorForm
                                id="sendmessage"
                                onSubmit={onSend}>

                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label>Notification Type</Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <span>NFL &nbsp; <input type="radio" name="radio" value="1" checked={type === "nfl"} onChange={(e) => handleType("nfl")} /><span>&nbsp;</span></span>
                                    </Col>
                                    <Col md={3}>
                                        <span>NBA &nbsp; <input type="radio" name="radio" value="2" checked={type === "nba"} onChange={(e) => handleType("nba")} /><span>&nbsp;</span></span>
                                    </Col>
                                    <Col md={3}>
                                        <span>All Users &nbsp; <input type="radio" name="radio" value="3" checked={type === "all"} onChange={(e) => handleType("all")} /><span>&nbsp;</span></span>
                                    </Col>
                                    <Col md={3}>
                                        <span>Particular &nbsp; <input type="radio" name="radio" value="4" checked={type === "particuler"} onChange={(e) => handleType("particuler")} /><span>&nbsp;</span></span>
                                    </Col>
                                    {type === 'particuler' && <Col md={12} className="mt-3">
                                        <FormGroup>
                                            <Label>Mobile</Label>
                                            <TextValidator type="number" name="mobile" placeholder="Mobile" className="form-control"
                                                onChange={(e) => { setMobile(e.target.value) }} value={mobile}
                                            />
                                        </FormGroup>
                                    </Col>}
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label>Sms Notification Message</Label>
                                            <TextValidator type="textarea" className="form-control" maxLength="150" value={message} onChange={(e) => {
                                                setMessage(e.target.value)
                                            }}
                                                validators={['required']}
                                                errorMessages={['This field is required']} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <div className="modal-footer text-rigth clearfix">
                                    <button type="submit" className="btn btn-primary mr-1">Send</button>
                                </div>
                            </ValidatorForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default SmsNotification;