import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, CardBody, CardHeader, CardTitle, CardFooter, FormGroup, Label, Col, Form, Row } from 'reactstrap';
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../Comman Page/TextValidator';
import Helper from '../../constants/helper';
import apiUrl from '../../constants/apiPath';
import FileValidator from '../Comman Page/FileValidator';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

const Editsubadmin = (props) => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [countrycode, setCountrycode] = useState('');
    const [mobile, setMobile] = useState();
    const [userprofile, setUserprofile] = useState('');
    const [id, setId] = useState('');
    const [token] = useState(JSON.parse(localStorage.getItem('userData'))[1].accessToken);


    const onSumbit = async e => {

        let formData = new FormData();
        formData.append('name', name);
        formData.append('img', userprofile);
        formData.append('email', email);
        formData.append('country_code', countrycode);
        formData.append('mobile', mobile);
        formData.append('id', id);
        formData.append('username', username)

        let path = apiUrl.adminEdit;
        const fr = await Helper.formPut(formData, path, token);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.status) {
                Toast.fire({
                    type: "success",
                    title: res.message,
                })

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
        props.history.push('/subadmin');

    }

    useEffect(() => {
        updateData();
    }, []);

    const updateData = () => {
        if (props.location.state != undefined) {
            const stateObj = props.location.state;
            if (props.location.state != undefined) {
                console.log(stateObj);
                setName(stateObj.name);
                setEmail(stateObj.email);
                console.log(stateObj.mobile)
                setMobile(parseInt(stateObj.mobile));
                setCountrycode(stateObj.country_code);
                setUserprofile(stateObj.image);
                setUsername(stateObj.username);
                setId(stateObj.id);
            }

        } else {
            props.history.push('/usermanager');
        }
    }
    const handleSelectedFile = e => {
        setUserprofile(e.target.files[0]);
    }
    return (
        <React.Fragment>

            <ValidatorForm
                id="editsubadmin"
                onSubmit={onSumbit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-info"><h3>Edit Subadmin</h3></CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Full Name</Label>
                                    <TextValidator type="text" name="name" placeholder="Full Name" className="form-control" value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        validators={['required']}
                                        errorMessages={['This field is required']} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <TextValidator type="text" name="email" className="form-control" placeholder="Username" value={username}
                                        onChange={(e) => { setUsername(e.target.value) }}
                                        validators={['required']}
                                        errorMessages={['This field is required', 'Username is not valid']} />

                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <TextValidator type="text" name="email" className="form-control" placeholder="E-Mail Address" value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        validators={['required', 'isEmail']}
                                        errorMessages={['This field is required', 'email is not valid']} />

                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup>
                                    <Label>Country Code</Label>
                                    <TextValidator type="number" name="pass" className="form-control" placeholder="Country Code" value={countrycode}
                                        onChange={(e) => { setCountrycode(e.target.value) }}
                                        validators={['required']}
                                        errorMessages={['This field is required']} />

                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Mobile Number</Label>
                                    <TextValidator type="text" name="mnum" className="form-control" maxLength="10" minLength="10" placeholder="Mobile Number" value={mobile}
                                        onChange={(e) => { setMobile(e.target.value) }}
                                        validators={['required', 'isNumber', 'matchRegexp:^[0-9]{10}$',]}
                                        errorMessages={['This field is required', 'Only number are allowed', 'No should be 10 digit']} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>User Profile</Label>
                                    <FileValidator className="form-control"
                                        onChange={handleSelectedFile}
                                        name="file"
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        value={userprofile}
                                    // validators={['isFile', 'maxFileSize:' + 1 * 1024 * 1024,]}
                                    //errorMessages={['File is not valid', 'Size must not exceed 1MB']}
                                    />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label className="float-left" >
                                        <img src={process.env.REACT_APP_API_BASE_URL + userprofile} alt="" width="100" />
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" color="primary">Submit</Button>
                    </CardFooter>
                </Card>
            </ValidatorForm>

        </React.Fragment>
    );
}

export default Editsubadmin;