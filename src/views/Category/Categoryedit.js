import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, CardBody, CardHeader, CardTitle, CardFooter, FormGroup, Label, Col, Row } from 'reactstrap';
import TextValidator from '../Comman Page/TextValidator';
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

const Categoryedit = (props) => {

    const [category_name, setCategoryName] = useState('');
    const [id, setId] = useState('');
    const [token] = useState(JSON.parse(localStorage.getItem('userData'))[1].accessToken);

    const onSumbit = async e => {

        let postJson = {
            id: id, category_name: category_name
        };
        let path = apiUrl.categoryEdit;
        const fr = await Helper.put(postJson, path, token);
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
        props.history.push('/categorylisting');

    }


    useEffect(() => {
        updateData();
    }, []);
    const updateData = () => {
        if (props.location.state != undefined) {
            const stateObj = props.location.state;
            if (props.location.state != undefined) {
                setCategoryName(stateObj.category_name);
                setId(stateObj.id);
            }

        } else {
            props.history.push('/categorylisting');
        }
    }

    return (
        <React.Fragment>
            <ValidatorForm
                id="editmanager"
                onSubmit={onSumbit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-info"><h3>Edit Category</h3></CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={8}>
                                <FormGroup>
                                    <Label>Category Name</Label>
                                    <TextValidator type="text" name="name" placeholder="Category Name" className="form-control" value={category_name}
                                        onChange={(e) => { setCategoryName(e.target.value) }}
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

        </React.Fragment >
    );
}

export default Categoryedit;