import React, { useCallback, useEffect, useState } from 'react'
import Input from './Input';

function Form({allFields, onSubmit, errors, children}) {
    const [values, setValues] = useState(null);
    const [fields, setFields] = useState([]);
    
    useEffect(() => {
      const initialValues = {};
      const result = allFields?.map(field=>{
        if (!field.optional) {
          initialValues[field.name]="";
        } else if (field.optional && field.value) {
          initialValues[field.name]=field.value || "";
        }
        return field;
      })
      setValues(initialValues);
      setFields(result);
    }, [])
    const handleChange = useCallback(event => {
        const {name, value, extraValues} = event.target;
        if (name) {
            setValues(prevValues=>({
                ...prevValues,
                [name]: value,
                ...extraValues
            }))
        }
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(values);
    }
  return (
    <form onSubmit={handleSubmit}>
        {
            fields.map(field=>(
                <Input key={field.name} {...field} onChange={handleChange} error={errors?errors[field.name]:null} />
            ))
        }
        {children}
    </form>
  )
}

export default Form