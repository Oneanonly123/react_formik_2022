import React from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'

//Yup is a JavaScript schema builder for value parsing and validation. Define a schema,
// transform a value to match,
// validate the shape of an existing value, or both.Yup schema are
// extremely expressive and allow modeling complex, interdependent validations,
// or value transformations



//**************** Topic cover so far ********************/
// Simple form with 3 fields
// useFormik hook
// Managing form state, handling form submission, form validation
// initialValues object + formik.handleChange
// onSubmit method + formik.handleSubmit
// Validate function
// ValidationScehma Object
// formik.errors and formik.touched
//Formik Component
  //1. Formik - Context provider
  //2. Form - Take care of whole form
  //3. Fied - take care of input field , any additional props will pass through it
  //4. ErrorMessage - Which take care of error message and input field being visited or not 

const initialValues = {
            name: '',
            email: '',
            channel: '',
            comments:''
}

const onSubmit = values => {
            console.log('Form data', values)
} 
 
       // value is an object that contain 3 properties
  const validate = values => {
            // value.name // value.email // value.channel
            let errors = {}
            if (!values.name) {
                 errors.name ='Required'
            }
             if (!values.email) {
                 errors.email ='Required'
             } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[A-Z]{2,4}$/i.test(values.email)) {
                 errors.email= 'Invalid email format'
            }
             if (!values.channel) {
                 errors.channel  ='Required'
            }
             
            return errors
        }
    
const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string( ).email('Invalid email format').required('Required'),
    channel: Yup.string().required('Required')
   })    


function YoutubeForm() {

    // useFormik take object as an parameter and return obj property
    //  1 step - pass property as an object
    const formik = useFormik({
        initialValues,
        onSubmit,
        // validate
        validationSchema
        })
     
    // console.log('Form errors', formik.values)

    // It is an object which always reflect the state of the form
  
    // formik.handleSubmit - Automatically type onsubmit event
    
    // handleBlur is the support method that we use in order to check which 
    // field user has visited
     console.log('Form touch', formik.touched)
    
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-control">
                <label htmlFor='name'>Name</label>
                 <input
                 type='text'
                 id='name' name='name'
                 onChange={formik.handleChange}
                 value={formik.values.name}
                 onBlur ={formik.handleBlur}
                    />
                 {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div>:null}
               </div>    
             
            <div className="form-control">
            <label htmlFor='email'>Email</label>
            <input
                type='email'
                id='email' name='email'
                onChange={formik.handleChange}
                onBlur ={formik.handleBlur}
                value={formik.values.email} />
                { formik.touched.email && formik.errors.email ? <div  className="error">{formik.errors.email}</div>:null}
             </div>
                
            <div className="form-control">
              <label htmlFor='channel'>Channel</label>
               <input
                  type='text'
                  id='channel'
                  name='channel'
                  onChange={formik.handleChange}
                  onBlur ={formik.handleBlur}
                  value={formik.values.channel} />
                  { formik.touched.channel && formik.errors.channel ? <div  className="error">{formik.errors.channel}</div> : null}
                </div>
            <div className="form-control">
              <label htmlFor='comment'>Comments</label>
               <input
                  type='text'
                  id='comment'
                  name='comment'
                  onChange={formik.handleChange}
                  onBlur ={formik.handleBlur}
                  value={formik.values.channel} />
             </div>
            <button type='submit'>Submit </button>
        </form>
        </div>
       
    )

}
export default YoutubeForm