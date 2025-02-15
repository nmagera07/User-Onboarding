import React, {useState} from 'react';
import { withFormik, Form, Field } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { Modal, Button, Image } from 'semantic-ui-react'


const AppForm = ({errors, props, values, touched, isSubmitting}) => {


    return ( 
        <div>
            
            <Modal size="large" centered trigger={<button>Click to Sign Up</button>} >
                {/* <Image wrapped size="big" src="https://cdn.mos.cms.futurecdn.net/EzgdmaCQuT84bgDL4fhXZS.jpg" /> */}
                <Modal.Header>Sign Up Below!</Modal.Header>
            <Form>
                <div>
                    {touched.name && errors.name && <p>{errors.name}</p>}
                <Field type="text" name="name" placeholder="name" />
                </div>
                <Field type="email" name="email" placeholder="email" />
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="password" />
                </div>
                <label>
                    Gender: 
                <Field component="select" name="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="not-defined">Prefer not to answer</option>
                </Field>
                </label>
                <div>
                    {touched.terms && errors.terms && <p>{errors.terms}</p>}
                <label className="checkbox">
                <Field type="checkbox" name="terms" checked={values.terms}/> 
                Terms of Service
                </label>
                </div>
                <button disabled={isSubmitting}>Submit</button>
            </Form>
            </Modal>
            </div>
     );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, terms}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false,
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .max(20)
            .required('Name is required'),
        email: Yup.string()
            .email('Email is not valid')
            .required('Email is required'),
        password: Yup.string()
            .min(6)
            .required('Must be at least 6 characters long'),
        terms: Yup.boolean()
            .oneOf([true],'Must agree to terms of service')
           
    }),

    handleSubmit(values, { resetForm, setErrors, setSubmitting}) {
        if (values.email === "waffle@syrup.com") {
            setErrors({ email: "That email is already taken" })
        } else {
            axios
                .post("https://reqres.in/api/users", values)
                .then(response => {
                    console.log(response)
                    resetForm()
                    setSubmitting(false)
                    window.alert(response.data.name)
                    window.alert(response.data.email)
                })
                .catch(err => {
                    console.log("error", err)
                    setSubmitting(false)
                    
                })
        }
        console.log(values)
    }
}) (AppForm)
 
export default FormikLoginForm;