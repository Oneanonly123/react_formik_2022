import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function RadioButtons (props) {
  const { label, name, options, ...rest } = props
  return (
    <div className='form-control'>
      <label>{label}</label>
      {/* Destructuring field props inside the Field component as we are interested in 
      one field only */}
      <Field name={name} >
        {({ field }) => {
          return options.map(option => {
            return (
              // React.Fragment is being used to select only one value
              <React.Fragment key={option.key}>
                <input
                  type='radio'
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            )
          })
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default RadioButtons