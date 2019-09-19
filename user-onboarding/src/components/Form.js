import React from "react";
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios'


const User = ({errors, touched }) => {
  // console.log(props);

  return (
    <Form>
      {touched.Name && errors.Name && <p>{errors.Name}</p>}
      <Field type="text" name="Name" placeholder = "Name" />

      {touched.Email && errors.Email && <p>{errors.Email}</p>}
      <Field type="text" name="Email" placeholder ="Email"/>
      
      {touched.Password && errors.Password && <p>{errors.Password}</p>}
      <Field type="password" name ="Password" placeholder ="Password"/>

      <Field component="textarea" name = "note" placeholder ="Notes" />
      <span>Terms and Services</span>
      <Field className ="check" type ="checkbox" name="terms" />
      {touched.terms && errors.terms && <p>{errors.terms}</p>}
      <button type ="submit"> Submit</button>

    </Form>
  )
}

export default withFormik({
  mapPropsToValues:(values) => {
    return {
      Name: values.Name || "",
      Email: values.Email || "",
      Password: values.Password || "",
      terms: values.terms || false,
      note:values.note
    }
  },
  validationSchema: yup.object().shape({
      Name: yup.string().required(),
      Email: yup.string().required(),
      Password: yup.string().required(),
      terms: yup.boolean().oneOf([true], "You must agree to the Terms of Service")

  }),
  handleSubmit:(values) => {
    // console.log(values)
    axios 
        .post("https://reqres.in/api/users", values)
          .then(res => {
            console.log(res)
          })
          .catch((err) => {
            console.log('Error:', err)
          })
  }
})(User);
