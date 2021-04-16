import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, FormGroup, Form, Input, Button, Label } from 'reactstrap';
import Modal from "react-responsive-modal";
import Helper from '../../constants/helper';
import apiUrl from '../../constants/apiPath';
import Loader from '../Comman Page/Loader';
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../Comman Page/TextValidator';
import Pagination from "react-js-pagination";
import _ from "lodash";
import moment from "moment";
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});


const Notification = () => {

    const [visible, setVisibale] = useState(false);
    const [open, setOpen] = useState(false);
    const [formdata, setFormdata] = useState([]);
    const [message, setMessage] = useState('');
    const [token] = useState(JSON.parse(localStorage.getItem('userData'))[1].accessToken);
    const [activepage, setActivePage] = useState(1);
    const [pagerecord, setPagerecord] = useState({});
    const [type, setType] = useState('all');
    const [email, setEmail] = useState('');

    useEffect(() => {
        getData()
    }, [])

    const getData = async (page = activepage) => {
        setVisibale(true)
        let path = apiUrl.notificationList + '?page=' + `${page}`;
        const fr = await Helper.get(path, token);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.status) {
                setFormdata(res.data.docs);
                setPagerecord(res.data);
                setVisibale(false);
            } else {
                Toast.fire({
                    type: "error",
                    title: res.message,
                });
                setVisibale(false);
            }
        } else {
            Toast.fire({
                type: "error",
                title: res.message,
            });
            setVisibale(false);
        }

    }


    const onSend = async e => {
        //let postJson = { message: message, type: type, email: email };
        let postJson = { message: message };
        let path = apiUrl.notificationSend;
        const fr = await Helper.post(postJson, path, token);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.status) {
                Toast.fire({
                    type: "success",
                    title: res.message,
                })
                emapty();
                setOpen(false);
                getData();
            } else {
                Toast.fire({
                    type: "error",
                    title: res.message,
                });
            }
        } else {
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
        setEmail('');
        setType('all');
    }

    return (
        <div className="animated fadeIn loader-outer">
            <Loader className="overlay-loader" visible={visible} />
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <button className="btn btn-primary float-right" onClick={(e) => {
                                setOpen(true)
                            }}>
                                <i className="fa fa-commenting"> Send </i>
                            </button>
                            <i className="fa fa-list"></i> Notifications List
                      </CardHeader>
                        <CardBody>
                            <Table responsive className="text-center border tblWidth">
                                <thead>
                                    <tr>
                                        <th>Sr.No.</th>
                                        <th>Name</th>
                                        <th>Message</th>
                                        <th>Created</th>
                                    </tr>
                                </thead>
                                <tbody>{formdata.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{key + ((pagerecord.page - 1) * pagerecord.limit) + 1}</td>
                                            <td>{_.upperFirst(item.receiver.name)}</td>
                                            <td>{_.upperFirst(item.message)}</td>
                                            <td>{moment(item.created).format('LL')}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                            {formdata != 0 && <div className="show-pagination technician-page">
                                <Pagination
                                    activeClass={""}
                                    activeLinkClass={"page-link active"}
                                    itemClass={"page-item"}
                                    linkClass={"page-link"}
                                    activePage={pagerecord.page}
                                    itemsCountPerPage={pagerecord.limit}
                                    totalItemsCount={pagerecord.totalDocs}
                                    pageRangeDisplayed={pagerecord.totalPages}
                                    prevPageText="Previous"
                                    nextPageText="Next"
                                    firstPageText="<"
                                    lastPageText=">"
                                    onChange={getData}
                                />
                            </div>}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal className="custom-modal-lg" open={open} onClose={(e) => { setOpen(false) }}>
                <div className="modal-header grey-1">
                    <h4>Send Notification</h4>
                </div>
                <div className="modal-body">
                    <ValidatorForm
                        id="sendmessage"
                        onSubmit={onSend}>
                        {/* <Row>
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
                                    <Label>Email</Label>
                                    <TextValidator type="text" name="email" placeholder="Email" className="form-control"
                                        onChange={(e) => { setEmail(e.target.value) }} value={email}
                                        validators={['isEmail']}
                                        errorMessages={['email is not valid']} />
                                </FormGroup>
                            </Col>}
                        </Row> */}
                        <Row className="mt-3">
                            <Col md={12}>
                                <FormGroup>
                                    <Label>Notification Message</Label>
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
                            <button type="button" className="btn btn-danger" onClick={(e) => { setOpen(false); emapty(); }}>Close</button>
                        </div>
                    </ValidatorForm>
                </div>
            </Modal>
        </div>
    )
}
export default Notification;