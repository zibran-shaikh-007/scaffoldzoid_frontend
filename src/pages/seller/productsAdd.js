import React from 'react';
import { connect } from "react-redux";
import * as Yup from 'yup';
import { Formik, Form, Field} from 'formik';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,
} from 'reactstrap';
import { productAdd } from "../../redux/product/actions"




const ProductAdd = ({ productAddAction, history }) => {


    const initialValues = {
        name: "",
        rate: "",
    }



    const onSubmit = (values, { resetForm, setSubmitting }) => {

        productAddAction(values, history)
        resetForm()
        setSubmitting(false);

    };

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(5000, 'Too Long!')
            .required('Please enter Orange Name / Type'),
        rate: Yup.string()
            .min(1, 'Very Less Price!')
            .max(50, 'Too Long!')
            .required('Please enter Price for Orange'),

    });



    return (


        <>
            <Container >
                <Row className="mb-4 d-flex justify-content-center align-items-center" style={{ height: "75vh" }}>
                    <Col xxs="12" md="6">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <span>Orange Details</span>
                                </CardTitle>

                                <Formik
                                    initialValues={initialValues}

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
                                                <Col xxs="12">
                                                    <FormGroup className="form-group has-float-label">


                                                        <Label>
                                                            <span>Name / Type</span>
                                                        </Label>
                                                        <Field className="form-control" name="name" value={values.name} />

                                                        {errors.name && touched.name ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.name}
                                                            </div>
                                                        ) : null}

                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col xxs="12">
                                                    <FormGroup className="form-group has-float-label">


                                                        <Label>
                                                            <span>Rate (Rupees/Kg)</span>

                                                        </Label>
                                                        <Field className="form-control" name="rate" type="number" value={values.rate} />
                                                        {errors.rate && touched.rate ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.rate}
                                                            </div>
                                                        ) : null}


                                                    </FormGroup>
                                                </Col>

                                            </Row>


                                            <Button color="primary" type="submit" className="mt-3" >
                                                {isSubmitting ? "loading" : "Add Product"}
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



export default connect(null, { productAddAction: productAdd })(ProductAdd)

