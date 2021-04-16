import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, CardFooter, Row, Table, FormGroup, Form, Input, Button, Label } from 'reactstrap';
import { Link } from "react-router-dom";
import TextValidator from '../Comman Page/TextValidator';
import { ValidatorForm } from 'react-form-validator-core';
import Modal from "react-responsive-modal";
import Helper from '../../constants/helper';
import apiUrl from '../../constants/apiPath';
import Swal from 'sweetalert2';
import Loader from '../Comman Page/Loader';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

const Settingmanager = () => {

    const [visible, setVisibale] = useState(false);
    const [settingData, setSettingData] = useState("");
    const [point, setpoint] = useState("");
    const [token] = useState(JSON.parse(localStorage.getItem('userData'))[1].accessToken);
    const [id, setId] = useState('');

    const onSumbit = async e => {
        let postJson = {
            id: id, welcome_points: point
        };
        let path = apiUrl.editSetting;
        const fr = await Helper.put(postJson, path, token);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.status) {
                Toast.fire({
                    type: "success",
                    title: res.message,
                })
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

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        setVisibale(true)
        let path = apiUrl.getSetting;
        const fr = await Helper.get(path, token);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.status) {
                setSettingData(res.data);
                setpoint(res.data.welcome_points);
                setId(res.data.id);
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
        <div className="animated fadeIn loader-outer">
            <Loader className="overlay-loader" visible={visible} />
            <Row>
                <Col lg={6}>
                    <ValidatorForm
                        id="addpoint"
                        onSubmit={onSumbit}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-list"></i> Setting Manager
                      </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label>Welcome Point</Label>
                                            <TextValidator type="text" placeholder="Welcome Point" name="point" maxLength="5" className="form-control" value={point}
                                                onChange={(e) => { setpoint(e.target.value) }}
                                                validators={['required', 'isNumber']}
                                                errorMessages={['This field is required', 'Only number are allowed']} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" color="primary">Submit</Button>
                            </CardFooter>
                        </Card>
                    </ValidatorForm>
                </Col>
            </Row>
        </div>
    )
}
export default Settingmanager;