import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, CardBody, CardHeader, CardTitle, CardFooter, FormGroup, Label, Col, Row } from 'reactstrap';
import TextValidator from '../Comman Page/TextValidator';
import FileValidator from '../Comman Page/FileValidator';
import { ValidatorForm } from 'react-form-validator-core';
import Helper from '../../constants/helper';
import apiUrl from '../../constants/apiPath';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

const Editmanager = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [countrycode, setCountrycode] = useState('');
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

        let path = apiUrl.userEdit;
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
        props.history.push('/usermanager');

    }


    useEffect(() => {
        updateData();
    }, []);

    const updateData = () => {
        if (props.location.state != undefined) {
            const stateObj = props.location.state;
            if (props.location.state != undefined) {
                setName(stateObj.name);
                setEmail(stateObj.email);
                setMobile(stateObj.mobile);
                setCountrycode(stateObj.country_code);
                setUserprofile(stateObj.image);
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
                id="editmanager"
                onSubmit={onSumbit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-info"><h3>Edit User</h3></CardTitle>
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
                                    <Label>Email</Label>
                                    <TextValidator type="text" name="email" className="form-control" placeholder="E-Mail Address" value={email} disabled
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        validators={['required', 'isEmail']}
                                        errorMessages={['This field is required', 'Email is not valid']} />

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
                                    <TextValidator type="text" name="mnum" className="form-control" maxLength="10" placeholder="Mobile Number" value={mobile}
                                        onChange={(e) => { setMobile(e.target.value) }}
                                        validators={['required', 'isNumber', 'matchRegexp:^[0-9]{10}$']}
                                        errorMessages={['This field is required', 'Only number are allowed', 'No should be 10 digit', 'No should be 10 digit']} />
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
                                    // value={userprofile}
                                    // validators={['isFile', 'maxFileSize:' + 1 * 1024 * 1024,]}
                                    // errorMessages={['File is not valid', 'Size must not exceed 1MB']}
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

export default Editmanager;