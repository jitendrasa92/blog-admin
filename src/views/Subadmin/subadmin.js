import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, FormGroup, Form, Input, Button, Label } from 'reactstrap';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-responsive-modal";
import Helper from '../../constants/helper';
import apiUrl from '../../constants/apiPath';
import Swal from 'sweetalert2';
import _ from "lodash";
import moment from "moment";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

const Subadmin = () => {

    const [visible, setVisibale] = useState(false);
    const [activepage, setActivePage] = useState(1);
    const [open, setOpen] = useState(false);
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [formdata, setFormdata] = useState([]);
    const [pagerecord, setPagerecord] = useState({});
    const [token] = useState(JSON.parse(localStorage.getItem('userData'))[1].accessToken);
    const [serachstatus, setSerachStatus] = useState('');
    const [keywords, setKeyWords] = useState('');
    const [viewdata, setViewdata] = useState({});

    useEffect(() => {
        handleSearching();
    }, [])

    const getData = async (page = activepage) => {
        setVisibale(true)
        let path = apiUrl.adminList + '?page=' + `${page}`;
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

    const handleStartDate = (date) => {
        setEndDate('')
        setStartDate(date);
    }

    const handleEndDate = (date) => {
        setEndDate(date);
    }

    const handleSearching = async (page = activepage) => {
        setVisibale(true);
        let path = apiUrl.adminList + '?page=' + `${page}` + '&start_date=' + `${startdate == '' ? '' : moment(startdate).format('YYYY-MM-DD')}` + '&end_date=' + `${enddate == '' ? '' : moment(enddate).format('YYYY-MM-DD')}` + '&status=' + `${serachstatus}` + '&keyword=' + `${keywords}`;
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

    const changeStutas = async (id, status) => {
        setVisibale(true);
        Swal.fire({
            title: 'Are you sure?',
            text: "You want Change Status",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then(async (result) => {
            if (result.value) {
                let formData = new FormData();
                formData.append('id', id);
                formData.append('status', status);
                let path = apiUrl.adminEdit;
                const fr = await Helper.formPut(formData, path, token);
                const res = await fr.response.json();
                if (res.status) {
                    let user_id = id
                    let formlst = [...formdata]
                    let formindex = formlst.findIndex(e => e.id == user_id);
                    formlst[formindex].status = status;
                    setFormdata(formlst);
                    Toast.fire({
                        type: "success",
                        title: res.message,
                    });
                    setVisibale(false);
                } else {
                    Toast.fire({
                        type: "error",
                        title: res.message,
                    });
                    setVisibale(false);
                }
            }
            else {
                setVisibale(false);
            }
        })
    }

    const onReset = (e) => {
        setStartDate("");
        setEndDate("");
        setKeyWords("");
        setSerachStatus("");
        getData();
    }

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <Link to="/addsubadmin" className="btn btn-primary float-right">
                                <i className="fa fa-plus"> Add New</i>
                            </Link>
                            <i className="fa fa-list"></i> Sub Admin List
                      </CardHeader>
                        <CardBody>
                            <div className="multipal-searching">
                                <Form>
                                    <Row>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Input type="text" placeholder="Keywords" value={keywords} className="form-control"
                                                    onChange={(e) => { setKeyWords(e.target.value) }} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <DatePicker selected={startdate === '' ? null : new Date(startdate)} className="form-control" placeholderText=" Start Date"
                                                    dateFormat="dd/MM/yyyy"
                                                    // maxDate={new Date()}
                                                    onChange={handleStartDate}
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <DatePicker selected={enddate === '' ? null : new Date(enddate)} className="form-control" placeholderText=" End Date"
                                                    dateFormat="dd/MM/yyyy"
                                                    // minDate={new Date(startdate)}
                                                    // maxDate={new Date()}
                                                    onChange={handleEndDate}
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <select type="text" className="form-control" value={serachstatus}
                                                    onChange={(e) => { setSerachStatus(e.target.value) }} >
                                                    <option value="">Status</option>
                                                    <option value='1'>Active</option>
                                                    <option value='0'>Inactive</option>
                                                </select>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <button className="btn btn-primary mr-1" type="button" onClick={(e) => {
                                                handleSearching();
                                            }}><i className="fa fa-search"></i> Search</button>
                                            <button className="btn btn-success mr-1" type="button" onClick={(e) => { onReset() }}><i className="fa fa-undo"></i> Reset</button>

                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            <Table responsive className="text-center">
                                <thead>
                                    <tr>
                                        <th>Sr.No.</th>
                                        <th>Profile Image</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th width="8%">Status</th>
                                        <th>Created</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>{Array.isArray(formdata) && formdata.map((item, key) => {

                                    return (
                                        <tr key={key}>
                                            <td >{key + ((pagerecord.page - 1) * pagerecord.limit) + 1}</td>
                                            <td><img src={item.image ? process.env.REACT_APP_API_BASE_URL + item.image : require('../../assets/img/no.jpg')} className="rounded-circle" alt="" height="50" width="50" /></td>
                                            <td>{_.upperFirst(item.name)}</td>
                                            <td>{item.email} </td>
                                            <td>
                                                <FormGroup>
                                                    <select type="text" placeholder="Status" className="form-control width-100" value={item.status}
                                                        onChange={(e) => {
                                                            changeStutas(item.id, e.target.value)
                                                        }}>
                                                        <option value="" disabled>Select Status</option>
                                                        <option value="1">Active</option>
                                                        <option value="0">Inactive</option>
                                                    </select>
                                                </FormGroup>
                                            </td>
                                            <td>{moment(item.created).format('LL')}</td>
                                            <td>
                                                <Button className="btn btn-success btn-sm mr-1" title="View" onClick={(e) => {
                                                    setViewdata(item);
                                                    setOpen(true);
                                                }}><i className="fa fa-eye"></i></Button>
                                                <Link to={{ pathname: "/editsubadmin", state: item }} title="Edit" className="btn btn-info btn-sm text-white mr-1 "><i className="fa fa-pencil"></i></Link>
                                                {/* <Button className="btn btn-danger btn-sm mr-1" title="Delete"><i className="fa fa-trash-o"></i></Button> */}
                                            </td>
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
                                    onChange={handleSearching}
                                />
                            </div>}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal className="custom-modal-lg" open={open} onClose={(e) => { setOpen(false) }}>
                <div className="modal-header grey-1">
                    <h4>SubAdmin Details</h4>
                </div>
                <div className="modal-body">
                    <Form>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label><strong>Full Name</strong></Label>
                                    <div>{viewdata.name}</div>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label><strong>Email</strong></Label>
                                    <div>{viewdata.email}</div>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label><strong>Mobile Number</strong></Label>
                                    <div>{viewdata.mobile}</div>
                                </FormGroup>
                            </Col>

                        </Row>
                    </Form>
                </div>
            </Modal>
        </React.Fragment >
    )
}
export default Subadmin;