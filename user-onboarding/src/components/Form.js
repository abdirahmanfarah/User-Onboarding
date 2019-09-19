import React from "react";
import { withFormik, Form, Field } from 'formik'


const User = props => {
  console.log(props);

  return (
    <Form>
      <Field type="text" name="name" placeholder = "Name" />
      <button type ="submit"> Submit</button>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues:(values) => {
    return {
      name: values.name || "default values"
    }
  },
  handleSubmit:(values) => {
    console.log(values)
  }
})(User);
