import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios'


const User = ({errors, touched, status}) => {
  // console.log(status);

  const initialMember = { name: "", email: "", password: "", terms: false, notes: ""};
  const [newUser, setNewUser] = useState([]);

  useEffect(() => {
    if(status){

      setNewUser([...newUser, status])
    }
  },[status])

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

      {newUser.map(user =>(
        <ul className ="list" key={user.id} >

          <li > Name: {user.Name}</li>,
          <li> Email: {user.Email}</li>
        </ul>
      ))}
           
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
  handleSubmit:(values, { setStatus}) => {
    // console.log(values)
    axios 
        .post("https://reqres.in/api/users", values)
          .then(res => {
            setStatus(res.data)
          })
          .catch((err) => {
            console.log('Error:', err)
          })
        }
})(User);
