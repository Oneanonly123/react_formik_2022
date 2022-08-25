import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
// import { useFormik } from 'formik'
import * as Yup from 'yup'
import TextError from "./TextError";

// If we use Dirty to disable the submit button, 
// then on page being load everytime
// without changing the value and user changes out anything in it
// then it is always invalid 

const initialValues = {
  name: '',
  email: '',
  channel: '',
  comments:'',
  address: '',
  social: {
    facebook: '',
    twitter:''
  },
  phoneNumbers: ['', ''],
  phNumbers:['']
             
}   


// mocking data here as it is coming from API
const saveValues = {
  name: 'Rahul',
  email: 'oneanonly@gmail.com',
  channel: 'Lets rule it',
  comments:'Welcome to Formik',
  address: 'Shubash Road Falna',
  social: {
    facebook: '',
    twitter:''
  },
  phoneNumbers: ['', ''],
  phNumbers:['']
             
}   

const onSubmit = (values,onSubmitProps)=> {
  console.log('Form data', values)
  console.log('Sum data', onSubmitProps)
  onSubmitProps.setSubmitting(false)
  // {/* Reset data after being submitted by the user */}
  onSubmitProps.resetForm()
} 
 

    
const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string( ).email('Invalid email format').required('Required'),
    channel: Yup.string().required('Required')
})    

   
const validateComments = value => {
  let error 
  if (!value) {
    error ='Required'
  }
  return error
}


// {...formik.getFieldProps('name')}
// It is a helper method which on backend provide some important function
// 
function OldYoutubeForm( ) {
   
   const [formValues, setFormValues] = useState(null)
   
  // ErrorMessage behind the scene handle the rendering of error 
   // based on name field and show error if it is not filled  
    return (
      <Formik 
        initialValues={ formValues|| initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        // It is used to decide whether the form change the initial value
        // after it is being initialized once
        enableReinitialize
       // validateOnMount
       // validateOnChange={false}
       // validateOnBlur={false}
       >     
        {/* Manually Triggering Validation and Passing formik function as a children props*/}
        {
          formik => {
            console.log('Formik props', formik)
            return (
                  <Form>
              <div className="form-control">
            <label htmlFor='name'>Name</label>
              {/* It behind the scene hookup input elemnt  with top level formik component(handleBlur, handleChange) */}
                 <Field
                 type='text'
                 id='name' name='name'
        
         // Error Message conditionally render the error corresponding to  
         // form field only if the field has been visited and it has been touched
                 />
            <ErrorMessage name='name'>
              {
                (errorMsg) => <div className="error">{errorMsg}</div>
               }
            </ErrorMessage>
               </div>    
             
            <div className="form-control">
            <label htmlFor='email'>Email</label>
             <Field
                 type='email'
                id='email' name='email'
            />
            {/* Component props are used tp wrap the element in html  */}
            <ErrorMessage name='email'>
              {
                (errorMsg) => <div className="error">{errorMsg}</div>
               }
            </ErrorMessage>
             </div>
              
            <div className="form-control">
              <label htmlFor='channel'>Channel</label>
               <Field
                  type='text'
                  id='channel'
                  name='channel'
                  />
            <ErrorMessage name='channel'>
                 {
                (errorMsg) => <div className="error">{errorMsg}</div>
               }
                </ErrorMessage>
          </div>
           <div className="form-control">
              <label htmlFor='comments'>Comment</label>
               <Field
                  as='textarea'
                  id='comments'
                  name='comments'
                 validate ={validateComments}
                  />
                <ErrorMessage name='comments'component={TextError} />
          </div>
          <div className="form-control">
            <label htmlFor='address'>Address</label>
            {/* FastField is an optimised version of field component which
            internally implement the lifecycle method to block
            all additional render  */}
            <FastField name='address'>
              {
                (props) => {
                  const {field,form, meta} = props
                  // console.log('Field Render Form')
                  return (
                    <div>
                      <input type='text' id='address' {...field} />
                      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                    </div>
                  )
                }
               }
             </FastField>
                <ErrorMessage name='address' />
           </div>
          
            <div className="form-control">
              <label htmlFor='facebook'>Facebook Profile</label>
               <Field
                 type='text'
                  id='facebook'
                  name='social.facebook'
                  />
            </div>
           <div className="form-control">
              <label htmlFor='twitter'>Twitter Profile</label>
               <Field
                 type='text'
                  id='twitter'
                  name='social.twitter'
                  />
          </div>
            <div className="form-control">
              <label htmlFor='primaryPhone'>Primary Phone Number</label>
               <Field
                 type='text'
                  id='primaryPhone'
                  name='phoneNumbers[0]'
                  />
          </div>
          <div className="form-control">
              <label htmlFor='secondaryPhone'>Secondary Phone Number</label>
               <Field
                 type='text'
                  id='secondaryPhone'
                  name='phoneNumbers[1]'
                  />
          </div>
         
          <div className="form-control">
            <label>List of Phone Numbers</label>
            <FieldArray name='phNumbers'>
              {
                (fieldArrayProps) => {
                  // console.log('FieldArray', fieldArrayProps)
                  const { push, remove, form } = fieldArrayProps
                  const { values } = form
                  const { phNumbers } = values
                  // onChange, onSubmit, onBlur -> form.errors run
                  // console.log('Form errors', form.errors)
                  return (
                  <div>
                    {
                      phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                            {
                            index > 0 && (
                              <button type='button'
                                onClick={() => remove(index)}>
                                {''}-{''}
                              </button>
                            )}
                          <button type='button'
                            onClick={() => push('')}>
                            {''}+{''}
                          </button>
                        </div>
                      ))
                    }
                  </div>
                  )
                }
              }
            </FieldArray>
          </div>
                 {/* <button type='button' onClick={()=>formik.validateField('comments')}>Validate Comment </button>
                 <button type='button' onClick={() => formik.validateForm()}>Validate All </button>
                 <button type='button' onClick={() => formik.setFieldTouched('comments')}>Field Touched </button>
                 <button type='button' onClick={() => formik.setTouched({
                    name: true,
                    email: true,
                    channel: true,
                    comments: true
                })}>Touched </button> */}


    {/* *************** HOLDING THE DATA **************** */}
                {/* We want to hold the data for the user to use it latter on
                and proceed ahead with the submission */}
              
              <button type="button" onClick={()=>setFormValues(saveValues)}> Load Saved Data</button>
                
                {/* Disabling the form submit button when any of the field is not in valid state  */}
                {/* <button type='submit' disabled={!(formik.dirty && formik.isValid)}>Submit </button> */}
                
                 {/* Disabling the form submit button while the form is being submitted to the backend  */}
                 <button type='submit' disabled ={!formik.isValid || formik.isSubmitting}>Submit </button>
                
                {/* Reset button */}
              <button type="reset">Reset</button>
               
                
                {/* We are telling formik to disabled the submit if user has changed the
                value in the form if it is not in a valid state */}
                 </Form>
              )
              
          }
         }
              {/* Form is a wrapper automatically linking the onsubmit method to our form submit event */}
      </Formik>
       
    )

}
export default OldYoutubeForm 

