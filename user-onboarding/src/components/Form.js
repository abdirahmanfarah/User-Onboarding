import React from "react";
import { withFormik, Form, Field } from 'formik'


const User = props => {
  console.log(props);

  return (
    <Form>
      <Field type="text" name="name" placeholder = "Name" />
      <Field type="text" name="email" placeholder ="Email"/>
      <Field type="password" name ="password" placeholder ="Password"/>
      <Field component="textarea" name = "note" placeholder ="Notes" />
      <Field className ="check" type ="checkbox" name="terms" />
      <button type ="submit"> Submit</button>

    </Form>
  )
}

export default withFormik({
  mapPropsToValues:(values) => {
    return {
      name: values.name || "",
      email: values.email || "",
      password: values.password || "",
      terms: values.terms || false,
      note:values.note
    }
  },
  handleSubmit:(values) => {
    console.log(values)
  }
})(User);
