import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, CardFooter, FormGroup, Label, Col, Form, Row } from 'reactstrap';
import TextValidator from '../Comman Page/TextValidator';
import { ValidatorForm } from 'react-form-validator-core';
import Swal from 'sweetalert2';
import Helper from '../../constants/helper';
import apiUrl from '../../constants/apiPath';
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

const EditTeam = (props) => {

    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [content, setContent] = useState(EditorState.createEmpty());
    const [token] = useState(JSON.parse(localStorage.getItem('userData'))[1].accessToken);



    const onSumbit = async e => {
        let postJson = {
            id: id, title: title, content: draftToHtml(convertToRaw(content.getCurrentContent()))
        };
        // console.log(postJson)
        let path = apiUrl.pageEdit;
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
        props.history.push('/contentmanager');

    }

    useEffect(() => {
        updateData();
    }, []);

    const updateData = () => {
        if (props.location.state != undefined) {
            const stateObj = props.location.state;
            if (props.location.state != undefined) {
                setTitle(stateObj.title);
                setId(stateObj.id);
                const contentBlock = htmlToDraft(stateObj.content);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    setContent(editorState);
                }
            }

        } else {
            props.history.push('/contentmanager');
        }
    }

    const onEditorStateChange = async (editorState) => {
        setContent(editorState);
    };

    return (
        <React.Fragment>
            <ValidatorForm
                id="editcontent"
                onSubmit={onSumbit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-info"><h3>Edit Content</h3></CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={8}>
                                <FormGroup>
                                    <Label>Content Title</Label>
                                    <TextValidator type="text" name="name" placeholder="Full Name" className="form-control" value={title}
                                        onChange={(e) => { setTitle(e.target.value) }}
                                        validators={['required']}
                                        errorMessages={['This field is required']} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
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

export default EditTeam;