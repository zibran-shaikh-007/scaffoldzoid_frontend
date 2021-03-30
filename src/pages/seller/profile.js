import React, { useEffect } from 'react';
import { connect } from "react-redux";

import DropzoneComponent from 'react-dropzone-component';

import axios from 'axios';

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,

} from 'reactstrap';

import { getCurrentUser } from '../../helpers/Utils';
import { NotificationManager } from 'react-notifications';
import { profileAdded, getProfile } from "../../redux/product/actions"





const ReactDOMServer = require('react-dom/server');

const dropzoneComponentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    postUrl: 'https://httpbin.org/post',
};
const dropzoneConfig = {
    acceptedFiles: "image/jpeg,image/png,image/gif",
    thumbnailHeight: 160,
    autoProcessQueue: true,
    maxFiles: 1,
    maxFilesize: 2,
    previewTemplate: ReactDOMServer.renderToStaticMarkup(
        <div className="dz-preview dz-file-preview mb-3">
            <div className="d-flex flex-row ">
                <div className="p-0 w-30 position-relative">
                    <div className="dz-error-mark">
                        <span>
                            <i />{' '}
                        </span>
                    </div>
                    <div className="dz-success-mark">
                        <span>
                            <i />
                        </span>
                    </div>
                    <div className="preview-container">
                        {/*  eslint-disable-next-line jsx-a11y/alt-text */}
                        <img data-dz-thumbnail className="img-thumbnail border-0" />
                        <i className="simple-icon-doc preview-icon" />
                    </div>
                </div>
                <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
                    <div>
                        {' '}
                        <span data-dz-name />{' '}
                    </div>
                    <div className="text-primary text-extra-small" data-dz-size />
                    <div className="dz-progress">
                        <span className="dz-upload" data-dz-uploadprogress />
                    </div>
                    <div className="dz-error-message">
                        <span data-dz-errormessage />
                    </div>
                </div>
            </div>
            <a href="#/" className="remove" data-dz-remove>
                {' '}
                <i className="glyph-icon simple-icon-trash" />{' '}
            </a>
        </div>
    ),
    headers: { 'My-Awesome-Header': 'header value' },
};



const Profile = ({ profileAddedAction, getProfileAction, addedProfile, history }) => {

    const getSellerProfile = () => {
        const user_id = getCurrentUser().id
        getProfileAction(user_id, history)
    }

    useEffect(() => {
        getSellerProfile()
    }, [])

   


    const initialValues = {
        username: getCurrentUser().username,
        email: getCurrentUser().email,
        description: "",
        picture: [],


    }



    const onSubmit = (values, { resetForm, setSubmitting }) => {


        if (values.picture.length === 0) {
            NotificationManager.warning("Please enter your profile picture");
        } else {

           /*  setTimeout(() => {
                alert(JSON.stringify(payload, null, 2));
                resetForm()
                setSubmitting(false);
            }, 1000); */
            profileAddedAction(values, history)
            resetForm()
            setSubmitting(false);
            window.location.reload();

        }


    };




    const eventHandlers = {

        addedfiles: (files) => {
            let images = []

            for (let i = 0; i < files.length; i++) {
                images.push(files[i])

                /* console.log("images", files[i]) */
            }

            images.forEach((img) => {
                const formData = new FormData()
                formData.append(`file`, img)
                formData.append('upload_preset', 'lyxrkznz');

                return axios.post("https://api.cloudinary.com/v1_1/dx6zgsncl/upload", formData)
                    .then(res => {
                        initialValues.picture.push(res.data.secure_url)


                    })
                    .catch(err => console.log(err))

            })



        }


    }


    const SignupSchema = Yup.object().shape({
        description: Yup.string()
            .min(10, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Please enter profile description'),


    });



    return (


        <>
            <Container >
                <Row className="mb-4 d-flex justify-content-center align-items-center" style={{ marginTop: "200px" }}>
                    <Col xxs="12" md="6">
                        <Card>
                            <CardBody>


                                <Formik
                                    initialValues={initialValues}
                                    /* enableReinitialize={true} */
                                    validationSchema={SignupSchema}
                                    onSubmit={onSubmit}

                                >
                                    {({
                                        handleSubmit,
                                        setFieldValue,
                                        setFieldTouched,
                                        handleChange,
                                        handleBlur,
                                        values,
                                        errors,
                                        touched,
                                        isSubmitting,
                                        onValueChange,


                                    }) => (

                                        <Form className="av-tooltip tooltip-label-bottom">
                                            <Row>
                                                <Col xxs="12" className="d-flex justify-content-center">
                                                    <img className="rounded-circle" src={addedProfile ? addedProfile.picture:"https://res.cloudinary.com/uploadfiles/image/upload/v1617046740/istockphoto-185284489-612x612_fboind.jpg"} width="200" height="200" alt="profile picture" style={{ position: "absolute", bottom: "-20px" }} />
                                                </Col>

                                            </Row>

                                            <Row>
                                                <Col xxs="12">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>
                                                        <span>Name</span>
                                                        </Label>
                                                        <Field className="form-control" name="username" value={values.username} disabled={true} />


                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col xxs="12">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>
                                                        <span>Email</span>
                                                        </Label>
                                                        <Field className="form-control" name="email" value={values.email} disabled={true} />


                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col xxs="12">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>
                                                        <span>Description</span>
                                                        </Label>
                                                        <Field className="form-control" name="description" component="textarea" value={addedProfile ? addedProfile.description:values.description} ></Field>

                                                        {errors.description && touched.description ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.description}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col xxs="12">
                                                    <DropzoneComponent
                                                        name="picture"
                                                        config={dropzoneComponentConfig}
                                                        djsConfig={dropzoneConfig}
                                                        eventHandlers={eventHandlers}
                                                        value={values.picture}
                                                    />

                                                </Col>
                                            </Row>

                                            <Button color="primary" type="submit" className="mt-3" >
                                                {isSubmitting ? "Submit" : "Submit"}
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </CardBody>
                        </Card>
                    </Col>


                </Row>
            </Container>


        </>
    );
}

const mapStateToProps = ({ sellerProduct }) => {
    const { addedProfile, loading } = sellerProduct;


    /* console.log("added profile ====>", addedProfile) */
    return { addedProfile, loading };


};

export default connect(mapStateToProps, { profileAddedAction: profileAdded, getProfileAction: getProfile })(Profile)

