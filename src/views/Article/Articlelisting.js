import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, FormGroup, Form, Input, Button, Label } from 'reactstrap';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-responsive-modal";
import Helper from '../../constants/helper';
import apiUrl from '../../constants/apiPath';
import Loader from '../Comman Page/Loader';
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


const Articlelisting = () => {

    const [visible, setVisibale] = useState(false);
    const [open, setOpen] = useState(false);
    const [activepage, setActivePage] = useState(1);
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [formdata, setFormdata] = useState([]);
    const [viewdata, setViewdata] = useState({});
    const [pagerecord, setPagerecord] = useState({});
    const [token] = useState(JSON.parse(localStorage.getItem('userData'))[1].accessToken);
    const [serachstatus, setSerachStatus] = useState('');
    const [keywords, setKeyWords] = useState('');
    const [viewdataCategory, setViewdataCategory] = useState('');



    useEffect(() => {
        handleSearching();
    }, [])

    const getData = async (page = activepage) => {
        setVisibale(true)
        let path = apiUrl.articleList + '?page=' + `${page}`;
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
        let path = apiUrl.articleList + '?page=' + `${page}` + '&start_date=' + `${startdate == '' ? '' : moment(startdate).format('YYYY-MM-DD')}` + '&end_date=' + `${enddate == '' ? '' : moment(enddate).format('YYYY-MM-DD')}` + '&status=' + `${serachstatus}` + '&keyword=' + `${keywords}`;
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
                let path = apiUrl.articleEdit;
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

    function htmlParse(html) {
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent.length > 50
            ? temporalDivElement.textContent.substring(0, 50) + "..."
            : temporalDivElement.textContent &&
                temporalDivElement.innerText.length > 50
                ? temporalDivElement.innerText.substring(0, 50) + "..."
                : temporalDivElement.innerText || "";

    }
    function htmlParsefull(html) {
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.innerText;

    }

    return (
        <div className="animated fadeIn loader-outer">
            <Loader className="overlay-loader" visible={visible} />
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <Link to="/articleadd" className="btn btn-primary float-right">
                                <i className="fa fa-plus"> Add New Article</i>
                            </Link>
                            <i className="fa fa-list"></i> Article List
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
                            <Table responsive className="text-center border tblWidth">
                                <thead>
                                    <tr>
                                        <th>Sr.No.</th>
                                        <th>Article Image</th>
                                        <th>Category</th>
                                        <th>Title</th>
                                        <th>Content</th>
                                        <th width="8%">Status</th>
                                        <th>Created</th>
                                        <th className="width-100">Action</th>
                                    </tr>
                                </thead>
                                <tbody>{Array.isArray(formdata) && formdata.map((item, key) => {
                                    // document.getElementById("if").innerHTML = html    dangerouslySetInnerHTML={{ __html: item.content }}
                                    return (
                                        <tr key={key}>
                                            <td>{key + ((pagerecord.page - 1) * pagerecord.limit) + 1}</td>
                                            <td><img src={item.img ? process.env.REACT_APP_API_BASE_URL + item.img : require('../../assets/img/no.jpg')} className="rounded-circle" alt="" height="50" width="50" /></td>
                                            <td >{item.category.category_name}</td>
                                            <td>{item.title.length > 50 ? item.title.substring(0, 47) + "..." : item.title}</td>
                                            {/* <td>{item.content.length > 50 ? item.content.substring(0, 47) + "..." : item.content}</td> */}
                                            <td >{htmlParse(item.content)}</td>
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
                                                    setViewdataCategory(item.category);
                                                    setOpen(true);
                                                }}><i className="fa fa-eye"></i></Button>
                                                <Link to={{ pathname: "/articleedit", state: item }} title="Edit" className="btn btn-info btn-sm text-white mr-1 "><i className="fa fa-pencil"></i></Link>
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
                    <h4>Article View</h4>
                </div>
                <div className="modal-body">
                    <Form>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label><strong>Category</strong></Label>
                                    <div>{viewdataCategory.category_name} </div>
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup>
                                    <Label><strong>Title</strong></Label>
                                    <div>{viewdata.title}</div>
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup>
                                    <Label><strong>Slug</strong></Label>
                                    <div>{viewdata.slug}</div>
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup>
                                    <Label><strong>Content</strong></Label>
                                    <div>{htmlParsefull(viewdata.content)}</div>
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
                                    <Label><strong>Create Date</strong></Label>
                                    <div>{moment(viewdata.createdAt).format('LL')}</div>
                                </FormGroup>
                            </Col>
                            {viewdata.updatedAt != "" && <Col md={4}>
                                <FormGroup>
                                    <Label><strong>Updated</strong></Label>
                                    <div>{moment(viewdata.updatedAt).format('LL')}</div>
                                </FormGroup>
                            </Col>}
                            <Col md={6}>
                                <FormGroup>
                                    <Label><strong>Article Image</strong></Label>
                                    <div> <img src={viewdata.img ? process.env.REACT_APP_API_BASE_URL + viewdata.img : require('../../assets/img/no.jpg')} alt="" width="150" /></div>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        </div >
    )
}
export default Articlelisting;