import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, CardBody, CardHeader, CardTitle, CardFooter, FormGroup, Label, Col, Form, Row } from 'reactstrap';
import TextValidator from '../Comman Page/TextValidator';
import FileValidator from '../Comman Page/FileValidator';
import { ValidatorForm } from 'react-form-validator-core';
import Helper from '../../constants/helper';
import apiUrl from '../../constants/apiPath';
import Swal from 'sweetalert2';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});



const Articladd = (props) => {

    const [title, setTitle] = useState('');
    const [category_id, setCategoryId] = useState('');
    const [content, setContent] = useState('');
    const [articleImg, setarticleImg] = useState('');
    const [categoryList, setCategoryList] = useState('');
    const [token] = useState(JSON.parse(localStorage.getItem('userData'))[1].accessToken);

    const onSumbit = async e => {

        let formData = new FormData();
        formData.append('title', title);
        formData.append('category', category_id);
        formData.append('content', draftToHtml(convertToRaw(content.getCurrentContent())));
        formData.append('img', articleImg);

        let path = apiUrl.articleAdd;
        const fr = await Helper.formPost(formData, path, token);
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
        props.history.push('/articlelisting');

    }
    useEffect(() => {
        getCategoryData();
    }, []);
    const getCategoryData = async () => {
        let path = apiUrl.categoryListAll;
        const fr = await Helper.get(path, token);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.status) {
                setCategoryList(res.data);
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

    const handleSelectedFile = e => {
        setarticleImg(e.target.files[0]);
    }
    const onEditorStateChange = async (editorState) => {
        setContent(editorState);
    };

    return (
        <React.Fragment>
            <ValidatorForm
                id="addmanager"
                onSubmit={onSumbit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-info"><h3>Add Article</h3></CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={8}>
                                <FormGroup>
                                    <Label>Category</Label>
                                    <TextValidator type="select" className="form-control" value={category_id}
                                        onChange={(e) => { setCategoryId(e.target.value); }}
                                        validators={['required']}
                                        errorMessages={['This field is required']}>
                                        <option value="" disabled>Select Category</option>
                                        {categoryList.length > 0 && categoryList.map((item, key) => {
                                            return (
                                                <option key={key} value={item._id}>{item.category_name}</option>
                                            )
                                        })}

                                    </TextValidator>
                                </FormGroup>
                            </Col>
                            <Col md={8}>
                                <FormGroup>
                                    <Label>Title</Label>
                                    <TextValidator type="text" name="name" placeholder="Title" className="form-control" value={title}
                                        onChange={(e) => { setTitle(e.target.value) }}
                                        validators={['required']}
                                        errorMessages={['This field is required']} />
                                </FormGroup>
                            </Col>
                            <Col md={8}>
                                <FormGroup>
                                    <Label>Content Description</Label>
                                    <Editor
                                        editorState={content}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={onEditorStateChange}
                                        placeholder="Content Write"
                                        required
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={8}>
                                <FormGroup>
                                    <Label>Article Image</Label>
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
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" color="primary">Submit</Button>
                    </CardFooter>
                </Card>
            </ValidatorForm>

        </React.Fragment>
    );
}

export default Articladd;