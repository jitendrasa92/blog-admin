import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, CardBody, CardHeader, CardTitle, CardFooter, FormGroup, Label, Col, Row } from 'reactstrap';
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

const Editmanager = (props) => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState(EditorState.createEmpty());
    const [articleimg, setArticleImg] = useState('');
    const [id, setId] = useState('');
    const [categoryList, setCategoryList] = useState('');
    const [token] = useState(JSON.parse(localStorage.getItem('userData'))[1].accessToken);

    const onSumbit = async e => {

        // let postJson = {
        //     id: id, title: title, img: articleimg, content: draftToHtml(convertToRaw(content.getCurrentContent()))
        // };
        let formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('content', draftToHtml(convertToRaw(content.getCurrentContent())));
        formData.append('img', articleimg);
        formData.append('id', id);
        let path = apiUrl.articleEdit;
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
        props.history.push('/articlelisting');

    }


    useEffect(() => {
        getCategoryData();
        updateData();
    }, []);



    const updateData = () => {
        if (props.location.state != undefined) {
            const stateObj = props.location.state;
            if (props.location.state != undefined) {
                setTitle(stateObj.title);
                setCategory(stateObj.category.id);
                setArticleImg(stateObj.img);
                setId(stateObj.id);
                const contentBlock = htmlToDraft(stateObj.content);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    setContent(editorState);
                }
            }

        } else {
            props.history.push('/articlelisting');
        }
    }
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
    const onEditorStateChange = async (editorState) => {
        setContent(editorState);
    };
    const handleSelectedFile = e => {
        setArticleImg(e.target.files[0]);
    }

    return (
        <React.Fragment>
            <ValidatorForm
                id="editmanager"
                onSubmit={onSumbit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-info"><h3>Edit Article</h3></CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={8}>
                                <FormGroup>
                                    <Label>Category </Label>
                                    <TextValidator type="select" className="form-control" value={category}
                                        onChange={(e) => { setCategory(e.target.value); }}
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
                                    <TextValidator type="text" name="name" placeholder="Full Name" className="form-control" value={title}
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
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label className="float-left" >
                                        <img src={process.env.REACT_APP_API_BASE_URL + articleimg} alt="" width="100" />
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

        </React.Fragment >
    );
}

export default Editmanager;