import React from 'react';
import { withFormik, Form, Field } from 'formik'

const AppForm = (props) => {
    return ( 
        <div>
            <Form>
                <Field type="text" name="name" placeholder="name" />
                <Field type="email" name="email" placeholder="email" />
                <Field type="password" name="password" placeholder="password" />
                <Field type="checkbox" name="terms" />
                <button>Submit</button>
            </Form>
        </div>
     );
}
 
export default AppForm;