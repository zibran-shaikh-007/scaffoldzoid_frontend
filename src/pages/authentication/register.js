import React from 'react';
import { Formik, Form, Field } from 'formik';

import {
    Row,
    Card,
    CardTitle,
    FormGroup,
    Label,
    Col,
    Button,
} from 'reactstrap';
import { NavLink , useParams} from 'react-router-dom';
import "./authorization.scss"
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';
import { NotificationManager } from 'react-notifications';



const Register = ({ history, registerUserAction }) => {


    const validatePassword = (value) => {
        let error;
        if (!value) {
            error = 'Please enter your password';
        } else if (value.length < 4) {
            error = 'Value must be longer than 3 characters';
        }
        return error;
    };
    const validateConfirmPassword = (value) => {
        let error;
        if (!value) {
            error = 'Please enter your password';
        } else if (value.length < 4) {
            error = 'Value must be longer than 3 characters';
        }
        return error;
    };

    const validateEmail = (value) => {
        let error;
        if (!value) {
            error = 'Please enter your email address';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Invalid email address';
        }
        return error;
    };

    const username = (value) => {
        let error;
        if (!value) {
            error = 'Please enter your username';
        } else if (value.length < 2) {
            error = 'Value must be longer than 2 characters';
        }
        return error;
    };


    const onUserRegister = (values, { resetForm, setSubmitting }) => {
        if (values.password !== values.confirm_password) {
            NotificationManager.warning("Passwords do not match! please Enter again")

        }else{
            registerUserAction(values, history)
            resetForm()
            setSubmitting(false);
        }

    };

    const {role} = useParams();
    console.log("roles", role)
    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        role: role
    };
    return (
        <Row className="h-100" style={{marginTop:"50px"}}>
            <Col xxs="12" md="6" className="mx-auto my-auto">
                <Card className="auth-card">
                    <div className="position-relative image-side ">
                        <p className="text-white h2">Scaffoldzoid</p>
                        <p className="white mb-0">
                            Please use this form to register. <br />
              If you are a member, please{' '}
                            <NavLink to="/login" className="white">
                                login
              </NavLink>
              .
            </p>
                    </div>
                    <div className="form-side">
                        <NavLink to="/" className="white">
                            <span className="logo-single" />
                        </NavLink>
                        <CardTitle className="mb-5">
                            <span>Register</span>
                           
                        </CardTitle>
                        <Formik initialValues={initialValues} onSubmit={onUserRegister}>
                            {({ errors, touched, handleChange, values, isSubmitting }) => (
                                <Form className="av-tooltip tooltip-label-bottom">
                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                        <span>Username</span>
                                        </Label>
                                        <Field className="form-control" type="name" name="username" value={values.username} validate={username} />
                                        {errors.username && touched.username && (
                                            <div className="invalid-feedback d-block">
                                                {errors.username}
                                            </div>
                                        )}
                                    </FormGroup>



                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                        <span>Email</span>
                                        </Label>
                                        <Field className="form-control" type="email" name="email" value={values.email} validate={validateEmail} />
                                        {errors.email && touched.email && (
                                            <div className="invalid-feedback d-block">
                                                {errors.email}
                                            </div>
                                        )}
                                    </FormGroup>

                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                        <span>Password</span>
                                        </Label>
                                        <Field className="form-control" type="password" name="password" value={values.password} autoComplete="on" validate={validatePassword} />
                                        {errors.password && touched.password && (
                                            <div className="invalid-feedback d-block">
                                                {errors.password}
                                            </div>
                                        )}
                                    </FormGroup>
                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                        <span>Confirm Password</span>
                                        </Label>
                                        <Field className="form-control" type="password" name="confirm_password" value={values.confirm_password} autoComplete="on" validate={validateConfirmPassword} />
                                        {errors.password && touched.password && (
                                            <div className="invalid-feedback d-block">
                                                {errors.password}
                                            </div>
                                        )}
                                    </FormGroup>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <NavLink to="/login">
                                            <span>Already have an Account? Login</span>
                                        </NavLink>
                                    </div>
                                    <div className="d-flex justify-content-end align-items-center">

                                        <Button
                                            color="primary"
                                            className="btn-shadow"
                                            size="lg"
                                            type="submit"
                                        >
                                            {isSubmitting ? "loading" : "Register"}
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Card>
            </Col>
        </Row>
    );
};

const mapStateToProps = ({ authUser }) => { 
  const { loading, error,currentUser } = authUser;
  /* console.log("current user", currentUser) */
  
  return { loading, error };
};

export default (connect(mapStateToProps, {
  registerUserAction: registerUser,
}))(Register);
