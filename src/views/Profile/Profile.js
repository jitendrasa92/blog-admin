import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, CardFooter, FormGroup, Label, Col, Form, Row } from 'reactstrap';
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../Comman Page/TextValidator';
import Helper from '../../constants/helper';
import apiUrl from '../../constants/apiPath';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

const Profile = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [countrycode, setCountrycode] = useState('');
    const [username, setUsername] = useState('');
    const [userprofile, setUserprofile] = useState('');
    const [id, setId] = useState('');
    // const [token] = useState(JSON.parse(localStorage.getItem('userData'))[1].accessToken);

    const onSubmit = async e => {
        console.log("valid")
    }


    // const onSumbit = async e => {
    //   let postJson = {name:name, email: email,mobile: mobile};
    //   let path = apiUrl.clientLogin;
    //   const fr = await Helper.put(postJson, path);
    //   const res = await fr.response.json();
    //   if (fr.status === 200) {
    //     if (res.success) {
    //       Toast.fire({
    //         type: "success",
    //         title: res.msg,
    //       });
    //       saveJWT(res.token);
    //       localStorage.setItem("IsLogin", true);
    //       localStorage.setItem("email", email);
    //     } else {
    //       Toast.fire({
    //         type: "error",
    //         title: res.msg,
    //       });
    //     }
    //   } else {
    //     Toast.fire({
    //       type: "error",
    //       title: res.error,
    //     });
    //   }
    // }


     // useEffect(() => {
    //     updateData();
    // }, []);

    // const updateData = () => {
    //     if (props.location.state != undefined) {
    //         const stateObj = props.location.state;
    //         if (props.location.state != undefined) {
    //             setName(stateObj.name);
    //             setEmail(stateObj.email);
    //             setMobile(stateObj.mobile);
    //             setId(stateObj.id);
    //         }

    //     } else {
    //         props.history.push('/subadmin');
    //     }
    // }


    return (
        <React.Fragment>
            <ValidatorForm
                id="profile"
                onSubmit={onSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-info"><h3>Profile</h3></CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Full Name</Label>
                                    <TextValidator type="text" name="name" placeholder="Full Name" className="form-control" value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        validators={['required']}
                                        errorMessages={['This field is required']} />
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <TextValidator type="text" name="email" className="form-control" placeholder="E-Mail Address" value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        validators={['required', 'isEmail']}
                                        errorMessages={['This field is required', 'Email is not valid']} />

                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>User Name</Label>
                                    <TextValidator type="text" name="uname" className="form-control" placeholder="User Name" value={username}
                                        onChange={(e) => { setUsername(e.target.value) }}
                                        validators={['required']}
                                        errorMessages={['This field is required']} />

                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Address</Label>
                                    <TextValidator type="text" name="add1" className="form-control" placeholder="Address" value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}
                                        validators={['required']}
                                        errorMessages={['This field is required']} />

                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Country Code</Label>
                                    <TextValidator type="number" name="pass" className="form-control" placeholder="Country Code" value={countrycode}
                                        onChange={(e) => { setCountrycode(e.target.value) }}
                                        validators={['required']}
                                        errorMessages={['This field is required']} />

                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Mobile Number</Label>
                                    <TextValidator type="text" name="mnum" className="form-control" maxLength="10" placeholder="Mobile Number" value={mobile}
                                        onChange={(e) => { setMobile(e.target.value) }}
                                        validators={['required', 'isNumber', 'maxStringLength:10', 'minStringLength:10']}
                                        errorMessages={['This field is required', 'Only number are allowed', 'No should be 10 digit', 'No should be 10 digit']} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Upload Profile</Label>
                                    <TextValidator type="file" name="fnum" className="form-control" maxLength="10" placeholder="add image" value={userprofile}
                                        onChange={(e) => { setUserprofile(e.target.value) }}
                                        validators={['required']}
                                        errorMessages={['This field is required']} />
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

export default Profile;