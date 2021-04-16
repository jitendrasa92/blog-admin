import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import Helper from '../../../constants/helper';
import apiUrl from '../../../constants/apiPath';
import Swal from 'sweetalert2';
import { Button, Card, CardBody, CardGroup, Col, Container, Row, FormGroup } from 'reactstrap';
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../../Comman Page/TextValidator';
import Loader from '../../Comman Page/Loader';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

const LoginFrom = () => {

  const [visible, setVisibale] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [islogin, setLogin] = useState(false);
  const [showlogin, setShowlogin] = useState(true);
  const [showforgot, setShowforgot] = useState(false);
  const [showotp, setShowotp] = useState(false);
  const [showchang, setshowchang] = useState(false);
  const [otp, setotp] = useState('');
  const [newpass, setNewpass] = useState('');
  const [cnrmpass, setCnrmpass] = useState('');
  const [forgottoken, setForgottoken] = useState('');


  useEffect(() => {

  }, [ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== newpass) {
      return false;
    }
    return true;
  })])

  const onSumbit = async e => {
    let postJson = { email: email, password: password };
    let path = apiUrl.adminLogin;
    const fr = await Helper.post(postJson, path);
    const res = await fr.response.json();
    if (fr.status === 200) {
      if (res.status) {
        Toast.fire({
          type: "success",
          title: res.message,
        });
        localStorage.setItem("IsLogin", "true");
        localStorage.setItem("email", email);
        localStorage.setItem('userData', JSON.stringify(res.data));
        setLogin(true);
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

  if (localStorage.getItem('IsLogin') === "true") {
    return (
      <Redirect to='/dashboard' />
    )
  }

  const onForget = async e => {
    setVisibale(true)
    let postJson = { email: email };
    let path = apiUrl.forgot_Password;
    const fr = await Helper.post(postJson, path);
    const res = await fr.response.json();
    if (fr.status === 200) {
      if (res.status) {
        Toast.fire({
          type: "success",
          title: res.message,
        });
        setForgottoken(res.data.forgotToken)
        setShowotp(true);
        setShowforgot(false);
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


  const onOtp = async e => {
    setVisibale(true)
    let postJson = { otp: otp, forgotToken: forgottoken };
    let path = apiUrl.forgot_Otp_Verify;
    const fr = await Helper.post(postJson, path);
    const res = await fr.response.json();
    if (fr.status === 200) {
      if (res.status) {
        Toast.fire({
          type: "success",
          title: res.message,
        });
        setshowchang(true);
        setShowotp(false);
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

  const onChangepassword = async e => {
    setVisibale(true)
    let postJson = { password: newpass, forgotToken: forgottoken };
    let path = apiUrl.change_Password;
    const fr = await Helper.post(postJson, path);
    const res = await fr.response.json();
    if (fr.status === 200) {
      if (res.status) {
        Toast.fire({
          type: "success",
          title: res.message,
        });
        setshowchang(false);
        setShowlogin(true);
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


  return (
    <div className="app flex-row align-items-center loader-outer">
      <Loader className="overlay-loader" visible={visible} />
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  {showlogin === true &&
                    <ValidatorForm
                      id="loginform"
                      onSubmit={onSumbit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <FormGroup>
                        <TextValidator type="text" name="email" placeholder="Email" className="form-control"
                          onChange={(e) => { setEmail(e.target.value) }} value={email}
                          validators={['required', 'isEmail']}
                          errorMessages={['This field is required', 'email is not valid']} />
                      </FormGroup>
                      <FormGroup>
                        <TextValidator type="password" name="pass" placeholder="Password" className="form-control"
                          onChange={(e) => { setPassword(e.target.value) }} value={password}
                          validators={['required']}
                          errorMessages={['This field is required']} />
                      </FormGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4" >Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button type="button" color="link" className="px-0"
                            onClick={(e) => {
                              setShowforgot(true);
                              setShowlogin(false);
                            }}>Forgot password?</Button>
                        </Col>
                      </Row>
                    </ValidatorForm>}
                  {showforgot === true &&
                    <ValidatorForm
                      id="forgetform"
                      onSubmit={onForget}>
                      <h1>Forgot Password</h1>
                      <p className="text-muted">Enetr Email For Send Otp </p>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <TextValidator type="text" name="femail" placeholder="Enter Email" className="form-control"
                              onChange={(e) => { setEmail(e.target.value) }} value={email}
                              validators={['required', 'isEmail']}
                              errorMessages={['This field is required', 'email is not valid']} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4" >Send Otp</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button type="button" color="link" className="px-0"
                            onClick={(e) => {
                              setShowlogin(true);
                              setShowforgot(false);
                            }}>Login</Button>
                        </Col>
                      </Row>
                    </ValidatorForm>}
                  {showotp === true &&
                    <ValidatorForm
                      id="otpform"
                      onSubmit={onOtp}>
                      <h1>Verify Otp</h1>
                      <p className="text-muted">Enetr Otp </p>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <TextValidator type="text" name="otp" placeholder="Enter Otp" className="form-control"
                              onChange={(e) => { setotp(e.target.value) }} value={otp}
                              validators={['required', 'isNumber']}
                              errorMessages={['This field is required', 'invalid Only Number']} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4" >Sumbit</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button type="button" color="link" className="px-0"
                            onClick={(e) => {
                              setShowlogin(true);
                              setShowotp(false);
                            }}>Login</Button>
                        </Col>
                      </Row>
                    </ValidatorForm>}
                  {showchang === true &&
                    <ValidatorForm
                      id="changform"
                      onSubmit={onChangepassword}>
                      <h1>Change Password </h1>
                      <p className="text-muted">Enetr New Password </p>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <TextValidator type="text"
                              onChange={(e) => setNewpass(e.target.value)}
                              name="passwrd" className="form-control"
                              placeholder="Password"
                              value={newpass}
                              type="password"
                              validators={['required', 'minStringLength:6']}
                              errorMessages={['This field is required', 'Minimum 6 characters required']} />
                          </FormGroup>
                        </Col>
                        <Col md={12}>
                          <FormGroup>
                            <TextValidator type="text"
                              onChange={(e) => setCnrmpass(e.target.value)}
                              name="confirm_passwrd" className="form-control"
                              value={cnrmpass}
                              placeholder="Confirm Password"
                              type="password"
                              validators={['required', 'minStringLength:6', 'isPasswordMatch']}
                              errorMessages={['This field is required', 'Minimum 6 characters required', 'Passwords do not match!']}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4" >ChangePassword</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button type="button" color="link" className="px-0"
                            onClick={(e) => {
                              setShowlogin(true);
                              setshowchang(false);
                            }}>Login</Button>
                        </Col>
                      </Row>
                    </ValidatorForm>}
                </CardBody>
              </Card>
              <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CardBody className="text-center">
                  <div>
                    <h2>Sign in</h2>
                   <img src={require("../../../assets/img/logo.png")} alt="" width="250px"></img>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default LoginFrom;
