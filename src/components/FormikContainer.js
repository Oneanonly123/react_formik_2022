import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
function FormikContainer() {
  const dropdownOptions = [
    { key: 'Select an option', value: '' },
    { key: 'Option 1', value: 'option1' },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option3' },
  ]

   const radioOptions = [
    { key: 'Option 1', value: 'roption1' },
    { key: 'Option 2', value: 'roption2' },
    { key: 'Option 3', value: 'roption3' } 
  ]
  const checkboxOptions = [
    { key: 'Option 1', value: 'roption1' },
    { key: 'Option 2', value: 'roption2' },
    { key: 'Option 3', value: 'roption3' } 
  ]
  const initialValues = {
    email: '',
    description: '',
    selectOptions: '',
    radioOption: '',
    checkboxOption: [],
    birthDate:null
    
    }
  const validationSchema = Yup.object({
    email: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    selectOptions: Yup.string().required('Required'),
    radioOptions: Yup.string().required('Required'),
    checkboxOption: Yup.array().required('Required'), 
    birthDate: Yup.date().required('Required').nullable()
    })
    const onSubmit = values =>console.log('Form Data', values)
  return (
      <Formik
        initialValues= {initialValues}
        validationSchema={validationSchema}
        onSubmit ={onSubmit}
           >
          {
            formik => (<Form>
                        <FormikControl control='input' type='email' label='Email' name='email' />
                        <FormikControl control='textarea' label='Description' name='Description ' />
                        <FormikControl control='select' label='Select a topic' options={dropdownOptions} name='Select' />
                        <FormikControl control='radio' label='Radio Topic' options={radioOptions} name='radioOption' />
                        <FormikControl control='checkbox' label='Checkbox Topics' options={checkboxOptions} name='checkboxOption' />
                        <FormikControl control='date' label='Pick a date' name='birthDate'/>
                         <button type='submit'>Submit</button>
                       </Form>
        )}
     </Formik>
  )
}

export default FormikContainer  