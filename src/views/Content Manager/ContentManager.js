import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Pagination, Table, FormGroup, Form, Input, Button, Label } from 'reactstrap';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-responsive-modal";
import Helper from '../../constants/helper';
import apiUrl from '../../constants/apiPath';
import Loader from '../Comman Page/Loader';
//import Pagination from "react-js-pagination";
import Swal from 'sweetalert2';
import moment from 'moment';
import _ from "lodash";
import { Markup } from 'interweave';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

const ContentManager = () => {

    const [open, setOpen] = useState(false);
    const [visible, setVisibale] = useState(false);
    const [activepage, setActivePage] = useState(1);
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [contentdata, setContentdata] = useState([]);
    const [pagerecord, setPagerecord] = useState({});
    const [token] = useState(JSON.parse(localStorage.getItem('userData'))[1].accessToken);
    const [viewdata, setViewdata] = useState({});
    const [serachstatus, setSerachStatus] = useState('');
    const [keywords, setKeyWords] = useState('');
    const [formdata, setFormdata] = useState([]);

    const getData = async (page = activepage) => {
        setVisibale(true)
        let path = apiUrl.pageList + '?page=' + `${page}`;
        const fr = await Helper.get(path, token);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.status) {
                setContentdata(res.data.docs);
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


    useEffect(() => {
        handleSearching();
        // viewSimpleHtml()
    }, []);

    const handleStartDate = (date) => {
        setEndDate('')
        setStartDate(date);
    }

    const handleEndDate = (date) => {
        setEndDate(date);
    }

    const handleSearching = async (page = activepage) => {
        setVisibale(true);
        let path = apiUrl.pageList + '?page=' + `${page}` + '&start_date=' + `${startdate == '' ? '' : moment(startdate).format('YYYY-MM-DD')}` + '&end_date=' + `${enddate == '' ? '' : moment(enddate).format('YYYY-MM-DD')}` + '&status=' + `${serachstatus}` + '&keyword=' + `${keywords}`;
        const fr = await Helper.get(path, token);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.status) {
                setContentdata(res.data.docs);
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
                let body = { status: status, id: id }
                let path = apiUrl.pageEdit;
                const fr = await Helper.put(body, path, token);
                const res = await fr.response.json();
                if (res.status) {
                    let user_id = id
                    let formlst = [...contentdata]
                    let formindex = formlst.findIndex(e => e.id == user_id);
                    if (formlst[formindex]) {
                        formlst[formindex].status = status;
                    }
                    setFormdata(formlst);
                    Toast.fire({
                        type: "success",
                        title: "Status updated successfully",
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

    // const viewSimpleHtml = (item) => {
    //     const contentBlock = htmlToDraft(item);
    //     if (contentBlock) {
    //         const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    //         const editorState = EditorState.createWithContent(contentState);
    //         return editorState;
    //     }
    // }

    return (
        <div className="animated fadeIn loader-outer">
            <Loader className="overlay-loader" visible={visible} />
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <Link to="/addcontent" className="btn btn-primary float-right">
                                <i className="fa fa-plus"> Add New Page</i>
                            </Link>
                            <i className="fa fa-list"></i> Match Manager
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
                                                    maxDate={new Date()}
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
                            <Table responsive className="text-center border tblWidth">
                                <thead>
                                    <tr>
                                        <th width="5%">Sr.No.</th>
                                        <th width="15%">Title</th>
                                        <th width="50%">Description</th>
                                        <th width="10%">Status</th>
                                        <th width="10%">Created</th>
                                        <th width="10% width-100">Action</th>
                                    </tr>
                                </thead>
                                <tbody>{Array.isArray(contentdata) && contentdata.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td >{key + ((pagerecord.page - 1) * pagerecord.limit) + 1}</td>
                                            <td>{item.title}</td>
                                            <td><div className="contentcss"><Markup content={item.content} />{item.content.length > 200 && <span className="dotcss">...</span>}</div></td>

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
                                            <td>{moment(item.createdAt).format('LL')}</td>
                                            <td>
                                                <Button className="btn btn-success btn-sm mr-1" title="View" onClick={(e) => {
                                                    setOpen(true);
                                                    setViewdata(item);
                                                }}><i className="fa fa-eye"></i></Button>
                                                <Link to={{ pathname: "/editcontent", state: item }} title="Edit" className="btn btn-info btn-sm text-white mr-1 "><i className="fa fa-pencil"></i></Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                            {contentdata != 0 && <div className="show-pagination technician-page">
                                <Pagination
                                    activeClass={""}
                                    activeLinkClass={"page-link active"}
                                    itemClass={"page-item"}
                                    linkClass={"page-link"}
                                    activePage={pagerecord.currentPage}
                                    itemsCountPerPage={pagerecord.limit}
                                    totalItemsCount={pagerecord.allRecords}
                                    pageRangeDisplayed={3}
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
                    <h4>Content Manager</h4>
                </div>
                <div className="modal-body">
                    <Form>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label><strong>Id</strong></Label>
                                    <div>{viewdata.id}</div>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label><strong>Title</strong></Label>
                                    <div>{viewdata.title}</div>
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup>
                                    <Label><strong>Description</strong></Label>
                                    <div><Markup content={viewdata.content} /></div>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label><strong>Status</strong></Label>
                                    <div>{viewdata.status == 1 ? 'Active' : 'Inactive'}</div>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label><strong>Created</strong></Label>
                                    <div>{moment(viewdata.createdAt).format('LL')}</div>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label><strong>Updated</strong></Label>
                                    <div>{moment(viewdata.updatedAt).format('LL')}</div>
                                </FormGroup>
                            </Col>

                        </Row>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}
export default ContentManager;